import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

  private users: CreateUserDto[] = [];

  constructor() {
    this.users = [];
  }

  create(createUserDto: CreateUserDto):string {
  
    this.users.push(createUserDto);
    return 'User created';

  }

  findAll() {
    return this.users;
  }

  findOne(id: string): CreateUserDto {
    if (!id) {
      throw new NotFoundException('User not found');
    }
    const user = this.users.find(user => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    if (!id) {
      throw new NotFoundException('User not found');
    }
    const user = this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (updateUserDto.firstName) {
      user.firstName = updateUserDto.firstName;
    }
    if (updateUserDto.lastName) {
      user.lastName = updateUserDto.lastName;
    }
    return `user updated`;
  }

  remove(id: string) {
    if (!id) {
      throw new NotFoundException('User not found');
    }
    const user = this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    this.users = this.users.filter(user => user.id !== id);
    return `user removed`;
  }
}
