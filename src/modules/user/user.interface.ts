import { User } from '@prisma/client';
import {
  CreateUserDto,
  DeleteOneUserDto,
  GetUserByEmailDto,
  GetUserByIdDto,
  UpdateUserDto,
  UserDto,
} from './dto';

export interface IUserService {
  findById(getUserByIdDto: GetUserByIdDto): Promise<UserDto>;
  findByEmail(getUserByEmailDto: GetUserByEmailDto): Promise<UserDto>;
  findAll(): Promise<UserDto[]>;
  createOne(createUserDto: CreateUserDto): Promise<UserDto>;
  deleteOne(deleteOneUserDto: DeleteOneUserDto): Promise<boolean>;
  updateOne(updateUserDto: UpdateUserDto): Promise<User>;
}

export interface IUserRepository {
  findById(id: User['id']): Promise<User>;
  findByEmail(email: User['email']): Promise<User>;
  findAll(): Promise<User[]>;
  createOne(user: Omit<User, 'id'>): Promise<User>;
  updateOne(payload: Partial<User>): Promise<User>;
  deleteOne(id: User['id']): Promise<User>;
}
