<script lang="ts" setup>
import { SfButton, SfIconAdd, SfIconDelete, SfIconRemove, SfIconSell, useId } from '@storefront-ui/vue';
import { DisplayType, type Product } from '@/types';
import { onMounted, ref, type PropType } from 'vue';
import { useCounter } from '@vueuse/core';
import { useRefStore } from '@/utils/refStore';
import useCartStore from '@/stores/cart';

const { setQuantity, removeProduct } = useRefStore(useCartStore());

const props = defineProps({
  product: {
    type: Object as () => Product,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  type: {
    type: String as PropType<DisplayType>,
    default: DisplayType.Product,
  },
});

const min = ref(1);
const max = ref(999);
const inputId = useId();
const { count, inc, dec, set } = useCounter(props.quantity, { min: min.value, max: max.value });

const handleInc = () => {
  inc();
  setQuantity(props.product, count.value);
};

const handleDec = () => {
  dec();
  setQuantity(props.product, count.value);
};

const handleOnChange = (event: Event) => {
  const nextValue = Math.min(Math.max(parseInt((event.target as HTMLInputElement).value, 10), min.value), max.value);
  if (!Number.isNaN(nextValue)) {
    set(nextValue);
    setQuantity(props.product, nextValue);
  }
};

const handleRemoveProduct = () => {
  removeProduct(props.product);
};

onMounted(() => {
  set(props.quantity);
});
</script>

<template>
  <div class="flex border-b-[1px] border-neutral-200 hover:shadow-lg min-w-[320px] p-4">
    <div class="relative overflow-hidden rounded-md w-[100px] sm:w-[176px]">
      <img
        class="h-36 w-[100px] sm:h-44 sm:w-44 border rounded-md border-neutral-200 object-contain"
        :src="props.product.image ?? 'https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/smartwatch.png'"
        :alt="`${props.product.name} image`"
        width="100"
        height="144"
      />
      <div class="absolute top-0 left-0 text-white bg-secondary-600 py-1 pl-1.5 pr-2 text-xs font-medium">
        <SfIconSell size="xs" class="mr-1" />
        Sale
      </div>
    </div>
    <div class="flex flex-col pl-4 min-w-[180px]">
      <span class="wwbw no-underline text-sm sm:text-lg overflow-ellipsis overflow-hidden h-10 sm:max-h-14">
        {{ props.product.name ?? props.product.title }}
      </span>
      <div class="my-2 sm:mb-0 h-full flex flex-col justify-between">
        <span
          class="wwbw font-normal leading-5 text-xs sm:text-sm text-neutral-700 block overflow-ellipsis overflow-hidden max-h-16 sm:max-h-[80px]"
        >
          {{ props.product.description }}
        </span>
        <div v-if="props.type === DisplayType.Cart" class="flex items-center justify-between mt-4 sm:mt-0">
          <div class="flex border border-neutral-300 rounded-md">
            <SfButton
              variant="tertiary"
              :disabled="count <= min"
              square
              class="rounded-r-none"
              :aria-controls="inputId"
              aria-label="Decrease value"
              @click="handleDec"
            >
              <SfIconRemove />
            </SfButton>
            <input
              :id="inputId"
              v-model="count"
              type="number"
              class="appearance-none mx-2 w-8 text-center bg-transparent font-medium disabled:placeholder-disabled-900 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm"
              :min="min"
              :max="max"
              @input="handleOnChange"
            />
            <SfButton
              variant="tertiary"
              :disabled="count >= max"
              square
              class="rounded-l-none"
              :aria-controls="inputId"
              aria-label="Increase value"
              @click="handleInc"
            >
              <SfIconAdd />
            </SfButton>
          </div>
          <button
            aria-label="Remove"
            type="button"
            class="text-neutral-600 text-xs font-light ml-auto flex items-center px-3 py-1.5 hover:rounded-md hover:bg-neutral-200 hover:text-neutral-900 transition-colors duration-200 ease-in-out"
            @click="handleRemoveProduct"
          >
            <SfIconDelete />
            <span class="hidden ml-1.5 sm:block"> Remove </span>
          </button>
        </div>
      </div>
      <div class="items-center sm:flex">
        <span class="font-bold sm:ml-auto sm:order-1 text-sm sm:text-lg">{{ props.product.price }}€</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wwbw {
  word-wrap: break-word;
}
</style>
