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
  signup(@Body() user: User): Promise<User> {
    return this.usersService.signup(user);
  }

  @Post('login')
  login(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<User> {
    return this.usersService.login(email, password);
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
