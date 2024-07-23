<script setup lang="ts">
import { routes } from '@/router';
import useAuthStore from '@/stores/auth';
import { Role, type User } from '@/types/user';
import { apiRoutes, useRefStore, useRequest } from '@/utils';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const { jwtLogin, token, hasRights } = useRefStore(useAuthStore());

const { resData, sendRequest, isLoading, error, abort } = useRequest<User[]>(
  {
    url: apiRoutes.users.all,
    headers: { Authorization: `Bearer ${token.value}` },
  },
  false,
);

onMounted(() => {
  jwtLogin().then((res) => (res && hasRights(Role.Admin) ? sendRequest() : router.push({ name: routes.login.name })));
});
</script>

<template>
  <div>
    <h1>Users</h1>
  </div>
</template>
