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
  <div>
    <div>
      <RouterLink :to="$router.resolve(routes.checkout)">Checkout</RouterLink>
    </div>
    <section class="flex flex-col w-full">
      <article v-for="cartItem in cart" :key="cartItem.product.id">
        <ProductCardMobile :product="cartItem.product" :quantity="cartItem.quantity" :type="DisplayType.Cart" />
      </article>
    </section>
  </div>
</template>
