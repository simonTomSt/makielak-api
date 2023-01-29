import { AuthMiddleware } from '@middleware/auth';
import { ValidateRequest } from '@middleware/validate-request';
import { Role } from '@prisma/client';
import { TYPES } from '@services/app/ioc-types';
import { BaseHttpResponse } from '@utils/base-http-response';
import { ContentResponse } from '@utils/types';
import { inject } from 'inversify';
import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
  requestBody,
} from 'inversify-express-utils';
import { IContentService } from './content.interface';
import { ValidateContentStructure } from './content.middleware';
import { GetContentByNameDto, UpsertContentDto } from './dto';

@controller('/content')
export class ContentController extends BaseHttpController {
  constructor(
    @inject(TYPES.ContentService)
    private readonly contentService: IContentService
  ) {
    super();
  }

  @httpGet(
    '/:name',
    ValidateRequest.with(GetContentByNameDto),
    AuthMiddleware.roles([Role.ADMIN])
  )
  async get(@requestBody() getContentByNameDto: GetContentByNameDto) {
    const content = await this.contentService.findByName(getContentByNameDto);

    const response = BaseHttpResponse.success<ContentResponse>(
      { content },
      200
    );
    return this.ok(response);
  }

  @httpPost(
    '/:name',
    AuthMiddleware.roles([Role.ADMIN]),
    ValidateRequest.with(UpsertContentDto),
    ValidateContentStructure.validate()
  )
  async post(@requestBody() contentDto: UpsertContentDto) {
    const content = await this.contentService.updateOne(contentDto);

    const response = BaseHttpResponse.success<ContentResponse>(
      { content },
      200
    );
    return this.ok(response);
  }
}
