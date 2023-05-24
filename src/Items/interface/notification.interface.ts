import { Document, Types } from 'mongoose';

export interface Notification {
  userId: Types.ObjectId;
  message: string;
  read: boolean;
  createdAt?: Date;
}

export interface NotificationDocument extends Notification, Document {}
