import {
  IsEmail,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Gender } from 'src/shared/enums/gender.enum';

export class CreateUserDto {
  id: number;

  @Length(3, 20)
  @IsString()
  username: string;

  @Length(5, 320)
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @Length(8, 30)
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @IsISO8601()
  @IsNotEmpty()
  birthday: string;

  @IsNotEmpty()
  @IsOptional()
  city: string;
}
