import type { Base } from './base';

export interface Product extends Base {
  slug: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stockReal: number;
  stockVirtual: number;
}

export enum LineOf {
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
  SIX = 6,
}

export enum DisplayType {
  Product = 'product',
  Cart = 'cart',
}
