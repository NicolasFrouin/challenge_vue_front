<script setup lang="ts">
import useAuthStore from '@/stores/auth';
import { Role } from '@/types/user';
import { useRefStore } from '@/utils';
import { RouterLink } from 'vue-router';

const { hasRights } = useRefStore(useAuthStore());
</script>

<template>
  <div>
    <ul class="h-full">
      <li><RouterLink to="/admin">Dashboard</RouterLink></li>
      <li v-if="hasRights(Role.Admin)"><RouterLink to="/admin/users">Users</RouterLink></li>
      <li><RouterLink to="/admin/products">Products</RouterLink></li>
    </ul>
  </div>
</template>
