<script setup lang="ts">
import { AdminSidepanel } from '@/components/admin';
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="flex flex-row justify-between">
    <AdminSidepanel />
    <RouterView class="max-w-3xl" />
  </div>
</template>
