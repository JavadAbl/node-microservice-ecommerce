import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig, configValidationSchema } from './common/config/app.config';
import { RepairmanModule } from './repairman-module/repairman.module';
import { ServiceModule } from './serivce-module/service.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      validationSchema: configValidationSchema,
      validationOptions: {
        allowUnknown: true, // Allows variables not defined in schema
        abortEarly: true, // Stops validation on the first error
      },
    }),
    RepairmanModule,
    ServiceModule,
  ],
  providers: [],
})
export class AppModule {}
