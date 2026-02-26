import { WorkShift } from 'src/generated/prisma/enums';

export class RepairmanDto {
  id: number;
  firstName: string;
  lastName: string;
  workShift: WorkShift;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<RepairmanDto>) {
    Object.assign(this, partial);
  }
}
