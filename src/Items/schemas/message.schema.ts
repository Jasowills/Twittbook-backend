import { Schema, model } from 'mongoose';
import { Message, MessageDocument } from '../interface/message.interface';

const MessageSchema = new Schema<MessageDocument>({
  // conversationId: { type: Schema.Types.ObjectId, required: tru },
  senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const MessageModel = model<MessageDocument>('Message', MessageSchema);
export { Message, MessageDocument, MessageSchema };
