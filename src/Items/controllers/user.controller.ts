import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Put,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../interface/user.interface';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Post('signup')
  async signup(@Body() user: User): Promise<{ user: User; token: string }> {
    try {
      const result = await this.usersService.signUp(user);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<{ user: User; token: string }> {
    try {
      const result = await this.usersService.login(email, password);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<User> {
    return this.usersService.delete(id);
  }

  @Put(':id')
  update(@Body() user: User, @Param('id') id: string): Promise<User> {
    return this.usersService.update(id, user);
  }
}
