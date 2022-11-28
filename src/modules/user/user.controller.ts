import { TYPES } from '@services/app/ioc-types';
import { BaseHttpResponse } from '@utils/base-http-response';
import { inject } from 'inversify';
import {
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

@controller('/users')
export class UserController {
  constructor(
    @inject(TYPES.UserService) private readonly userService: IUserService
  ) {}

  @httpGet('/')
  async get(@request() _request: Request, @response() res: Response) {
    const users = await this.userService.findAll();

    const response = BaseHttpResponse.success<UsersResponse>(users, 200);
    res.status(response.statusCode).json(response);
  }

  @httpGet('/:id', ValidateRequest.with(GetUserByIdDto))
  async getById(
    @requestBody() getUserByIdDto: GetUserByIdDto,
    @response() res: Response
  ) {
    const user = await this.userService.findById(getUserByIdDto);

    const response = BaseHttpResponse.success<UserResponse>(user, 200);
    res.status(response.statusCode).json(response);
  }

  @httpGet('/by-email/:email')
  async getByEmail(
    @requestBody() getUserByEmailDto: GetUserByEmailDto,
    @response() res: Response
  ) {
    const user = await this.userService.findByEmail(getUserByEmailDto);

    const response = BaseHttpResponse.success<UserResponse>(user, 200);
    res.status(response.statusCode).json(response);
  }

  @httpPost('/', ValidateRequest.with(CreateUserDto))
  async createOne(
    @requestBody() createUserDto: CreateUserDto,
    @response() res: Response
  ) {
    const user = await this.userService.createOne(createUserDto);

    const response = BaseHttpResponse.success<UserResponse>(user, 201);
    res.status(response.statusCode).json(response);
  }

  @httpPatch('/:id', ValidateRequest.with(UpdateUserDto))
  async updateOne(
    @requestBody() updateUserDto: UpdateUserDto,
    @response() res: Response
  ) {
    const user = await this.userService.updateOne(updateUserDto);

    const response = BaseHttpResponse.success<UserDeletedResponse>(user, 200);
    res.status(response.statusCode).json(response);
  }

  @httpDelete('/:id', ValidateRequest.with(DeleteOneUserDto))
  async deleteOne(
    @requestBody() deleteOneUserDto: DeleteOneUserDto,
    @response() res: Response
  ) {
    const deleted = await this.userService.deleteOne(deleteOneUserDto);

    const response = BaseHttpResponse.success<UserDeletedResponse>(
      deleted,
      200
    );
    res.status(response.statusCode).json(response);
  }
}
