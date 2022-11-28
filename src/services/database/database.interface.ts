import { Prisma } from '@prisma/client';
import { UserCtx } from '@utils/types';

export interface IDatabaseService {
  userCtx(): UserCtx;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}
