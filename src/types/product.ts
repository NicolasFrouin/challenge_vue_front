export type Product = {
  id: number;
  slug: string;
  name?: string;
  title?: string;
  description: string;
  price: number;
  image: string;
};

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
