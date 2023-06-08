import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './post.module';
import { CommentModule } from './comment.module';
import { UserModule } from './user.module';
import config from '../../config/key';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { LikeModule } from './like.module';
import { FollowModule } from './follow.module';
import { MessageModule } from './message.module';
import { NotificationModule } from './notification.module';
import { MyWebSocketGateway } from './../../websocket.gateway'; // Import the WebSocket gateway

@Module({
  imports: [
    NotificationModule,
    MessageModule,
    FollowModule,
    LikeModule,
    PostModule,
    CommentModule,
    UserModule,
    MongooseModule.forRoot(config.mongoURI),
  ],
  controllers: [AppController],
  providers: [AppService, MyWebSocketGateway], // Include the WebSocket gateway as a provider
})
export class AppModule {}
