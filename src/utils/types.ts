import { UserDto } from '@modules/user/dto';
import { FileType, Prisma, PrismaClient } from '@prisma/client';
import { TokenPayloadDto } from '@services/auth/dto';
import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';
import { ContentDto } from '@modules/content/dto';
import { FileDto } from '@modules/storage/dto';

// DB Context
export type DBClient = PrismaClient<
  Prisma.PrismaClientOptions,
  never,
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation
>;
export type UserCtx = Prisma.UserDelegate<
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation
>;
export type ContentCtx = Prisma.ContentDelegate<
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation
>;
export type FileCtx = Prisma.FileDelegate<
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

// Content
export type ContentResponse = {
  content: ContentDto;
};

// Storage
export type FileResponse = {
  file: FileDto;
};

export interface FileUploadRequest extends Request {
  file: Express.Multer.File;
  query: {
    type: FileType;
  };
}
