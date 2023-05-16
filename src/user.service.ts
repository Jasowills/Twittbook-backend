import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, UserModel } from '../schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async signUp(user: User): Promise<User> {
    const existingUser = await this.userModel.findOne({
      username: user.username,
    });
    if (existingUser) {
      throw new Error('Username is already taken');
    }
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async login(email: string, password: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email, password });
    return user;
  }
}
