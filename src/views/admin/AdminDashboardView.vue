<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goToUsers = () => {
  router.push({ name: 'admin-users' });
};

const goToProducts = () => {
  router.push({ name: 'admin-products' });
};

const goToOrders = () => {
  router.push({ name: 'admin-orders' });
};
</script>

<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h1 class="text-2xl mb-6">Admin Dashboard</h1>
    <div class="flex flex-wrap -mx-2 h-full">
      <!-- Left Large Box -->
      <div class="w-full md:w-1/2 p-2 flex flex-col">
        <div class="bg-white p-4 rounded-md shadow-md border border-gray-300 flex-grow">
          <button @click="goToUsers" class="w-full h-full">Large Box (Users)</button>
        </div>
      </div>
      <!-- Right Top Box -->
      <div class="w-full md:w-1/2 p-2">
        <div class="bg-white p-4 rounded-md shadow-md border border-gray-300 h-1/2">
          <button @click="goToProducts" class="w-full h-full">Top Right Box (Products)</button>
        </div>
        <!-- Right Bottom Box -->
        <div class="bg-white p-4 rounded-md shadow-md border border-gray-300 h-1/2 mt-2">
          <button @click="goToOrders" class="w-full h-full">Bottom Right Box (Orders)</button>
        </div>
      </div>
      <!-- Bottom Boxes -->
      <div class="w-full p-2 flex">
        <div class="flex-grow p-2">
          <div class="bg-white p-4 rounded-md shadow-md border border-gray-300 h-24">
            <button class="w-full h-full">Bottom Left Box 1</button>
          </div>
        </div>
        <div class="flex-grow p-2">
          <div class="bg-white p-4 rounded-md shadow-md border border-gray-300 h-24">
            <button class="w-full h-full">Bottom Left Box 2</button>
          </div>
        </div>
        <div class="flex-grow p-2">
          <div class="bg-white p-4 rounded-md shadow-md border border-gray-300 h-24">
            <button class="w-full h-full">Bottom Left Box 3</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ajoutez des styles personnalisés si nécessaire */
</style>
