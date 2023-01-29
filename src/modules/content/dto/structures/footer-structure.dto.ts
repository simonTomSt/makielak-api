import { IsNotEmpty, IsString } from 'class-validator';

export class FooterStructureDto {
  @IsNotEmpty()
  @IsString()
  public title: string;

  @IsNotEmpty()
  @IsString()
  public email: string;

  @IsNotEmpty()
  @IsString()
  public firstPhone: string;

  @IsNotEmpty()
  @IsString()
  public secondPhone: string;

  @IsNotEmpty()
  @IsString()
  public address: string;
}
