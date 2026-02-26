import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { RepairmanService } from './repairman.service';
import { GetManyQuery, GetManyQueryType } from 'src/common/contract/query/get-many-query';
import { CreateRepairmanDto } from './contract/dto/request/create-repairman.dto';
import { UpdateRepairmanDto } from './contract/dto/request/update-repairman.dto';
import { RepairmanDto } from './contract/dto/response/repairman.dto';

@Controller('Repairman')
export class RepairmanController {
  constructor(private readonly customerService: RepairmanService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createRepairmanDto: CreateRepairmanDto): Promise<RepairmanDto> {
    return this.customerService.create(createRepairmanDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getManyRepairmans(@Query() query: GetManyQuery): Promise<RepairmanDto[]> {
    return this.customerService.findMany(query as GetManyQueryType<'Repairman'>);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id', ParseIntPipe) id: number): Promise<RepairmanDto> {
    return this.customerService.findOne(id);
  }

  @Get('mobile/:mobile')
  @HttpCode(HttpStatus.OK)
  async getByMobile(@Param('mobile') mobile: string): Promise<RepairmanDto> {
    return this.customerService.findByMobile(mobile);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param(ParseIntPipe) id: number,
    @Body() updateRepairmanDto: UpdateRepairmanDto,
  ): Promise<RepairmanDto> {
    return this.customerService.update(id, updateRepairmanDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param(ParseIntPipe) id: number): Promise<RepairmanDto> {
    return this.customerService.remove(id);
  }
}
