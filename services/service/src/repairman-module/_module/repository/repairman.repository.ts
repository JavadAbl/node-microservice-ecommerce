import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigType } from '../../../common/config/config.type';
import { Repository } from '../../../common/Repository/common.repository';

@Injectable()
export class RepairmanRepository extends Repository<'repairman'> {
  constructor(configService: ConfigService<ConfigType>) {
    super('repairman', configService);
  }
}
