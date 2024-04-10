import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  users: User[] = [];
  async create(createUserDto: CreateUserDto) {
    const { password } = createUserDto;
    let length = this.users.length;
    const hashedPassword = await bcrypt.hash(password, 11);
    const user = new User({
      ...createUserDto,
      id: length++,
      password: hashedPassword,
    });
    this.users.push(user);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'User created successfully',
    };
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((user) => {
      return user.id == id;
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id);
    user.updateOne(updateUserDto);
    return { data: user, message: 'Updated user successfully' };
  }

  remove(id: number) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      return { msg: 'No user found' };
    }
    const deletedUser = this.users.splice(index, 1)[0];
    return { msg: `User ${deletedUser.username} was deleted successfully` };
  }
}
