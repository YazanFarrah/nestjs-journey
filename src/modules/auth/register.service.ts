import { HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class RegisterService {
  constructor(private readonly userService: UsersService) {}

  async registerUser(createUserDto: CreateUserDto) {
    const { password } = createUserDto;
    let hashedPassword = await bcrypt.hash(password, 11);
    createUserDto.password = hashedPassword;
    this.userService.createUserForAuth(createUserDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'User was created successfully',
    };
  }
}
