import type { Base } from './base';
import type { Product } from './product';

export interface Category extends Base {
  deletedAt: Date | null;
  name: string;
  slug: string;
  description: string;
  status: number;
  Products?: Product[];
}
