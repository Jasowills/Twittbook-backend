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
import { CommentService } from '../services/comment.service';
import { Comment } from '../interface/comment.interface'; // Add this import statement

@Controller('posts')
export class PostController {
  constructor(
    private readonly postsService: PostService,
    private readonly commentService: CommentService, // Combine the constructor into one
  ) {}

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

  @Get(':id/comments')
  async getPostComments(@Param('id') postId: string): Promise<Comment[]> {
    return this.commentService.getCommentsByPostId(postId);
  }
}
