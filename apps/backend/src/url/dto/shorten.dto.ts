import { IsUrl, IsString, IsNotEmpty } from 'class-validator';

export class ShortenDto {
  @IsUrl({}, { message: 'Please provide a valid URL' })
  @IsString()
  @IsNotEmpty()
  original: string;
}