import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigType } from '../../../common/config/config.type';
import { Repository } from '../../../common/Repository/common.repository';

@Injectable()
export class ServiceRepository extends Repository<'service'> {
  constructor(configService: ConfigService<ConfigType>) {
    super('service', configService);
  }
}
