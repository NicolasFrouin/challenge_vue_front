<script lang="ts" setup>
import { SfIconSell } from '@storefront-ui/vue';
import type { Product } from '@/types';

const { product } = defineProps<{ product: Product }>();
</script>

<template>
  <div class="flex border-b-[1px] border-neutral-200 hover:shadow-lg min-w-[320px] max-w-[640px] p-4">
    <div class="relative overflow-hidden rounded-md w-[100px] sm:w-[176px]">
      <img
        class="h-36 w-[100px] sm:h-44 sm:w-44 border rounded-md border-neutral-200 object-contain"
        :src="
          product.image ?? 'https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/smartwatch.png'
        "
        :alt="`${product.name} image`"
        width="100"
        height="144"
      />
      <div class="absolute top-0 left-0 text-white bg-secondary-600 py-1 pl-1.5 pr-2 text-xs font-medium">
        <SfIconSell size="xs" class="mr-1" />
        Sale
      </div>
    </div>
    <div class="flex flex-col pl-4 min-w-[180px] flex-1">
      <span class="wwbw no-underline text-sm sm:text-lg overflow-ellipsis overflow-hidden max-h-10 sm:max-h-14">
        {{ product.name ?? product.title }}
      </span>
      <div class="my-2 sm:mb-0">
        <span
          class="wwbw font-normal leading-5 text-xs sm:text-sm text-neutral-700 block overflow-ellipsis overflow-hidden max-h-16 sm:max-h-[80px]"
        >
          {{ product.description }}
        </span>
      </div>
      <div class="items-center sm:mt-auto sm:flex">
        <span class="font-bold sm:ml-auto sm:order-1 text-sm sm:text-lg">{{ product.price }}€</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wwbw {
  word-wrap: break-word;
}
</style>
