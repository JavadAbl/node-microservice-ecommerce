import { Injectable } from '@nestjs/common';
import { CreateRepairmanDto } from '../contract/dto/request/create-repairman.dto';
import { UpdateRepairmanDto } from '../contract/dto/request/update-repairman.dto';
import { RepairmanDto } from '../contract/dto/response/repairman.dto';
import { GetManyQueryType } from 'src/common/contract/query/get-many-query';
import { RepairmanRepository } from '../repository/repairman.repository';
import { buildFindManyArgs } from 'src/common/utils/prisma-util';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class RepairmanService {
  constructor(private readonly repairmanRep: RepairmanRepository) {}

  async create(payload: CreateRepairmanDto): Promise<RepairmanDto> {
    const { employeeNumber } = payload;
    await this.repairmanRep.checkDuplicateBy({ where: { employeeNumber } }, 'employeeNumber', employeeNumber);
    const repairman = await this.repairmanRep.create({ data: payload });
    return plainToInstance(RepairmanDto, repairman);
  }

  async findMany(query: GetManyQueryType<'Repairman'>): Promise<RepairmanDto[]> {
    const predicate = buildFindManyArgs(query, { searchableFields: ['firstName', 'lastName'] });
    const repairmans = await this.repairmanRep.findMany(predicate);
    return plainToInstance(RepairmanDto, repairmans);
  }

  async getById(id: number): Promise<RepairmanDto> {
    const repairman = await this.repairmanRep.findAndCheckExistsBy({ where: { id } }, 'id', id);
    return plainToInstance(RepairmanDto, repairman);
  }

  async update(id: number, payload: UpdateRepairmanDto): Promise<RepairmanDto> {
    await this.repairmanRep.findAndCheckExistsBy({ where: { id } }, 'id', id);
    const updatedRepairman = await this.repairmanRep.repairman.update({ where: { id }, data: payload });
    return plainToInstance(RepairmanDto, updatedRepairman);
  }

  async remove(id: number): Promise<void> {
    await this.repairmanRep.findAndCheckExistsBy({ where: { id } }, 'id', id);
    await this.repairmanRep.repairman.delete({ where: { id } });
  }
}
