import { ContentType } from '@prisma/client';
import { BaseHttpResponse } from '@utils/base-http-response';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import type { Response, Request, NextFunction } from 'express';
import { BaseMiddleware } from 'inversify-express-utils';
import {
  AboutUsStructureDto,
  CertificatesStructureDto,
  FooterStructureDto,
  HomePageStructureDto,
  ServicesStructureDto,
} from './dto/structures';
import { ContactStructureDto } from './dto/structures/contact-structure.dto';

const contentTypeDtoMap = {
  [ContentType.HOME_PAGE]: HomePageStructureDto,
  [ContentType.ABOUT_US]: AboutUsStructureDto,
  [ContentType.SERVICES]: ServicesStructureDto,
  [ContentType.CERTIFICATES]: CertificatesStructureDto,
  [ContentType.CONTACT]: ContactStructureDto,
  [ContentType.FOOTER]: FooterStructureDto,
};

export class ValidateContentStructure extends BaseMiddleware {
  constructor() {
    super();
  }

  public handler = async (req: Request, res: Response, next: NextFunction) => {
    const { name, structure } = req.body as {
      name: ContentType;
      structure: string;
    };
    const contentStructure = plainToInstance<any, any>(
      contentTypeDtoMap[name],
      JSON.parse(structure)
    );

    const errors = await validate(contentStructure);

    if (errors.length > 0) {
      const errorMessage =
        (errors[0]?.property ? `${errors[0]?.property} - ` : '') +
        Object.values(
          errors[0]?.children[0]?.children[0]?.constraints ||
            errors[0]?.constraints || { error: 'Invalid data' }
        )?.[0];

      const response = BaseHttpResponse.failed(errorMessage, 400);
      return res.status(response.statusCode).json(response);
    }

    next();
  };
  static validate() {
    return new ValidateContentStructure().handler;
  }
}
