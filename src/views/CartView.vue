<script setup lang="ts">
import { ProductCardMobile } from '@/components/product';
import { routes } from '@/router';
import useCartStore from '@/stores/cart';
import { DisplayType } from '@/types';
import { useRefStore } from '@/utils/refStore';
import { RouterLink } from 'vue-router';

const { cart } = useRefStore(useCartStore());
</script>

<template>
  <div class="max-w-4xl mx-auto p-4">
    <div v-if="!cart.length" class="flex justify-center items-center h-screen flex-col">
      <h1 class="text-4xl font-bold">Votre panier est vide</h1>
      <RouterLink to="/" class="text-primary-500 underline text-xl">Revenir à l'accueil</RouterLink>
    </div>
    <div v-if="cart.length" class="flex justify-end mb-4">
      <RouterLink
        :to="$router.resolve(routes.checkout)"
        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Passer la commande
      </RouterLink>
    </div>
    <section v-if="cart.length" class="flex flex-col w-full space-y-4">
      <article
        v-for="cartItem in cart"
        :key="cartItem.product.id"
        class="bg-white shadow-lg rounded-lg p-4 flex items-center space-x-4"
      >
        <ProductCardMobile :product="cartItem.product" :quantity="cartItem.quantity" :type="DisplayType.Cart" />
      </article>
    </section>
  </div>
</template>
