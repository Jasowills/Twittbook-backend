import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from './Items/interface/comment.interface';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  findAll(): Promise<Comment[]> {
    return this.commentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Comment> {
    return this.commentService.findOne(id);
  }

  @Post()
  create(@Body() comment: Comment): Promise<Comment> {
    return this.commentService.create(comment);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Comment> {
    return this.commentService.delete(id);
  }

  @Put(':id')
  update(@Body() comment: Comment, @Param('id') id: string): Promise<Comment> {
    return this.commentService.update(id, comment);
  }
}
