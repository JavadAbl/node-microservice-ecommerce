import { Module } from '@nestjs/common';
import { RepairmanController } from './repairman.controller';
import { RepairmanService } from './repairman.service';
import { PrismaProvider } from 'src/common/providers/prisma.provider';

@Module({ controllers: [RepairmanController], providers: [RepairmanService, PrismaProvider] })
export class RepairmanModule {}
