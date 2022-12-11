import { IsNotEmpty, IsUUID } from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';

export class GetUserByIdDto {
  @IsUUID()
  @IsNotEmpty()
  public id: string;
}

export const GetUserByIdDtoSchema = validationMetadatasToSchemas();
