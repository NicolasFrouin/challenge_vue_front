<script setup lang="ts">
import { ProductList } from '@/components/product';
import { LineOf, type Product } from '@/types';
import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { onMounted, ref } from 'vue';

const products = ref<Product[]>([]);

async function fetchProducts() {
  const axiosConfig: AxiosRequestConfig = {
    method: 'GET',
    url: 'https://fakestoreapi.com/products',
  };
  await axios(axiosConfig).then(
    (response) => {
      products.value = response.data.map((prod: Product) => ({
        ...prod,
        name: prod.title,
        slug: (prod.title as string).replace(/\s+/g, '-').toLowerCase(),
      }));
    },
    (err) => {
      products.value = [];
      throw new Error(err);
    },
  );
}

onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <ProductList :products="products" :line-of="LineOf.FOUR" />
</template>
