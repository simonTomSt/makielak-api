import { TYPES } from '@services/app/ioc-types';
import { BaseHttpResponse } from '@utils/base-http-response';
import { inject } from 'inversify';
import {
  BaseHttpController,
  controller,
  httpDelete,
  httpGet,
  httpPatch,
  httpPost,
  request,
  requestBody,
  response,
} from 'inversify-express-utils';
import {
  CreateUserDto,
  DeleteOneUserDto,
  GetUserByEmailDto,
  GetUserByIdDto,
  SignInDto,
  UpdateUserDto,
} from './dto';
import { ValidateRequest } from '@middleware/validate-request';

import type { IUserService } from './user.interface';
import type { Request, Response } from 'express';
import type {
  UsersResponse,
  UserResponse,
  UserDeletedResponse,
} from '@utils/types';
import { AuthMiddleware } from '@middleware/auth';
import { Role } from '@prisma/client';

@controller('/users')
export class UserController extends BaseHttpController {
  constructor(
    @inject(TYPES.UserService) private readonly userService: IUserService
  ) {
    super();
  }

  @httpGet('/', AuthMiddleware.roles([Role.SUPER_ADMIN]))
  async get(@request() _request: Request) {
    const users = await this.userService.findAll();

    const response = BaseHttpResponse.success<UsersResponse>({ users }, 200);
    return this.ok(response);
  }

  @httpGet(
    '/:id',
    ValidateRequest.with(GetUserByIdDto),
    AuthMiddleware.roles([Role.SUPER_ADMIN])
  )
  async getById(@requestBody() getUserByIdDto: GetUserByIdDto) {
    const user = await this.userService.findById(getUserByIdDto);

    const response = BaseHttpResponse.success<UserResponse>({ user }, 200);
    return this.ok(response);
  }

  @httpGet(
    '/by-email/:email',
    ValidateRequest.with(GetUserByEmailDto),
    AuthMiddleware.roles([Role.SUPER_ADMIN])
  )
  async getByEmail(@requestBody() getUserByEmailDto: GetUserByEmailDto) {
    const user = await this.userService.findByEmail(getUserByEmailDto);

    const response = BaseHttpResponse.success<UserResponse>({ user }, 200);
    return this.ok(response);
  }

  @httpPost('/', ValidateRequest.with(CreateUserDto))
  async createOne(@requestBody() createUserDto: CreateUserDto) {
    const user = await this.userService.createOne(createUserDto);

    const response = BaseHttpResponse.success<UserResponse>({ user }, 201);
    return this.ok(response);
  }

  @httpPatch(
    '/:id',
    ValidateRequest.with(UpdateUserDto),
    AuthMiddleware.roles([Role.SUPER_ADMIN, Role.ADMIN])
  )
  async updateOne(@requestBody() updateUserDto: UpdateUserDto) {
    const user = await this.userService.updateOne(updateUserDto);

    const response = BaseHttpResponse.success<UserDeletedResponse>(
      { user },
      200
    );
    return this.ok(response);
  }

  @httpDelete(
    '/:id',
    ValidateRequest.with(DeleteOneUserDto),
    AuthMiddleware.roles([Role.SUPER_ADMIN])
  )
  async deleteOne(@requestBody() deleteOneUserDto: DeleteOneUserDto) {
    const deleted = await this.userService.deleteOne(deleteOneUserDto);

    const response = BaseHttpResponse.success<UserDeletedResponse>(
      { deleted },
      200
    );
    return this.ok(response);
  }

  @httpPost('/auth/sign-in', ValidateRequest.with(SignInDto))
  async signIn(@requestBody() signInDto: SignInDto, @response() res: Response) {
    const token = await this.userService.signIn(signInDto);

    const response = BaseHttpResponse.success<{ token: string }>(
      { token },
      200
    );

    res
      .cookie('token', token, {
        httpOnly: false,
      })
      .status(response.statusCode)
      .json(response);
  }

  @httpPost('/auth/sign-out')
  async signOut(_request: Request, res: Response) {
    res.clearCookie('token').status(200);
  }
}
