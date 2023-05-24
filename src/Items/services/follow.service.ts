import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Follow, FollowDocument } from '../interface/follow.interface';
import { UserDocument, UserModel } from '../schemas/user.schema';

@Injectable()
export class FollowService {
  constructor(
    @InjectModel('Follow') private readonly followModel: Model<FollowDocument>,
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async create(follow: Follow): Promise<Follow> {
    const newFollow = new this.followModel(follow);
    await newFollow.save();

    // Retrieve the related user and update the followers count
    const user = await this.userModel.findById(follow.followingId).exec();

    if (user) {
      user.followers = user.followers ? user.followers + 1 : 1;
      await user.save();
    }

    return newFollow;
  }

  async delete(userId: string, followingId: string): Promise<Follow> {
    const deletedFollow = await this.followModel
      .findOneAndRemove({ userId, followingId })
      .exec();

    // Decrease the followers count on the user
    await this.userModel.findByIdAndUpdate(followingId, {
      $inc: { followers: -1 },
    });

    return deletedFollow;
  }

  // Other methods...
}
