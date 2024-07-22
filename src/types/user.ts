export type User = {
  id: number;
  name?: string;
  email?: string;
  role: Role;
};

export enum Role {
  Admin = '100',
  Accountant = '10',
  User = '1',
}
