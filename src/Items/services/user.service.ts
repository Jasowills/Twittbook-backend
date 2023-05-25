import { Injectable } from '@nestjs/common';
import { User } from '../interface/user.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  async signup(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return await newUser.save();
  }

  async login(email: string, password: string): Promise<User> {
    return await this.userModel.findOne({ email, password }).exec();
  }

  async delete(id: string): Promise<User> {
    return await this.userModel.findByIdAndRemove(id).exec();
  }

  async update(id: string, user: User): Promise<User> {
    return await this.userModel
      .findByIdAndUpdate(id, user, { new: true })
      .exec();
  }
}
