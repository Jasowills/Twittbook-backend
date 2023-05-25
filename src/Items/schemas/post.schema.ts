import { Schema, Document, model } from 'mongoose';
import { Post } from '../interface/post.interface';

export type PostDocument = Post & Document;

export const PostSchema = new Schema({
  content: { type: String, required: true },
  author: { type: String, required: true },
  likes: { type: Number, default: 0 },
  image: { type: String }, // Image field is optional
  comments: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export const PostModel = model<PostDocument>('Post', PostSchema);
