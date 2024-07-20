<script setup lang="ts">
import { ProductList } from '@/components/product';
import useAppState from '@/stores/state';
import { LineOf, type Product } from '@/types';
import { apiRoutes } from '@/utils/apiRoutes';
import { useRefStore } from '@/utils/refStore';
import axios from 'axios';
import { onMounted, ref } from 'vue';

const products = ref<Product[]>([]);
const error = ref<string | null>(null);

const { setLoading } = useRefStore(useAppState());

async function fetchData() {
  setLoading(true);
  await axios({
    method: 'GET',
    url: apiRoutes.products.all,
  })
    .then(({ data }) => (products.value = data))
    .catch((err) => (error.value = err))
    .finally(() => setLoading(false));
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div v-if="error" class="text-red-500">{{ error }}</div>
  <ProductList v-else :products="products" :line-of="LineOf.FOUR" />
</template>
