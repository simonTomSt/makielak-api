import { TYPES } from '@services/app/ioc-types';
import { plainToClass } from 'class-transformer';
import { inject, injectable } from 'inversify';
import {
  CreateUserDto,
  DeleteOneUserDto,
  GetUserByEmailDto,
  GetUserByIdDto,
  UpdateUserDto,
  UserDto,
} from './dto';
import type { IUserRepository, IUserService } from './user.interface';

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: IUserRepository
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
    const user = await this.userRepository.createOne(createUserDto);

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
}
