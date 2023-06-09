import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
} from '@nestjs/common';
import { Post as Posts } from '../interface/post.interface';
import { PostService } from '../services/post.service';
import { CommentService } from '../services/comment.service';
import { Comment } from '../interface/comment.interface';

@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly commentService: CommentService,
  ) {}

  @Get()
  findAll(): Promise<Posts[]> {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Posts> {
    return this.postService.findOne(id);
  }

  @Post(':userId')
  create(@Body() post: Posts, @Param('userId') userId: string): Promise<Posts> {
    return this.postService.create(post, userId);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Posts> {
    return this.postService.delete(id);
  }

  @Put(':id')
  update(@Body() post: Posts, @Param('id') id: string): Promise<Posts> {
    return this.postService.update(id, post);
  }

  @Get(':id/comments')
  async getPostComments(@Param('id') postId: string): Promise<Comment[]> {
    return this.commentService.getCommentsByPostId(postId);
  }
}
