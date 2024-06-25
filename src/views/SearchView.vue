<script setup lang="ts">
import { ProductList } from '@/components/product';
import type { Product } from '@/types';
import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { onMounted, onUnmounted, ref, type Ref } from 'vue';
import { useRoute } from 'vue-router';

const abortController = new AbortController();
const route = useRoute();
const { q } = route.query;

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
  <div>
    <h1>Search</h1>
    <ProductList :products="products" />
  </div>
</template>
