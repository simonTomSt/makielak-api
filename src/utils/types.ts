import { UserDto } from '@modules/user/dto';
import { Prisma, PrismaClient } from '@prisma/client';
import { TokenPayloadDto } from '@services/auth/dto';
import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';

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

// Auth
export interface JwtTokenPayload extends JwtPayload {
  payload: TokenPayloadDto;
}

export interface AuthRequest extends Request {
  user: TokenPayloadDto;
}
