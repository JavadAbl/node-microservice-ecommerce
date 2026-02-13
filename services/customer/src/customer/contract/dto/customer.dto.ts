export class CustomerDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  city: string;
  address: string;

  constructor(partial: Partial<CustomerDto>) {
    Object.assign(this, partial);
  }
}
