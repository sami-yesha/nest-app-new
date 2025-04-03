// apps/users/src/app.module.ts
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'libs/database/src/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'libs/database/src/models/user.model';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available globally
      envFilePath: '.env',
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    DatabaseModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
