<script setup lang="ts">
/* eslint-disable import/no-cycle */
import { AppLoading } from '@/components/main';
import { AppTable } from '@/components/table';
import type { TableColumn } from '@/components/table/AppTable.vue';
import { routes } from '@/router';
import useAuthStore from '@/stores/auth';
import type { Product } from '@/types';
import { Role } from '@/types/user';
import { useRequest } from '@/utils';
import { apiRoutes } from '@/utils/apiRoutes';
import { useRefStore } from '@/utils/refStore';
import { onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const { token, jwtLogin, hasRights } = useRefStore(useAuthStore());

const { resData, sendRequest, isLoading, error, abort } = useRequest<Product[]>(
  {
    url: apiRoutes.products.all,
    /* @ts-expect-error */
    headers: { Authorization: `Bearer ${token.value}` },
  },
  false,
);

function colFilter(col: TableColumn) {
  return !/[A-Z]/.test(col.key) && col.key.indexOf('_') === -1;
}

async function fetchData() {
  jwtLogin().then((res) =>
    res && hasRights(Role.Accountant) ? sendRequest() : router.push({ name: routes.login.name }),
  );
}

function refresh() {
  fetchData();
}

onMounted(() => {
  fetchData();
});

onUnmounted(() => {
  abort();
});
</script>

<template>
  <AppLoading v-if="isLoading" />
  <div v-else>
    <div v-if="error" class="text-red-500 p-2">{{ error }}</div>
    <AppTable
      v-if="resData"
      columns="all"
      :data="resData"
      :columns-filter="colFilter"
      :actions="['edit', 'delete']"
      @refresh="refresh"
    />
  </div>
</template>
