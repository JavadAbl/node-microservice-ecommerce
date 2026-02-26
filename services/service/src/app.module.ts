import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './common/config/app.config';
import { RepairmanModule } from './repairman/repairman.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [appConfig] }), RepairmanModule],
  providers: [],
})
export class AppModule {}
