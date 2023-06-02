import { Injectable } from '@nestjs/common';
import { Post } from '../interface/post.interface';
import { Model, Document, PopulatedDoc } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from '../schemas/user.schema';

export type PostDocument = Post & Document;

@Injectable()
export class PostService {
  constructor(
    @InjectModel('Post') private readonly postModel: Model<PostDocument>,
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async findAll(): Promise<Post[]> {
    return await this.postModel.find().exec();
  }

  async findOne(id: string): Promise<Post> {
    return await this.postModel.findById(id).exec();
  }

  async create(post: Post, userId: string): Promise<Post> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new Error('User not found');
    }

    const newPost = new this.postModel(post);
    newPost.userId = user._id; // Set the userId property
    newPost.user.username = user.username; // Set the userName property
    newPost.user.profilePicture = user.profilePicture; // Set the userProfilePicture property

    const savedPost = await newPost.save();
    return savedPost;
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
