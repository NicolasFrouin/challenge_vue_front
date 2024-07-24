<script setup lang="ts">
import { ProductCardMobile } from '@/components/product';
import useAuthStore from '@/stores/auth';
import useCartStore from '@/stores/cart';
import { DisplayType } from '@/types';
import { ref } from 'vue';
import { apiRoutes, useRefStore, useRequest } from '@/utils';

const { token } = useRefStore(useAuthStore());
const { cart } = useRefStore(useCartStore());

const { resData, sendRequest } = useRequest(
  {
    url: apiRoutes.order.new,
    method: 'POST',
    // @ts-ignore
    headers: { Authorization: `Bearer ${token.value}` },
    data: {
      // @ts-ignore
      products: cart.value.map((cartItem) => ({
        id: cartItem.product.id,
        qty: cartItem.quantity,
      })),
    },
  },
  false,
);

const loading = ref(false);
const error = ref<Error | null>(null);

async function handleOrder() {
  loading.value = true;
  error.value = null;
  try {
    await sendRequest();
    if (resData.value) {
      console.log(resData.value);
    }
  } catch (e) {
    if (e instanceof Error) {
      error.value = e;
    } else {
      error.value = new Error('An unknown error occurred');
    }
  } finally {
    loading.value = false;
  }
  await sendRequest();
  if (resData.value) {
    console.log(resData.value);
  }
}
</script>

<template>
  <div class="max-w-6xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Récapitulatif de la commande</h1>
    <div class="bg-white shadow rounded-lg p-4 mb-4">
      <section class="flex flex-col space-y-4">
        <article v-for="cartItem in cart" :key="cartItem.product.id" class="flex items-start space-x-4">
          <ProductCardMobile :product="cartItem.product" :quantity="cartItem.quantity" :type="DisplayType.Cart" />
          <div class="flex-1 min-w-[200px]">
            <h2 class="text-lg font-semibold">{{ cartItem.product.name }}</h2>
            <p class="text-gray-600">Quantité: {{ cartItem.quantity }}</p>
            <p class="text-gray-600">Prix unitaire: {{ cartItem.product.price }}€</p>
            <p class="text-gray-600">Total: {{ cartItem.product.price * cartItem.quantity }}€</p>
          </div>
        </article>
      </section>
      <div class="mt-4 border-t pt-4">
        <div class="flex justify-between text-lg font-bold">
          <span>Total de la commande:</span>
          <span>{{ cart.reduce((total, cartItem) => total + cartItem.product.price * cartItem.quantity, 0) }}€</span>
        </div>
      </div>
    </div>
    <div class="text-right mt-4">
      <button
        type="button"
        @click="handleOrder"
        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        :disabled="loading"
      >
        {{ loading ? 'Processing...' : 'Passer la commande' }}
      </button>
      <p v-if="error" class="text-red-500 mt-2">Une erreur est survenue: {{ error.message }}</p>
    </div>
  </div>
</template>

<style scoped>
/* Add any additional styles here */
</style>

