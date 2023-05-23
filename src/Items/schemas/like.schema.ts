import { Schema, Document, model } from 'mongoose';

export interface Like extends Document {
  postId: string;
  userId: string;
}

export const LikeSchema = new Schema({
  postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export const LikeModel = model<Like>('Like', LikeSchema);
export type LikeDocument = Like & Document;
