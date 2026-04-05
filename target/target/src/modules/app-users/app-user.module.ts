import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppUserController } from './app-user.controller';
import { AppUsersService } from './app-users.service';

@Module({
	imports: [
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (config: ConfigService) => ({
				secret: config.get<string>('JWT_SECRET') ?? 'dev-secret-change-me',
				signOptions: {
					// @nestjs/jwt types `expiresIn` as `ms` StringValue; env/config is a plain string.
					expiresIn: (config.get<string>('JWT_EXPIRES_IN') ?? '15m') as `${number}m` | `${number}d` | number,
				},
			}),
		}),
	],
	controllers: [AppUserController],
	providers: [AppUsersService],
})
export class AppUsersModule {}
