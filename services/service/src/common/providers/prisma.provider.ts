import { Injectable } from '@nestjs/common';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { ConfigService } from '@nestjs/config';
import { ConfigType } from '../config/config.type';
import { Repository } from '../Repository/common-repository';

@Injectable()
export class PrismaProvider extends Repository<'repairman'> {
  constructor(configService: ConfigService<ConfigType>) {
    super('repairman', configService);
  }
}
