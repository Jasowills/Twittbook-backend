import { Document, Types } from 'mongoose';

export interface Follow {
  userId: Types.ObjectId | string;
  followingId: Types.ObjectId | string;
}

export type FollowDocument = Follow & Document;
