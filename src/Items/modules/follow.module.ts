import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FollowSchema } from '../schemas/follow.schema';
import { FollowService } from '../services/follow.service';
import { FollowController } from '../controllers/follow.controller';
import { UserModel, UserSchema } from '../schemas/user.schema'; // Import the UserModel

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Follow', schema: FollowSchema },
      { name: 'User', schema: UserSchema }, // Add the User schema
    ]),
  ],
  providers: [FollowService, UserModel], // Include the UserModel as a provider
  controllers: [FollowController],
})
export class FollowModule {}
