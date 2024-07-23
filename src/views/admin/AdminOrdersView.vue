<script setup lang="ts">
import { ref, onMounted } from 'vue';

const orders = ref([
  { id: 1, user: 'Yves MU', product: 'Product 1', quantity: 2 },
  { id: 2, user: 'Jane Doe', product: 'Product 2', quantity: 1 },
  { id: 3, user: 'John Smith', product: 'Product 3', quantity: 3 }
]);

// Fetch orders data from API or other sources
onMounted(() => {
  // Example API call
  // axios.get('/api/orders').then(response => {
  //   orders.value = response.data;
  // });
});
</script>

<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h1 class="text-2xl mb-4">Orders</h1>
    <table class="min-w-full bg-white">
      <thead>
        <tr>
          <th class="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">ID</th>
          <th class="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">User</th>
          <th class="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Product</th>
          <th class="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td class="py-2 px-4 border-b border-gray-200">{{ order.id }}</td>
          <td class="py-2 px-4 border-b border-gray-200">{{ order.user }}</td>
          <td class="py-2 px-4 border-b border-gray-200">{{ order.product }}</td>
          <td class="py-2 px-4 border-b border-gray-200">{{ order.quantity }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
