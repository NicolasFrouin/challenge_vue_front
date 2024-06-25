import { defineStore } from 'pinia';
import type { Product } from '@/types';
import { reactive } from 'vue';

const useCartStore = defineStore('cart', () => {
  const cart: Product[] = reactive([]);

  function addProduct(product: Product) {
    cart.push(product);
  }

  function removeProduct(product: Product) {
    const index = cart.findIndex((p) => p.id === product.id);
    cart.splice(index, 1);
  }

  return { cart, addProduct, removeProduct };
});

export default useCartStore;
