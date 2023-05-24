import { Schema, model } from 'mongoose';
import {
  Notification,
  NotificationDocument,
} from '../interface/notification.interface';

const NotificationSchema = new Schema<NotificationDocument>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const NotificationModel = model<NotificationDocument>(
  'Notification',
  NotificationSchema,
);
export { Notification, NotificationSchema, NotificationDocument };
