import * as mongoose from 'mongoose';
import { User } from '../interface/user.interface';

export type UserDocument = User & mongoose.Document;

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isFollowing: { type: Number, default: 0 },
  followers: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  profilePicture: { type: String },
});

export const UserModel = mongoose.model<UserDocument>('User', UserSchema);
export { User, UserSchema };
