import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CommentService } from '../services/comment.service';
import { Comment } from '../interface/comment.interface';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(':userId') // Add ':userId' route parameter
  async create(
    @Body() comment: Comment,
    @Param('userId') userId: string,
  ): Promise<Comment> {
    return this.commentService.create(comment, userId);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Comment> {
    return this.commentService.delete(id);
  }
}
