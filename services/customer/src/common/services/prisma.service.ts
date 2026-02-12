import { Injectable } from '@nestjs/common';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { ConfigService } from '@nestjs/config';
import { AppConfig, ConfigType } from '../config/config.type';
import { PrismaClient } from 'src/generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(configService: ConfigService<ConfigType>) {
    const config = configService.getOrThrow<AppConfig>('app');

    const adapter = new PrismaMariaDb({
      ssl: false,
      host: config.HTTP_HOST,
      user: config.DATABASE_USERNAME,
      password: config.DATABASE_PASSWORD,
      database: config.DATABASE_NAME,
      port: config.DATABASE_PORT,
      allowPublicKeyRetrieval: true,
    });
    super({ adapter });
  }
}
