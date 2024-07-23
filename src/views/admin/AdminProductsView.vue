<script setup lang="ts">
import { ref, onMounted } from 'vue';

const products = ref([
  { id: 1, name: 'Product 1', price: 100 },
  { id: 2, name: 'Product 2', price: 200 },
  { id: 3, name: 'Product 3', price: 300 }
]);

// Fetch products data from API or other sources
onMounted(() => {
  // Example API call
  // axios.get('/api/products').then(response => {
  //   products.value = response.data;
  // });
});
</script>

<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h1 class="text-2xl mb-4">Products</h1>
    <table class="min-w-full bg-white">
      <thead>
        <tr>
          <th class="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">ID</th>
          <th class="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Name</th>
          <th class="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td class="py-2 px-4 border-b border-gray-200">{{ product.id }}</td>
          <td class="py-2 px-4 border-b border-gray-200">{{ product.name }}</td>
          <td class="py-2 px-4 border-b border-gray-200">{{ product.price }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
