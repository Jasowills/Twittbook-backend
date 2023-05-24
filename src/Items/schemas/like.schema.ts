import { Schema, Document, model } from 'mongoose';
import { Like } from '../interface/like.inteface';

export const LikeSchema = new Schema({
  postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export const LikeModel = model<Like>('Like', LikeSchema);
export type LikeDocument = Like & Document;
export { Like };
