<script setup lang="ts">
import { Role } from '@/types/user';
import { RouterLink, useRouter } from 'vue-router';

const router = useRouter();

const duserNav = {
  dashboard: {
    key: 'user-home',
    link: router.resolve({ name: 'user-home', force: true }),
    name: 'Dashboard',
    roles: Role.User,
  },
  orders: {
    key: 'user-orders',
    link: router.resolve({ name: 'user-orders-list', force: true }),
    name: 'Commandes',
    roles: Role.User,
  },
};
</script>

<template>
  <ul class="h-full">
    <li
      v-for="(route, key) in duserNav"
      :key="key"
      class="cursor-pointer hover:bg-primary-400 rounded transition-all duration-500 ease-in-out"
    >
      <RouterLink
        :to="route.link"
        class="py-2 px-4 w-full block text-lg font-bold rounded"
        :class="{ active: router.currentRoute.value.matched.some((r) => r.name === route.key) }"
      >
        {{ route.name }}
      </RouterLink>
    </li>
  </ul>
</template>

<style scoped lang="postcss">
.active {
  @apply bg-primary-300 text-primary-900 font-bold text-xl;
}
</style>
