import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './common/config/app.config';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [appConfig] }), CustomerModule],
  providers: [],
})
export class AppModule {}
