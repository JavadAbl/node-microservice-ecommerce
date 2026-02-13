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
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './contract/dto/create-customer.dto';
import { UpdateCustomerDto } from './contract/dto/update-customer.dto';
import { CustomerDto } from './contract/dto/customer.dto';
import { GetManyQuery, GetManyQueryType } from 'src/common/contract/query/get-many-query';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createCustomerDto: CreateCustomerDto): Promise<CustomerDto> {
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getManyCustomers(@Query() query: GetManyQuery): Promise<CustomerDto[]> {
    return this.customerService.findMany(query as GetManyQueryType<'Customers'>);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id', ParseIntPipe) id: number): Promise<CustomerDto> {
    return this.customerService.findOne(id);
  }

  @Get('mobile/:mobile')
  @HttpCode(HttpStatus.OK)
  async getByMobile(@Param('mobile') mobile: string): Promise<CustomerDto> {
    return this.customerService.findByMobile(mobile);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param(ParseIntPipe) id: number,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<CustomerDto> {
    return this.customerService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param(ParseIntPipe) id: number): Promise<CustomerDto> {
    return this.customerService.remove(id);
  }
}
