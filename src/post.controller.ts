import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostEntity } from '../schemas/post.schema';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create')
  async createPost(@Body() post: PostEntity): Promise<PostEntity> {
    return this.postService.createPost(post);
  }

  @Get()
  async getAllPosts(): Promise<PostEntity[]> {
    return this.postService.getAllPosts();
  }

  @Get(':id')
  async getPostById(@Param('id') id: string): Promise<PostEntity> {
    return this.postService.getPostById(id);
  }

  @Put(':id')
  async updatePostById(
    @Param('id') id: string,
    @Body() post: PostEntity,
  ): Promise<PostEntity> {
    return this.postService.updatePostById(id, post);
  }

  @Delete(':id')
  async deletePostById(@Param('id') id: string): Promise<void> {
    return this.postService.deletePostById(id);
  }
}
