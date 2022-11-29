import { TYPES } from '@services/app/ioc-types';
import { inject, injectable } from 'inversify';
import { IUserRepository } from './user.interface';

import type { User } from '@prisma/client';
import type { IDatabaseService } from '@services/database';
import type { UserCtx } from '@utils/types';

@injectable()
export class UserRepository implements IUserRepository {
  private readonly userCtx: UserCtx;

  constructor(
    @inject(TYPES.DatabaseService)
    private readonly databaseService: IDatabaseService
  ) {
    this.userCtx = this.databaseService.userCtx();
  }
  async findById(id: User['id']): Promise<User> {
    return this.userCtx.findUniqueOrThrow({ where: { id } });
  }

  async findByEmail(email: User['email']): Promise<User> {
    return this.userCtx.findUnique({ where: { email } });
  }

  async findAll(): Promise<User[]> {
    return this.userCtx.findMany();
  }

  async createOne(userData: Omit<User, 'id'>): Promise<User> {
    return this.userCtx.create({ data: userData });
  }

  async deleteOne(id: User['id']): Promise<User> {
    return this.userCtx.delete({ where: { id } });
  }

  async updateOne(payload: Partial<User>): Promise<User> {
    return this.userCtx.update({
      where: { id: payload.id },
      data: {
        email: payload.email,
        name: payload.name,
        role: payload.role,
      },
    });
  }
}
