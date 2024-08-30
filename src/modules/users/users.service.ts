import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  users: User[] = [];

  createUserForAuth(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const user = this.findUserByEmail(email);
    if (user)
      throw new HttpException('Email already exists', HttpStatus.CONFLICT);

    let length = this.users.length;
    const createdUser = new User({
      ...createUserDto,
      id: length++,
    });
    this.users.push(createdUser);
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.users.find((user) => user.id === id);
    user.updateOne(updateUserDto);
    return { data: user, message: 'User was updated successfully' };
  }

  remove(id: number) {
    const index = this.users.findIndex((user) => user.id === id);
    this.users.splice(index, 1);
    return 'User was deleted succesffuly';
  }

  findUserByEmail(email: string) {
    return this.users.find((user) => user.email == email);
  }
}
