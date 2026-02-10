export type CreateCustomer = {
  id: number;
  firstName: string;
  lastName: string;
  nationalCode: string;
  mobile: string;
  email: string;
};

export type UpdateCustomer = {
  id: number;
  firstName?: string;
  lastName?: string;
  nationalCode?: string;
  mobile?: string;
  email?: string;
};

export type Customer = CreateCustomer;
