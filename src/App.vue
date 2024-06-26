<script setup lang="ts">
import { RouterView } from 'vue-router';
import { AppFooter, AppHeader } from '@/components/main';
import useAppState from './stores/state';
import { useRefStore } from './utils/refStore';

const { loading } = useRefStore(useAppState());
</script>

<template>
  <AppHeader />
  <main class="z-10 m-4">
    <div
      v-if="loading"
      class="fixed top-0 bottom-0 inset-0 bg-white bg-opacity-95 z-50 flex items-center justify-center loading"
    >
      <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-500"></div>
    </div>
    <RouterView />
  </main>
  <AppFooter />
</template>

<style>
html:has(.loading) {
  overflow: hidden;
  height: 100%;
}
</style>
