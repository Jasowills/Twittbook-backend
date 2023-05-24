import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { PostService } from '../services/post.service';
import { Post as Posts } from '../interface/post.interface';

@Controller('posts')
export class PostController {
  constructor(private readonly postsService: PostService) {}

  @Get()
  findAll(): Promise<Posts[]> {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Posts> {
    return this.postsService.findOne(id);
  }

  @Post()
  create(@Body() post: Posts): Promise<Posts> {
    return this.postsService.create(post);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Posts> {
    return this.postsService.delete(id);
  }

  @Put(':id')
  update(@Body() post: Posts, @Param('id') id: string): Promise<Posts> {
    return this.postsService.update(id, post);
  }
}
