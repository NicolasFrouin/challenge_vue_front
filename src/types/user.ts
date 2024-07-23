export type User = {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  name?: string;
  email?: string;
  role: Role;
};

export enum Role {
  Admin = '100',
  Accountant = '10',
  User = '1',
}
