<script setup lang="ts">
import { ProductCardMobile } from '@/components/product';
import useAuthStore from '@/stores/auth';
import useCartStore from '@/stores/cart';
import { DisplayType } from '@/types';
import { apiRoutes, useRefStore, useRequest } from '@/utils';

const { token } = useRefStore(useAuthStore());
const { cart } = useRefStore(useCartStore());

const { resData, sendRequest } = useRequest(
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
  await sendRequest();
  if (resData.value) {
    console.log(resData.value);
  }
}
</script>

<template>
  <div>
    <button type="button" @click="handleOrder">Order</button>
  </div>
  <div>
    <section class="flex flex-col w-full">
      <article v-for="cartItem in cart" :key="cartItem.product.id">
        <ProductCardMobile :product="cartItem.product" :quantity="cartItem.quantity" :type="DisplayType.Cart" />
      </article>
    </section>
  </div>
</template>
