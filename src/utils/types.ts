import { UserDto } from '@modules/user/dto';
import { Prisma, PrismaClient } from '@prisma/client';

// DB Context
export type DBClient = PrismaClient<
  Prisma.PrismaClientOptions,
  never,
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation
>;

export type UserCtx = Prisma.UserDelegate<
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation
>;

// User
export type UserResponse = { user: UserDto };
export type UsersResponse = { users: UserDto[] };
export type UserDeletedResponse = { deleted: boolean };
