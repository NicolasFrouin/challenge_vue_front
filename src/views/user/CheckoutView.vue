<script setup lang="ts">
import { AppLoading } from '@/components/main';
import { ProductCardMobile } from '@/components/product';
import { routes } from '@/router';
import useAuthStore from '@/stores/auth';
import useCartStore from '@/stores/cart';
import { DisplayType } from '@/types';
import { apiRoutes, useRefStore, useRequest } from '@/utils';
import { useRouter } from 'vue-router';

const router = useRouter();
const { token } = useRefStore(useAuthStore());
const { cart, clearCart } = useRefStore(useCartStore());

const { resData, sendRequest, isLoading, error } = useRequest(
  {
    url: apiRoutes.orders.create,
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

async function handleOrder() {
  sendRequest().then(() => {
    if (resData.value) {
      clearCart();
      router.push(router.resolve(routes.afterCheckout));
    }
  });
}
</script>

<template>
  <div class="max-w-6xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Récapitulatif de la commande</h1>
    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <p>Commande impossible, veuillez vérifier votre panier et réessayer.</p>
      <p>{{ (error?.response?.data as any)?.error ?? 'Une erreur est survenue' }}</p>
    </div>
    <AppLoading v-if="isLoading" />
    <div class="bg-white shadow rounded-lg p-4 mb-4">
      <section class="flex flex-col space-y-4">
        <article v-for="cartItem in cart" :key="cartItem.product.id" class="flex items-start space-x-4">
          <ProductCardMobile :product="cartItem.product" :quantity="cartItem.quantity" :type="DisplayType.Cart" />
          <div class="flex-1 min-w-[200px]">
            <h2 class="text-lg font-semibold">{{ cartItem.product.name }}</h2>
            <p class="text-gray-600">Quantité : {{ cartItem.quantity }}</p>
            <p class="text-gray-600">Prix unitaire : {{ cartItem.product.price }}€</p>
            <p class="text-gray-600">Total : {{ cartItem.product.price * cartItem.quantity }}€</p>
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
        class="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded disabled:cursor-not-allowed disabled:bg-gray-300"
        :disabled="isLoading || !!error"
      >
        {{ isLoading ? 'Commande en cours...' : 'Passer la commande' }}
      </button>
    </div>
  </div>
</template>
