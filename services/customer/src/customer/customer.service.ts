import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { CreateCustomerDto } from './contract/dto/create-customer.dto';
import { UpdateCustomerDto } from './contract/dto/update-customer.dto';
import { CustomerDto } from './contract/dto/customer.dto';
import { GetManyQueryType } from 'src/common/contract/query/get-many-query';
import { buildFindManyArgs } from 'src/common/utils/prisma-util';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<CustomerDto> {
    const customer = await this.prisma.customers.create({
      data: {
        firstName: createCustomerDto.firstName,
        lastName: createCustomerDto.lastName,
        email: createCustomerDto.email,
        mobile: createCustomerDto.mobile,
        city: createCustomerDto.city,
        address: createCustomerDto.address,
      },
    });

    return new CustomerDto(customer);
  }

  findMany(query: GetManyQueryType<'Customers'>) {
    const predicate = buildFindManyArgs(query, { searchableFields: ['firstName', 'lastName', 'email'] });
    return this.prisma.customers.findMany(predicate);
  }

  async findOne(id: number): Promise<CustomerDto> {
    const customer = await this.prisma.customers.findUnique({ where: { id } });

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    return new CustomerDto(customer);
  }

  async findByMobile(mobile: string): Promise<CustomerDto> {
    const customer = await this.prisma.customers.findUnique({ where: { mobile } });

    if (!customer) {
      throw new NotFoundException(`Customer with mobile ${mobile} not found`);
    }

    return new CustomerDto(customer);
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<CustomerDto> {
    // Check if customer exists
    await this.findOne(id);

    const updatedCustomer = await this.prisma.customers.update({
      where: { id },
      data: {
        ...(updateCustomerDto.firstName && { firstName: updateCustomerDto.firstName }),
        ...(updateCustomerDto.lastName && { lastName: updateCustomerDto.lastName }),
        ...(updateCustomerDto.email && { email: updateCustomerDto.email }),
        ...(updateCustomerDto.mobile && { mobile: updateCustomerDto.mobile }),
        ...(updateCustomerDto.city && { city: updateCustomerDto.city }),
        ...(updateCustomerDto.address && { address: updateCustomerDto.address }),
      },
    });

    return new CustomerDto(updatedCustomer);
  }

  async remove(id: number): Promise<CustomerDto> {
    // Check if customer exists
    const customer = await this.findOne(id);

    await this.prisma.customers.delete({ where: { id } });

    return customer;
  }
}
