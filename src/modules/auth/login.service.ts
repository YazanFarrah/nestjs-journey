import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LogUserInDto } from './dto/log-user-in.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  
  async logUserIn(logUserInDto: LogUserInDto) {
    const { email } = logUserInDto;
    const user = this.userService.findUserByEmail(email);
    if (!user)
      throw new HttpException('user not found', HttpStatus.UNAUTHORIZED);

    const { password } = user;

    const isMatchPassword = await bcrypt.compare(
      logUserInDto.password,
      password,
    );

    if (!isMatchPassword)
      throw new HttpException('incorrect credentials', HttpStatus.UNAUTHORIZED);

    const payload = {
      sub: user.id,
    };
    const accessToken = this.jwtService.sign(payload, {
      secret: 'Y4Z$0$14lM3d144ppl1c4t10n_ACCESS_TOKEN',
    });

    return { token: accessToken };
  }
}
