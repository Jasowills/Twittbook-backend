import { Schema, model } from 'mongoose';
import { FollowDocument } from '../interface/follow.interface';

export const FollowSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  followingId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export const FollowModel = model<FollowDocument>('Follow', FollowSchema);
export { FollowDocument };
