import { Module } from '@nestjs/common';
import { RepairmanController } from './_module/contollers/repairman.controller';
import { RepairmanService } from './_module/services/repairman.service';
import { RepairmanRepository } from './_module/repository/repairman.repository';

@Module({ controllers: [RepairmanController], providers: [RepairmanService, RepairmanRepository] })
export class RepairmanModule {}
