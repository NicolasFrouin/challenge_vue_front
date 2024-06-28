import { defineStore } from 'pinia';
import type { Product } from '@/types';
import { computed, reactive, type ComputedRef } from 'vue';

type CartItem = {
  product: Product;
  quantity: number;
  addedAt: Date;
};

type CartStore = {
  cart: CartItem[];
  totalPrice: ComputedRef<number>;
  totalProducts: ComputedRef<number>;
  addProduct: (product: Product, quantity?: number) => void;
  setQuantity: (product: Product, quantity: number) => void;
  removeProduct: (product: Product) => void;
};

const useCartStore = defineStore('cart', (): CartStore => {
  const localStorageCart = localStorage.getItem('cart') || '[]';
  const cart: CartItem[] = reactive(JSON.parse(localStorageCart));

  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function addProduct(product: Product, quantity = 1) {
    const index = cart.findIndex((item) => item.product.id === product.id);
    if (index === -1) {
      cart.push({ product, quantity, addedAt: new Date() });
    } else {
      cart[index].quantity += quantity;
    }
    saveCart();
  }

  function setQuantity(product: Product, quantity: number) {
    const index = cart.findIndex((item) => item.product.id === product.id);
    if (index !== -1) {
      cart[index].quantity = quantity;
      if (quantity <= 0) {
        cart.splice(index, 1);
      }
    }
    saveCart();
  }

  function removeProduct(product: Product) {
    const index = cart.findIndex((item) => item.product.id === product.id);
    if (index !== -1) {
      cart.splice(index, 1);
    }
    saveCart();
  }

  const totalPrice = computed(() => cart.reduce((acc, item) => acc + item.product.price, 0));
  const totalProducts = computed(() => cart.reduce((acc, item) => acc + item.quantity, 0));

  return { cart, totalPrice, totalProducts, addProduct, setQuantity, removeProduct };
});

export default useCartStore;
