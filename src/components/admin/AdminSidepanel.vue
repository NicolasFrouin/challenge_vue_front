<script setup lang="ts">
import useAuthStore from '@/stores/auth';
import { Role } from '@/types/user';
import { useRefStore } from '@/utils';
import { RouterLink, useRouter } from 'vue-router';

const { hasRights } = useRefStore(useAuthStore());
const router = useRouter();

const adminNav = {
  dashboard: {
    key: 'admin-home',
    link: router.resolve({ name: 'admin-home' }),
    name: 'Dashboard',
    roles: Role.Accountant,
  },
  users: {
    key: 'admin-users',
    link: router.resolve({ name: 'admin-users' }),
    name: 'Utilisateurs',
    roles: Role.Admin,
  },
  products: {
    key: 'admin-products',
    link: router.resolve({ name: 'admin-products' }),
    name: 'Produits',
    roles: Role.Accountant,
  },
  categories: {
    key: 'admin-categories',
    link: router.resolve({ name: 'admin-categories' }),
    name: 'Catégories',
    roles: Role.Accountant,
  },
  orders: {
    key: 'admin-orders',
    link: router.resolve({ name: 'admin-orders' }),
    name: 'Commandes',
    roles: Role.Accountant,
  },
};

const accessibles = Object.values(adminNav).filter((route) => hasRights(route.roles));
</script>

<template>
  <ul class="h-full">
    <li
      v-for="(route, key) in accessibles"
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
