<script setup lang="ts">
import { ProductList } from '@/components/product';
import useAppState from '@/stores/state';
import { LineOf, type Product } from '@/types';
import { useRefStore } from '@/utils/refStore';
import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { onMounted, ref } from 'vue';

const products = ref<Product[]>([]);

const { setLoading } = useRefStore(useAppState());

async function fetchProducts() {
  setLoading(true);
  const axiosConfig: AxiosRequestConfig = {
    method: 'GET',
    url: 'https://fakestoreapi.com/products',
  };
  await axios(axiosConfig)
    .then(
      (response) => {
        products.value = response.data.map((prod: Product) => ({
          ...prod,
          name: prod.title,
          slug: (prod.title as string).replace(/\s+/g, '-').toLowerCase(),
        }));
      },
      (err) => {
        throw new Error(err);
      },
    )
    .catch(() => (products.value = []))
    .finally(() => setLoading(false));
}

onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <ProductList :products="products" :line-of="LineOf.FOUR" />
</template>
