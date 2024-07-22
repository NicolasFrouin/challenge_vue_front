<script setup lang="ts">
import { ProductCardDesktop, ProductCardMobile } from '@/components/product';
import { computed, type PropType } from 'vue';
import { useWindowSize } from '@vueuse/core';
import type { Product } from '@/types';
import { LineOf } from '@/types';
import { routes } from '@/router';
import { SfLink } from '@storefront-ui/vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const { width } = useWindowSize();
const isMobile = computed(() => width.value < 768);

const props = defineProps({
  products: {
    type: Array as () => Product[],
    required: true,
  },
  lineOf: {
    type: Number as PropType<LineOf>,
    default: LineOf.FOUR,
  },
});

const productCardSize = computed(() => {
  switch (props.lineOf) {
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

const handleClick = (slug: string) => {
  router.push({
    name: routes.productDetails.name,
    params: { slug },
  });
};
</script>

<template>
  <section class="flex flex-row flex-wrap">
    <article v-for="product in props.products" :key="product.id" :class="isMobile ? 'w-full' : `${productCardSize.value} m-1`">
      <SfLink
        @click.prevent="handleClick(String(product.id))"
        :href="`${
          $router.resolve({
            name: routes.productDetails.name,
            params: { slug: product.id },
          }).fullPath
        }#top`"
        class="no-underline"
      >
        <component :is="isMobile ? ProductCardMobile : ProductCardDesktop" :product="product" />
      </SfLink>
    </article>
  </section>
</template>

<style>
article {
  transition: transform 0.3s;
}
</style>
