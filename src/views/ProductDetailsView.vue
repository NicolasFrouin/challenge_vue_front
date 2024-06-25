<script setup lang="ts">
import { ProductDetails } from '@/components/product';
import { displayProducts } from '@/mocks';
import type { Product } from '@/types';
import { useRoute } from 'vue-router';

const route = useRoute();
const { slug } = route.params;

const product = displayProducts.find((prod) => prod.slug === slug) as Product;
</script>

<template>
  <h1>ProductDetailsView : {{ slug }}</h1>
  <div>
    <ProductDetails class="w-full" :product="product" />
  </div>
</template>
