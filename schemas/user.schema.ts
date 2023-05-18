import { Document, Schema, model } from 'mongoose';

export interface User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
}

export type UserDocument = User & Document;

export const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const UserModel = model<UserDocument>('User', UserSchema);
