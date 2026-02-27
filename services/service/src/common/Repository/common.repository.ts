import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { Prisma, PrismaClient } from 'src/generated/prisma/client';
import { AppConfig, ConfigType } from '../config/config.type';
import { ConfigService } from '@nestjs/config';
import { ConflictException, NotFoundException } from '@nestjs/common';

export class Repository<TModel extends keyof PrismaClient> extends PrismaClient {
  constructor(
    private readonly model: TModel,
    configService: ConfigService<ConfigType>,
  ) {
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

  private get entityName(): string {
    return String(this.model);
  }

  // --- READ ---

  async findMany<TArgs extends Prisma.Args<PrismaClient[TModel], 'findMany'>>(
    args?: TArgs,
  ): Promise<Prisma.Result<PrismaClient[TModel], TArgs, 'findMany'>> {
    return await (this[this.model] as any).findMany(args);
  }

  async findUnique<TArgs extends Prisma.Args<PrismaClient[TModel], 'findUnique'>>(
    args: TArgs,
  ): Promise<Prisma.Result<PrismaClient[TModel], TArgs, 'findUnique'> | null> {
    return await (this[this.model] as any).findUnique(args);
  }

  async findFirst<TArgs extends Prisma.Args<PrismaClient[TModel], 'findFirst'>>(
    args: TArgs,
  ): Promise<Prisma.Result<PrismaClient[TModel], TArgs, 'findFirst'> | null> {
    return await (this[this.model] as any).findFirst(args);
  }

  async findBy<TArgs extends Prisma.Args<PrismaClient[TModel], 'findFirst'>>(
    args: TArgs,
  ): Promise<Prisma.Result<PrismaClient[TModel], TArgs, 'findFirst'> | null> {
    return await this.findFirst(args);
  }

  async findAndCheckExistsBy<TArgs extends Prisma.Args<PrismaClient[TModel], 'findFirst'>>(
    args: TArgs,
    fieldName: string,
    value: any,
  ): Promise<Prisma.Result<PrismaClient[TModel], TArgs, 'findFirst'>> {
    const entity = await (this[this.model] as any).findFirst(args);
    if (!entity) throw new NotFoundException(`${this.entityName} ${fieldName} with value ${value} not found`);
    return entity;
  }

  async checkDuplicateBy<TArgs extends Prisma.Args<PrismaClient[TModel], 'findFirst'>>(
    args: TArgs,
    fieldName: string,
    value: any,
  ): Promise<void> {
    const entity = await (this[this.model] as any).findFirst(args);
    if (entity)
      throw new ConflictException(`${this.entityName} ${fieldName} with value ${value} already exists`);
  }

  // --- WRITE ---

  async create<TArgs extends Prisma.Args<PrismaClient[TModel], 'create'>>(
    args: TArgs,
  ): Promise<Prisma.Result<PrismaClient[TModel], TArgs, 'create'>> {
    return await (this[this.model] as any).create(args);
  }

  async update<TArgs extends Prisma.Args<PrismaClient[TModel], 'update'>>(
    args: TArgs,
  ): Promise<Prisma.Result<PrismaClient[TModel], TArgs, 'update'>> {
    return await (this[this.model] as any).update(args);
  }

  async upsert<TArgs extends Prisma.Args<PrismaClient[TModel], 'upsert'>>(
    args: TArgs,
  ): Promise<Prisma.Result<PrismaClient[TModel], TArgs, 'upsert'>> {
    return await (this[this.model] as any).upsert(args);
  }

  // 'delete' is a reserved keyword in JS/TS, so we use 'remove' or 'deleteOne'
  async remove<TArgs extends Prisma.Args<PrismaClient[TModel], 'delete'>>(
    args: TArgs,
  ): Promise<Prisma.Result<PrismaClient[TModel], TArgs, 'delete'>> {
    return await (this[this.model] as any).delete(args);
  }
}
