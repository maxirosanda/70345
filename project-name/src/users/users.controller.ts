import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const id = uuidv4();
    const message: string = this.usersService.create({...createUserDto, id});
    return {status:"success", message};
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const user: CreateUserDto = this.usersService.findOne(id);
    return {status:"success", user};
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const message: string = this.usersService.update(id, updateUserDto);
    return {status:"success", message};
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const message: string = this.usersService.remove(id);
    return {status:"success", message};
  }
}
