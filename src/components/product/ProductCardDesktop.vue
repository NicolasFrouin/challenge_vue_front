<script lang="ts" setup>
import useCartStore from '@/stores/cart';
import type { Product } from '@/types';
import { useRefStore } from '@/utils/refStore';
import { SfButton, SfIconShoppingCart, SfTooltip } from '@storefront-ui/vue';

const { product } = defineProps<{ product: Product }>();

const { addProduct } = useRefStore(useCartStore());
</script>

<template>
  <div class="border border-neutral-200 rounded-md hover:shadow-lg h-[34rem] z-10 cursor-pointer">
    <div class="flex justify-center mt-1">
      <img
        :src="product.image || 'https://via.placeholder.com/300x300'"
        :alt="`${product.name} image`"
        class="block object-contain rounded-md aspect-square h-72 w-72"
        width="300"
        height="300"
      />
    </div>
    <div class="p-4 border-t border-neutral-200 flex flex-col justify-between h-64">
      <div>
        <span class="wwbw block no-underline overflow-ellipsis overflow-hidden text-base h-12">
          {{ product.name }}
        </span>
        <!-- <div class="flex items-center pt-1">
          <SfRating size="xs" :value="5" :max="5" />
          <span class="pl-1 no-underline">
            <SfCounter size="xs">123</SfCounter>
          </span>
        </div> -->
        <p
          class="wwbw block py-2 font-normal leading-5 text-sm text-neutral-700 overflow-ellipsis overflow-hidden h-[70px]"
        >
          {{ product.description }}
        </p>
      </div>
      <div class="mb-1">
        <span class="block pb-2 font-bold text-lg">{{ product.price }}€</span>
        <SfTooltip :label="product.stockVirtual <= 0 ? 'Out of stock' : ''">
          <SfButton
            size="sm"
            @click.prevent.stop="addProduct(product)"
            class="z-30"
            :disabled="product.stockVirtual <= 0"
          >
            <template #prefix>
              <SfIconShoppingCart size="sm" />
            </template>
            <span> Add to cart </span>
          </SfButton>
        </SfTooltip>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wwbw {
  word-wrap: break-word;
}
</style>
