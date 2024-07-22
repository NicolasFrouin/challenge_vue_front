<script lang="ts" setup>
import { ref } from 'vue';
import {
  SfButton,
  SfLink,
  SfIconSafetyCheck,
  SfIconCompareArrows,
  SfIconWarehouse,
  SfIconPackage,
  SfIconFavorite,
  SfIconSell,
  SfIconShoppingCart,
  SfIconAdd,
  SfIconRemove,
  useId,
} from '@storefront-ui/vue';
import { useCounter } from '@vueuse/core';
import type { Product } from '@/types';
import { useRefStore } from '@/utils/refStore';
import useCartStore from '@/stores/cart';

const { product } = defineProps<{ product: Product }>();
const { addProduct } = useRefStore(useCartStore());

const inputId = useId();
const min = ref(1);
const max = ref(999);
const { count, inc, dec, set } = useCounter(1, { min: min.value, max: max.value });
function handleOnChange(event: Event) {
  const currentValue = (event.target as HTMLInputElement)?.value;
  const nextValue = parseFloat(currentValue);
  set(Math.min(Math.max(nextValue, min.value), max.value));
}
</script>

<template>
  <section class="w-full md:px-[10%]">
    <div class="flex justify-center">
      <img :src="product.image" :alt="`${product.name}image`" height="300" width="300" class="object-contain" />
    </div>
    <div>
      <div
        class="inline-flex items-center justify-center text-sm font-medium text-white bg-secondary-600 py-1.5 px-3 mb-4"
      >
        <SfIconSell size="sm" class="mr-1.5" />
        Sale
      </div>
      <h1 class="mb-1 font-bold letter text-3xl tracking-wide">
        {{ product.name ?? product.title }}
      </h1>
      <strong class="block font-bold text-5xl tracking-normal my-2">{{ product.price }}€</strong>
      <p class="mb-4 font-normal text-sm">{{ product.description }}</p>
      <div class="py-4 mb-4 border-gray-200 border-y">
        <div class="items-start xs:flex">
          <div class="flex flex-col items-stretch xs:items-center xs:inline-flex">
            <div class="flex border border-neutral-300 rounded-md">
              <SfButton
                variant="tertiary"
                :disabled="count <= min"
                square
                class="rounded-r-none p-3"
                :aria-controls="inputId"
                aria-label="Decrease value"
                @click="dec()"
              >
                <SfIconRemove />
              </SfButton>
              <input
                :id="inputId"
                v-model="count"
                type="number"
                class="grow appearance-none mx-2 w-8 text-center bg-transparent font-medium [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:display-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:display-none [&::-webkit-outer-spin-button]:m-0 [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none disabled:placeholder-disabled-900 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm"
                :min="min"
                :max="max"
                @input="handleOnChange"
              />
              <SfButton
                variant="tertiary"
                :disabled="count >= max"
                square
                class="rounded-l-none p-3"
                :aria-controls="inputId"
                aria-label="Increase value"
                @click="inc()"
              >
                <SfIconAdd />
              </SfButton>
            </div>
            <p class="self-center mt-1 mb-4 text-xs text-neutral-500 xs:mb-0">
              <strong class="text-neutral-900">{{ max }}</strong> in stock
            </p>
          </div>
          <SfButton size="lg" class="w-max xs:ml-4" @click="addProduct(product, count)">
            <template #prefix>
              <SfIconShoppingCart size="sm" />
            </template>
            Add to cart
          </SfButton>
        </div>
        <div class="flex justify-center mt-4 gap-x-4">
          <SfButton size="sm" variant="tertiary">
            <template #prefix>
              <SfIconCompareArrows size="sm" />
            </template>
            Compare
          </SfButton>
          <SfButton size="sm" variant="tertiary">
            <SfIconFavorite size="sm" />
            Add to list
          </SfButton>
        </div>
      </div>
      <div class="flex first:mt-4">
        <SfIconPackage size="sm" class="flex-shrink-0 mr-1 text-neutral-500" />
        <p class="text-sm">
          Free shipping, arrives by Thu, Apr 7. Want it faster?
          <SfLink href="#" variant="secondary" class="mx-1"> Add an address </SfLink>
          to see options
        </p>
      </div>
      <div class="flex mt-4">
        <SfIconWarehouse size="sm" class="flex-shrink-0 mr-1 text-neutral-500" />
        <p class="text-sm">
          Pickup not available at your shop.
          <SfLink href="#" variant="secondary" class="ml-1"> Check availability nearby </SfLink>
        </p>
      </div>
      <div class="flex mt-4">
        <SfIconSafetyCheck size="sm" class="flex-shrink-0 mr-1 text-neutral-500" />
        <p class="text-sm">
          Free 30-days returns.
          <SfLink href="#" variant="secondary" class="ml-1"> Details </SfLink>
        </p>
      </div>
    </div>
  </section>
</template>
