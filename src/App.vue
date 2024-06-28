<script setup lang="ts">
import { RouterView } from 'vue-router';
import { AppFooter, AppHeader } from '@/components/main';
import useAppState from './stores/state';
import { useRefStore } from './utils/refStore';

const { loading } = useRefStore(useAppState());
</script>

<template>
  <AppHeader />
  <main class="z-10 m-4 relative">
    <div
      v-if="loading"
      class="fixed inset-0 bg-white bg-opacity-95 flex items-center justify-center"
      :class="{ loading }"
    >
      <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-500"></div>
    </div>
    <RouterView />
  </main>
  <AppFooter class="z-30" />
</template>

<style>
html:has(.loading) {
  overflow: hidden;
  height: 100%;
}

body:has(.modal-open) {
  overflow: hidden;
}
</style>
