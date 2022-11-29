import { TYPES } from '@services/app/ioc-types';
import { IAuthService } from '@services/auth';
import { TokenPayloadDto } from '@services/auth/dto';
import { HttpError } from '@utils/http-error';
import { JwtTokenPayload } from '@utils/types';
import { plainToClass, plainToInstance } from 'class-transformer';
import { inject, injectable } from 'inversify';
import {
  CreateUserDto,
  DeleteOneUserDto,
  GetUserByEmailDto,
  GetUserByIdDto,
  SignInDto,
  UpdateUserDto,
  UserDto,
} from './dto';
import type { IUserRepository, IUserService } from './user.interface';

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: IUserRepository,
    @inject(TYPES.AuthService) private readonly authService: IAuthService
  ) {}

  async findById(getUserByIdDto: GetUserByIdDto): Promise<UserDto> {
    const user = await this.userRepository.findById(getUserByIdDto.id);

    return plainToClass(UserDto, user);
  }

  async findByEmail(getUserByEmailDto: GetUserByEmailDto): Promise<UserDto> {
    const user = await this.userRepository.findByEmail(getUserByEmailDto.email);

    return plainToClass(UserDto, user);
  }

  async findAll(): Promise<UserDto[]> {
    const users = await this.userRepository.findAll();

    return users.map((user) => plainToClass(UserDto, user));
  }

  async createOne(createUserDto: CreateUserDto): Promise<UserDto> {
    const hashedPassword = await this.authService.hashPassword(
      createUserDto.password
    );
    const user = await this.userRepository.createOne({
      ...createUserDto,
      password: hashedPassword,
    });

    return plainToClass(UserDto, user);
  }

  async deleteOne(deleteOneUserDto: DeleteOneUserDto): Promise<boolean> {
    await this.userRepository.deleteOne(deleteOneUserDto.id);

    return true;
  }

  async updateOne(updateUserDto: UpdateUserDto): Promise<UserDto> {
    const user = await this.userRepository.updateOne(updateUserDto);

    return plainToClass(UserDto, user);
  }

  async signIn(signInDto: SignInDto): Promise<string> {
    const user = await this.findByEmail(signInDto);

    if (!user) throw new HttpError(404, 'User with given email not found');

    const passwordMatches = this.authService.comparePasswords(
      signInDto.password,
      user.password
    );

    if (!passwordMatches) throw new HttpError(401, 'Unauthorized');

    const tokenPayloadDto = plainToInstance(TokenPayloadDto, user, {
      excludeExtraneousValues: true,
    });

    return this.authService.signJwt(tokenPayloadDto);
  }
}
