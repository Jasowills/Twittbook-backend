import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserService {
  getUserById(id: string): User | PromiseLike<User> {
    throw new Error('Method not implemented.');
  }
  getAllUsers(): User[] | PromiseLike<User[]> {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(user: User): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async findUserById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async updateUserById(
    id: string,
    updatedUser: Partial<User>,
  ): Promise<User | null> {
    return this.userModel
      .findByIdAndUpdate(id, updatedUser, { new: true })
      .exec();
  }

  async deleteUserById(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec();
  }
}
