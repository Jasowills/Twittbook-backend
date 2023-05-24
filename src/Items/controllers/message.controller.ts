import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { MessageService } from '../services/message.service';
import { Message } from '../schemas/message.schema';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async createMessage(@Body() message: Message): Promise<Message> {
    return this.messageService.create(message);
  }

  @Get(':senderId/:receiverId')
  async getMessages(
    @Param('senderId') senderId: string,
    @Param('receiverId') receiverId: string,
  ): Promise<Message[]> {
    return this.messageService.getMessages(senderId, receiverId);
  }
}
