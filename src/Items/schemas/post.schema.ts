import { Schema, Document, model } from 'mongoose';
import { Post } from '../interface/post.interface';

export type PostDocument = Post & Document;

export const PostSchema = new Schema({
  content: { type: String, required: true },
  userId: { type: String, required: true },
  likes: { type: Number, default: 0 },
  image: { type: String },
  comments: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  user: {
    username: { type: String },
    profilePicture: { type: String },
  },
});

export const PostModel = model<PostDocument>('Post', PostSchema);
