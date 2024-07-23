<script setup lang="ts">
import { AppLoading } from '@/components/main';
import { AppTable } from '@/components/table';
import { routes } from '@/router';
import useAuthStore from '@/stores/auth';
import { Role, type User } from '@/types/user';
import { apiRoutes, useRefStore, useRequest } from '@/utils';
import { onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const { token, jwtLogin, hasRights } = useRefStore(useAuthStore());

const { resData, sendRequest, isLoading, error, abort } = useRequest<User[]>(
  {
    url: apiRoutes.users.all,
    /* @ts-expect-error */
    headers: { Authorization: `Bearer ${token.value}` },
  },
  false,
);

onMounted(() => {
  jwtLogin().then((res) => (res && hasRights(Role.Admin) ? sendRequest() : router.push({ name: routes.login.name })));
});

onUnmounted(() => {
  abort();
});
</script>

<template>
  <AppLoading v-if="isLoading" />
  <div v-else>
    <div v-if="error" class="text-red-500 p-2">{{ error }}</div>
    <AppTable v-if="resData" columns="all" :data="resData" :actions="['edit', 'delete']" />
  </div>
</template>
