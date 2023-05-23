import { Injectable } from '@nestjs/common';
import { Comment } from './Items/interface/comment.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel('Comment') private readonly commentModel: Model<Comment>,
  ) {}

  async findAll(): Promise<Comment[]> {
    return await this.commentModel.find().exec();
  }

  async findOne(id: string): Promise<Comment> {
    return await this.commentModel.findById(id).exec();
  }

  async create(comment: Comment): Promise<Comment> {
    const newComment = new this.commentModel(comment);
    return await newComment.save();
  }

  async delete(id: string): Promise<Comment> {
    return await this.commentModel.findByIdAndRemove(id).exec();
  }

  async update(id: string, comment: Comment): Promise<Comment> {
    return await this.commentModel
      .findByIdAndUpdate(id, comment, { new: true })
      .exec();
  }
}
