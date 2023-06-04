import { Controller, Post, Delete, Body, Param } from '@nestjs/common';
import { LikeService } from '../services/like.service';
import { Like } from '../schemas/like.schema';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  async likePost(
    @Body('postId') postId: string,
    @Body('userId') userId: string,
  ): Promise<Like> {
    return this.likeService.likePost(postId, userId);
  }

  @Delete(':postId/:userId')
  async unlikePost(
    @Param('postId') postId: string,
    @Param('userId') userId: string,
  ): Promise<void> {
    await this.likeService.unlikePost(postId, userId);
  }
}
