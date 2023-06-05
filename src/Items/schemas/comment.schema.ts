import { Schema, Document, model } from 'mongoose';
import { Comment } from '../interface/comment.interface';

export type CommentDocument = Comment & Document;

export const CommentSchema = new Schema({
  userId: { type: String, required: true },
  postId: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  user: {
    username: { type: String },
    profilePicture: { type: String },
  },
});

export const CommentModel = model<CommentDocument>('Comment', CommentSchema);
