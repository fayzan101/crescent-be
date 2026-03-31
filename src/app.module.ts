import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { ClientsModule } from './modules/clients/clients.module';

@Module({
  imports: [ClientsModule],
  controllers: [HealthController],
})
export class AppModule {}
