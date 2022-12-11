import { IsNotEmpty, IsUUID } from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';

export class DeleteOneUserDto {
  @IsUUID()
  @IsNotEmpty()
  public id: string;
}


export const DeleteOneUserDtoSchema = validationMetadatasToSchemas();
