<script setup lang="ts">
import { AdminSidepanel } from '@/components/admin';
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="flex md:flex-row flex-col justify-between">
    <AdminSidepanel class="md:w-1/6 w-full md:pr-4" />
    <RouterView class="md:w-5/6 w-full" />
  </div>
</template>
