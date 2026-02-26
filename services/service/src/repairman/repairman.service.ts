import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRepairmanDto } from './contract/dto/request/create-repairman.dto';
import { UpdateRepairmanDto } from './contract/dto/request/update-repairman.dto';
import { RepairmanDto } from './contract/dto/response/repairman.dto';
import { GetManyQueryType } from 'src/common/contract/query/get-many-query';
import { buildFindManyArgs } from 'src/common/utils/prisma-util';
import { PrismaProvider } from 'src/common/providers/prisma.provider';

@Injectable()
export class RepairmanService {
  constructor(private readonly prisma: PrismaProvider) {}

  async create(payload: CreateRepairmanDto): Promise<RepairmanDto> {
    const customer = await this.prisma.repairman.create({ data: payload });

    return new RepairmanDto(customer);
  }

  findMany(query: GetManyQueryType<'Repairman'>) {
    const predicate = buildFindManyArgs(query, { searchableFields: ['firstName', 'lastName'] });
    return this.prisma.repairman.findMany(predicate);
  }

  async findOne(id: number): Promise<RepairmanDto> {
    const customer = await this.prisma.repairman.findUnique({ where: { id } });

    if (!customer) {
      throw new NotFoundException(`Repairman with ID ${id} not found`);
    }

    return new RepairmanDto(customer);
  }

  async findByMobile(mobile: string): Promise<RepairmanDto> {
    const customer = await this.prisma.repairman.findUnique({ where: { mobile } });

    if (!customer) {
      throw new NotFoundException(`Repairman with mobile ${mobile} not found`);
    }

    return new RepairmanDto(customer);
  }

  async update(id: number, updateRepairmanDto: UpdateRepairmanDto): Promise<RepairmanDto> {
    // Check if customer exists
    await this.findOne(id);

    const updatedRepairman = await this.prisma.repairman.update({
      where: { id },
      data: {
        ...(updateRepairmanDto.firstName && { firstName: updateRepairmanDto.firstName }),
        ...(updateRepairmanDto.lastName && { lastName: updateRepairmanDto.lastName }),
        ...(updateRepairmanDto.email && { email: updateRepairmanDto.email }),
        ...(updateRepairmanDto.mobile && { mobile: updateRepairmanDto.mobile }),
        ...(updateRepairmanDto.city && { city: updateRepairmanDto.city }),
        ...(updateRepairmanDto.address && { address: updateRepairmanDto.address }),
      },
    });

    return new RepairmanDto(updatedRepairman);
  }

  async remove(id: number): Promise<RepairmanDto> {
    // Check if customer exists
    const customer = await this.findOne(id);

    await this.prisma.repairman.delete({ where: { id } });

    return customer;
  }
}
