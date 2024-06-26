<!-- eslint-disable import/no-cycle -->
<script setup lang="ts">
import { ProductDetails } from '@/components/product';
import useAppState from '@/stores/state';
import type { Product } from '@/types';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import NotFoundView from './NotFoundView.vue';

const router = useRouter();
const { loading, setLoading } = useAppState();
const route = router.currentRoute;
const { slug } = route.value.params;

const product = ref<Product | null>(null);

async function fetchProduct(prodSlug: string): Promise<AxiosResponse<Product>> {
  const axiosConfig: AxiosRequestConfig = {
    method: 'GET',
    url: `https://fakestoreapi.com/products/${prodSlug}`,
  };
  return axios.request(axiosConfig);
}

onMounted(() => {
  setLoading(true);
  fetchProduct(slug as string)
    .then(({ data }) => (product.value = data ?? null))
    .finally(() => setLoading(false));
});
</script>

<template>
  <div v-if="!loading">
    <ProductDetails v-if="product" :product="product" />
    <NotFoundView v-else />
  </div>
</template>
