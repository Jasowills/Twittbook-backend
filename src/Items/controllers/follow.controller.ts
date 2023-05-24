import { Controller, Post, Delete, Param } from '@nestjs/common';
import { FollowService } from '../services/follow.service';
import { Types } from 'mongoose';

@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post(':userId/:followingId')
  async create(
    @Param('userId') userId: string,
    @Param('followingId') followingId: string,
  ): Promise<any> {
    const follow = {
      userId: new Types.ObjectId(userId),
      followingId: new Types.ObjectId(followingId),
    };
    return this.followService.create(follow);
  }

  @Delete(':userId/:followingId')
  async delete(
    @Param('userId') userId: string,
    @Param('followingId') followingId: string,
  ): Promise<any> {
    return this.followService.delete(userId, followingId);
  }
}
