import { IsNotEmpty, IsUrl, Length, MaxLength } from 'class-validator';

export class CreatePostDto {
  @Length(1, 2200)
  @IsNotEmpty()
  text: string;
  @IsNotEmpty()
  @IsUrl()
  image: string;
  createdAt = new Date().toISOString();
  updatedAt = new Date().toISOString();
}
