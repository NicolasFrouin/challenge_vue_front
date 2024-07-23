<script setup lang="ts">
import { ProductCardMobile } from '@/components/product';
import useCartStore from '@/stores/cart';
import { DisplayType } from '@/types';
import { useRefStore } from '@/utils/refStore';

const { cart } = useRefStore(useCartStore());
</script>

<template>
  <h1>Cart</h1>
  <div>
    <section class="flex flex-col w-full">
      <article v-for="cartItem in cart" :key="cartItem.product.id">
        <ProductCardMobile :product="cartItem.product" :quantity="cartItem.quantity" :type="DisplayType.Cart" />
      </article>
    </section>
  </div>
</template>
