import { Controller, Get, Param, Patch } from '@nestjs/common';
import { NotificationService } from '../services/notification.service';
import { Notification } from '../schemas/notification.schema';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get(':userId')
  async getNotifications(
    @Param('userId') userId: string,
  ): Promise<Notification[]> {
    return this.notificationService.getNotifications(userId);
  }

  @Patch(':notificationId')
  async markAsRead(
    @Param('notificationId') notificationId: string,
  ): Promise<Notification> {
    return this.notificationService.markAsRead(notificationId);
  }
}
