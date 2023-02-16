import { UploadFile } from '@middleware/upload';
import { ValidateRequest } from '@middleware/validate-request';
import { TYPES } from '@services/app/ioc-types';
import { BaseHttpResponse } from '@utils/base-http-response';
import { FileResponse } from '@utils/types';
import { inject } from 'inversify';
import {
  controller,
  BaseHttpController,
  httpPost,
  requestBody,
  httpDelete,
} from 'inversify-express-utils';
import { DeleteFileDto, StoreFileDto } from './dto';
import { IStorageService } from './storage.interface';

@controller('/store')
export class StorageController extends BaseHttpController {
  constructor(
    @inject(TYPES.StorageService)
    private readonly storageService: IStorageService
  ) {
    super();
  }

  @httpDelete(
    '/file/:id',
    UploadFile.single(),
    ValidateRequest.with(DeleteFileDto)
  )
  async deleteFile(@requestBody() deleteFileDto: DeleteFileDto) {
    const deleted = await this.storageService.deleteFile(deleteFileDto);

    const response = BaseHttpResponse.success<FileResponse>({ deleted }, 200);
    return this.ok(response);
  }

  @httpPost('/file', UploadFile.single(), ValidateRequest.with(StoreFileDto))
  async saveFile(@requestBody() storeFileDto: StoreFileDto) {
    const file = await this.storageService.storeFile(storeFileDto);

    const response = BaseHttpResponse.success<FileResponse>({ file }, 200);
    return this.ok(response);
  }
}
