import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { LogUserInDto } from './dto/log-user-in.dto';
import { Public } from 'src/core/decorators/public.decorator';
import { LoginService } from './login.service';
import { RegisterService } from './register.service';
import { PasswordService } from './password.service';

@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginService: LoginService,
    private readonly registerService: RegisterService,
    private readonly passwordService: PasswordService,
  ) {}

  @Post('register-user')
  create(@Body() createUserDto: CreateUserDto) {
    return this.registerService.registerUser(createUserDto);
  }

  @Post('login-user')
  logUserIn(@Body() logUserInDto: LogUserInDto) {
    return this.loginService.logUserIn(logUserInDto);
  }
}
