import { FileUploadRequest } from '@utils/types';
import { Response, NextFunction } from 'express';
import { BaseMiddleware } from 'inversify-express-utils';
import { uploadMap } from './upload-map';

export class UploadFile extends BaseMiddleware {
  constructor() {
    super();
  }

  handler = (req: FileUploadRequest, res: Response, next: NextFunction) => {
    const { type } = req.query;
    const uploader = uploadMap[type];

    const uploadFn = uploader.single('file');

    uploadFn(req, res, (err) => {
      if (err) {
        next(err);
      } else {
        req.body.url = req.file.path;
        next();
      }
    });
  };

  static single() {
    return new UploadFile().handler;
  }
}
