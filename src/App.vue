<script setup lang="ts">
import { RouterView } from 'vue-router';
import { AppFooter, AppHeader, AppLoading } from '@/components/main';
import CookiePopup from '@/components/main/CookiePopup.vue';
import useAppState from './stores/state';
import { useRefStore } from './utils/refStore';

const { loading } = useRefStore(useAppState());
</script>

<template>
  <AppHeader />
  <main class="z-10 m-4 relative">
    <AppLoading v-if="loading" />
    <RouterView :key="$router.currentRoute.value.fullPath" />
    <CookiePopup />
  </main>
  <AppFooter class="z-30" />
</template>

<style>
body:has(.modal-open) {
  overflow: hidden;
}
</style>
