import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../schemas/user.schema';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async signUp(@Body() user: User): Promise<User> {
    return this.userService.signUp(user);
  }

  @Post('/login')
  async login(
    @Body() body: { email: string; password: string },
  ): Promise<User | null> {
    const { email, password } = body;
    return this.userService.login(email, password);
  }
}
