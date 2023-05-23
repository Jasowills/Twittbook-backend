import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './post.module';
import { CommentModule } from './comment.module';
import { UserModule } from './user.module';
import config from './config/key';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    PostModule,
    CommentModule,
    UserModule,
    MongooseModule.forRoot(config.mongoURI),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
