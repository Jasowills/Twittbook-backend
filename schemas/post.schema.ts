import { Schema, Document, model } from 'mongoose';

export interface Post extends Document {
  content: string;
  author: string;
}

export const PostSchema = new Schema({
  content: { type: String, required: true },
  author: { type: String, required: true },
});

export const PostModel = model<Post>('Post', PostSchema);
export type PostDocument = Post & Document;
