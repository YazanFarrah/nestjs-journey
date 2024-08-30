import { IsNotEmpty, IsUrl, MaxLength } from 'class-validator';

export class CreatePostDto {
  @MaxLength(2200, { message: 'Text is too long' })
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  @IsUrl()
  image: string;

  createdAt = new Date().toISOString();

  updatedAt = new Date().toISOString();
}
