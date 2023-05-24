import { Controller, Post, Delete, Body, Param } from '@nestjs/common';
import { LikeService } from '../services/like.service';
import { Like } from '../schemas/like.schema';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  async create(@Body() like: Like): Promise<Like> {
    return this.likeService.create(like);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Like> {
    return this.likeService.delete(id);
  }
}
