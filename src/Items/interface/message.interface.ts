import { Document, Types } from 'mongoose';

export interface Message {
  // conversationId: Types.ObjectId;
  senderId: Types.ObjectId;
  receiverId: Types.ObjectId;
  content: string;
  createdAt?: Date;
}

export interface MessageDocument extends Message, Document {}
