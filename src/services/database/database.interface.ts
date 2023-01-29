import { ContentCtx, FileCtx, UserCtx } from '@utils/types';

export interface IDatabaseService {
  userCtx(): UserCtx;
  contentCtx(): ContentCtx;
  fileCtx(): FileCtx;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}
