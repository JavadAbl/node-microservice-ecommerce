import { Module } from '@nestjs/common';
import { ServiceEntityService } from './_module/services/service-entity.service';
import { ServiceController } from './_module/controllers/service.controller';
import { ServiceRepository } from './_module/repository/service.repository';

@Module({
  imports: [],
  controllers: [ServiceController],
  providers: [ServiceEntityService, ServiceRepository],
})
export class ServiceModule {}
