import type { Product } from './product';

export type Category = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  name: string;
  slug: string;
  description: string;
  status: number;
  Products?: Product[];
};
