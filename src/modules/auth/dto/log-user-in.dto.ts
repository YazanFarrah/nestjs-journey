import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LogUserInDto {
  @Length(5, 320)
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @Length(8, 30)
  @IsString()
  @IsNotEmpty()
  password: string;
}
