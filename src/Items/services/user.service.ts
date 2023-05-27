import { Injectable } from '@nestjs/common';
import { User } from '../interface/user.interface';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    const isValidObjectId = Types.ObjectId.isValid(id);
    if (!isValidObjectId) {
      return null; // Return null or handle the invalid ObjectId error
    }

    return await this.userModel.findById(id).exec();
  }

  async signUp(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    await newUser.save();

    // Automatically follow the admin
    const adminId = '64723a18e207b584fd1ee3d7';
    const admin = await this.userModel.findById(adminId).exec();

    if (admin) {
      admin.followers = admin.followers ? admin.followers + 1 : 1;
      await admin.save();
    }

    return newUser.save();
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
