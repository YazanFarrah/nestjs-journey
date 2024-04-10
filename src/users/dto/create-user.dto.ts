import {
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Gender } from 'src/shared/enums/gender.enum';

export class CreateUserDto {
  id: number;

  @IsString()
  @Length(3, 20)
  @IsNotEmpty({ message: 'Username must be provided' })
  username: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;

  @IsEnum(Gender)
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'Gender must be either 1 or 2' },
  )
  @IsNotEmpty()
  gender: Gender;

  @IsISO8601() 
  @IsNotEmpty()
  birthday: string;

  @Length(3, 10)
  @IsNotEmpty()
  @IsOptional()
  city: string;
}
