<script setup lang="ts">
import { RouterView } from 'vue-router';
import { AppFooter, AppHeader } from '@/components/main';
</script>

<template>
  <AppHeader />
  <main class="z-10 m-4">
    <RouterView :key="$route.fullPath" />
  </main>
  <AppFooter />
</template>
