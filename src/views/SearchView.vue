<script setup lang="ts">
import { ProductList } from '@/components/product';
import { SearchSidepanel } from '@/components/search';
import { LineOf, type Product } from '@/types';
import { SfButton, SfModal, useDisclosure } from '@storefront-ui/vue';
import { useWindowSize } from '@vueuse/core';
import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { computed, onMounted, onUnmounted, ref, type Ref } from 'vue';
import { useRoute } from 'vue-router';

const abortController = new AbortController();
const route = useRoute();
const { q } = route.query;
const { width } = useWindowSize();

const isMobile = computed(() => width.value < 768);

const { isOpen, open, close } = useDisclosure({ initialValue: false });

const products: Ref<Product[]> = ref([]);

const fetchProducts = async () => {
  const axiosConfig: AxiosRequestConfig = {
    method: 'GET',
    url: 'https://fakestoreapi.com/products',
    params: { q },
    signal: abortController.signal,
  };
  await axios(axiosConfig).then(
    (response) => {
      products.value = response.data;
    },
    (err) => {
      products.value = [];
      throw new Error(err);
    },
  );
};

onMounted(() => {
  fetchProducts().then(() => {
    products.value = products.value.filter((product: Product) =>
      (product.title as string).toLowerCase().includes((q as string).toLowerCase()),
    );
  });
});

onUnmounted(() => {
  abortController.abort();
});
</script>

<template>
  <h1>
    Search results for :
    <span class="italic">{{ q }}</span>
  </h1>
  <div class="md:flex md:flex-row">
    <SfButton v-if="isMobile" class="md:hidden" @click="open"> Open search </SfButton>
    <SearchSidepanel v-else class="" />
    <ProductList :products="products" :line-of="LineOf.THREE" />
  </div>
  <div class="">
    <SfModal
      v-if="isMobile"
      v-model="isOpen"
      class="fixed bottom-[1vh] top-[13vh] h-[86vh] inset-0 overflow-y-auto m-0 mx-2 pt-4 pb-4 border border-solid border-primary-800 border-spacing-1 rounded-none"
      :class="{ 'modal-open': isOpen }"
    >
      <SearchSidepanel class="rounded-xl" @close="close" />
    </SfModal>
  </div>
</template>
