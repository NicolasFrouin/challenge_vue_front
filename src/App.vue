<script setup lang="ts">
import { RouterView } from 'vue-router';
import { AppFooter, AppHeader, AppLoading } from '@/components/main';
import { onMounted } from 'vue';
import useAppState from './stores/state';
import { useRefStore } from './utils/refStore';
import useAuthStore from './stores/auth';

const { loading } = useRefStore(useAppState());
const { jwtLogin } = useRefStore(useAuthStore());

onMounted(() => {
  jwtLogin();
});
</script>

<template>
  <AppHeader />
  <main class="z-10 m-4 relative">
    <AppLoading v-if="loading" />
    <RouterView :key="$router.currentRoute.value.fullPath" />
  </main>
  <AppFooter class="z-30" />
</template>

<style>
body:has(.modal-open) {
  overflow: hidden;
}
</style>
