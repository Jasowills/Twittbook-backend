import * as mongoose from 'mongoose';

export interface User extends mongoose.Document {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
}

export const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const UserModel = mongoose.model('User', UserSchema);
export type UserDocument = User & mongoose.Document;
