<script setup lang="ts">
// eslint-disable-next-line import/no-cycle
import { ProductCardDesktop, ProductCardMobile } from '@/components/product';
import { computed, type PropType } from 'vue';
import { useWindowSize } from '@vueuse/core';
import type { Product } from '@/types';
import { LineOf } from '@/types';
import { routes } from '@/router';

const { products, lineOf } = defineProps({
  products: {
    type: Array as () => Product[],
    required: true,
  },
  lineOf: {
    type: Number as PropType<LineOf>,
    required: false,
    default: LineOf.FOUR,
  },
});

const productCardSize = computed(() => {
  switch (lineOf) {
    case LineOf.TWO:
      return 'w-[calc(50%-8px)]';
    case LineOf.THREE:
      return 'w-[calc(33.3333%-8px)]';
    case LineOf.FIVE:
      return 'w-[calc(20%-8px)]';
    case LineOf.SIX:
      return 'w-[calc(16.6667%-8px)]';
    case LineOf.FOUR:
    default:
      return 'w-[calc(25%-8px)]';
  }
});

const { width } = useWindowSize();

const isMobile = computed(() => width.value < 768);
</script>

<template>
  <div class="flex flex-row flex-wrap">
    <article
      v-for="product in products"
      :key="product.id"
      @click.prevent="
        $router.push({
          name: routes.productDetails.name,
          params: { slug: product.slug },
          state: { slug: product.slug },
        })
      "
      @keydown.enter="
        $router.push({
          name: routes.productDetails.name,
          params: { slug: product.slug },
          state: { slug: product.slug },
        })
      "
      :class="isMobile ? 'w-full' : `${productCardSize} m-1`"
    >
      <Component :is="isMobile ? ProductCardMobile : ProductCardDesktop" :product="product" :key="product.id" />
    </article>
  </div>
</template>
