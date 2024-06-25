<script lang="ts" setup>
import type { Product } from '@/types';
import { SfRating, SfCounter, SfLink, SfButton, SfIconShoppingCart, SfIconFavorite } from '@storefront-ui/vue';

const { product } = defineProps<{ product: Product }>();
</script>

<template>
  <div class="border border-neutral-200 rounded-md hover:shadow-lg h-[500px] z-0">
    <div class="relative">
      <SfLink href="#" class="block">
        <img
          :src="
            product.image ?? 'https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/sneakers.png'
          "
          :alt="`${product.name}image`"
          class="block object-cover h-auto rounded-md aspect-square z-0"
          width="300"
          height="300"
        />
      </SfLink>
      <SfButton
        variant="tertiary"
        size="sm"
        square
        class="absolute bottom-0 right-0 mr-2 mb-2 bg-white ring-1 ring-inset ring-neutral-200 !rounded-full"
        aria-label="Add to wishlist"
      >
        <SfIconFavorite size="sm" />
      </SfButton>
    </div>
    <div class="p-4 border-t border-neutral-200 flex flex-col">
      <div>
        <SfLink href="#" variant="secondary" class="no-underline">{{ product.name ?? product.title }}</SfLink>
        <div class="flex items-center pt-1">
          <SfRating size="xs" :value="5" :max="5" />

          <SfLink href="#" variant="secondary" class="pl-1 no-underline">
            <SfCounter size="xs">123</SfCounter>
          </SfLink>
        </div>
        <p class="block py-2 font-normal leading-5 text-sm text-neutral-700">
          {{ product.description.length > 100 ? `${product.description.slice(0, 100)}...` : product.description }}
        </p>
      </div>
      <div>
        <span class="block pb-2 font-bold text-lg">{{ product.price }}€</span>
        <SfButton size="sm">
          <template #prefix>
            <SfIconShoppingCart size="sm" />
          </template>
          <span> Add to cart </span>
        </SfButton>
      </div>
    </div>
  </div>
</template>
