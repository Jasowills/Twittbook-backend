import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './post.module';
import config from '../config/key';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { UserModule } from './user.module';

@Module({
  imports: [PostModule, UserModule, MongooseModule.forRoot(config.mongoURI)],
  controllers: [PostController], // Include PostController here
  providers: [],
})
export class AppModule {}
