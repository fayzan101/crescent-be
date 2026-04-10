import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { AppUserController } from './app-user.controller';
import { AppUsersService } from './app-users.service';

@Module({
  imports: [AuthModule],
  controllers: [AppUserController],
  providers: [AppUsersService],
})
export class AppUsersModule {}
