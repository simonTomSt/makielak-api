import {
  CreateUserDtoSchema,
  GetUserByIdDtoSchema,
  SignInDtoSchema,
  UpdateUserDtoSchema,
  UserOutDtoSchema,
} from '@modules/user/dto';
import { Role as UserRole } from '@prisma/client';
import { createResponseSchema, getByRef } from 'src/docs/shared';

const UserResponse = createResponseSchema(
  {
    user: {
      $ref: getByRef('UserOutDto'),
    },
  },
  201
);

const UsersResponse = createResponseSchema(
  {
    users: {
      type: 'array',
      items: {
        $ref: getByRef('UserOutDto'),
      },
    },
  },
  200
);

const TokenResponse = createResponseSchema(
  {
    token: {
      type: 'string',
      example: 'EXAMPLE_TOKEN',
    },
  },
  200
);

const DeletedUserResponse = createResponseSchema(
  {
    deleted: {
      type: 'boolean',
      example: 'true',
    },
  },
  200
);

export const Role = {
  type: 'string',
  enum: [UserRole.SUPER_ADMIN, UserRole.ADMIN],
};

export const usersSchemas = {
  // DTO
  UserOutDto: UserOutDtoSchema.UserOutDto,
  CreateUserDto: CreateUserDtoSchema.CreateUserDto,
  GetUserByIdDto: GetUserByIdDtoSchema.GetUserByIdDto,
  SignInDto: SignInDtoSchema.SignInDto,
  UpdateUserDto: UpdateUserDtoSchema.UpdateUserDto,

  // Response
  UserResponse,
  UsersResponse,
  TokenResponse,
  DeletedUserResponse,

  // Other
  Role,
};
