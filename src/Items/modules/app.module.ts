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

@Module({
  imports: [
    FollowModule,
    LikeModule,
    PostModule,
    CommentModule,
    UserModule,
    MongooseModule.forRoot(config.mongoURI),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
