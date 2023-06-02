import { Injectable } from '@nestjs/common';
import { Post } from '../interface/post.interface';
import { Model, Document, PopulatedDoc } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

export type PostDocument = Post & Document;

@Injectable()
export class PostService {
  constructor(
    @InjectModel('Post') private readonly postModel: Model<PostDocument>,
  ) {}

  async findAll(): Promise<Post[]> {
    return await this.postModel.find().exec();
  }

  async findOne(id: string): Promise<Post> {
    return await this.postModel.findById(id).exec();
  }

  async create(post: Post): Promise<Post> {
    const newPost = new this.postModel(post);
    const populatedPost = await newPost.save();
    await populatedPost.populate('userId', 'username profilePicture');
    return populatedPost;
  }

  async delete(id: string): Promise<Post> {
    return await this.postModel.findByIdAndRemove(id).exec();
  }

  async update(id: string, post: Post): Promise<Post> {
    return await this.postModel
      .findByIdAndUpdate(id, post, { new: true })
      .exec();
  }
}
