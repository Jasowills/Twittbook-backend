import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../schemas/user.schema';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(@Body() user: User): Promise<User> {
    return this.userService.createUser(user);
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Put(':id')
  async updateUserById(
    @Param('id') id: string,
    @Body() user: User,
  ): Promise<User> {
    return this.userService.updateUserById(id, user);
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: string): Promise<void> {
    return this.userService.deleteUserById(id);
  }
}
