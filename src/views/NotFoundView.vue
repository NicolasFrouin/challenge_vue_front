<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="flex flex-col items-center justify-center my-16">
    <h1 class="text-4xl font-bold mb-4">404 Not Found</h1>
    <p class="text-xl my-2">(っ °Д °;)っ</p>
    <RouterLink to="/" class="my-4 text-blue-500 hover:underline">Go back to homepage</RouterLink>
  </div>
</template>
