import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from '../schemas/message.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel('Message')
    private readonly messageModel: Model<MessageDocument>,
  ) {}

  async create(message: Message): Promise<Message> {
    const newMessage = new this.messageModel(message);
    await newMessage.save();
    return newMessage;
  }

  async getMessages(senderId: string, receiverId: string): Promise<Message[]> {
    return this.messageModel
      .find({
        $or: [
          { senderId: senderId, receiverId: receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      })
      .sort({ createdAt: 'asc' })
      .exec();
  }
}
