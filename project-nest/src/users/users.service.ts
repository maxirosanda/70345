import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.shema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  create(createUserDto: CreateUserDto) {
    const user = this.userModel.create(createUserDto);
    return user
  }

  findAll() {
    const users = this.userModel.find({})
    return users;
  }

  findOne(id: string) {
    const user = this.userModel.findById(id)
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.userModel.findByIdAndUpdate(id,updateUserDto,{new:true})
    return user;
  }

  remove(id: string) {
    const user = this.userModel.findByIdAndDelete(id)
    return user;
  }
}
