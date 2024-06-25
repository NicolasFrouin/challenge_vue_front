<script setup lang="ts">
import { ProductList } from '@/components/product';
import { displayProducts } from '@/mocks';
import { LineOf } from '@/types';
</script>

<template>
  <h1>HelloWorld</h1>
  <ProductList :products="displayProducts" :line-of="LineOf.FOUR" />
</template>
