<script setup lang="ts">
/* eslint-disable import/no-cycle */
import { AppLoading } from '@/components/main';
import { AppTable } from '@/components/table';
import type { TableColumn } from '@/components/table/AppTable.vue';
import useAuthStore from '@/stores/auth';
import type { Product } from '@/types';
import { useRequest } from '@/utils';
import { apiRoutes } from '@/utils/apiRoutes';
import { useRefStore } from '@/utils/refStore';
import { onMounted, onUnmounted } from 'vue';

const { token } = useRefStore(useAuthStore());

const { resData, sendRequest, isLoading, error, abort } = useRequest<Product[]>(
  {
    url: apiRoutes.products.all,
    headers: { Authorization: `Bearer ${token}` },
  },
  false,
);

function colFilter(col: TableColumn) {
  return !/[A-Z]/.test(col.key) && col.key.indexOf('_') === -1;
}

onMounted(() => {
  sendRequest();
});

onUnmounted(() => {
  abort();
});
</script>

<template>
  <AppLoading v-if="isLoading" />
  <div v-else>
    <div v-if="error" class="text-red-500 p-2">{{ error }}</div>
    <AppTable v-if="resData" columns="all" :data="resData" :columns-filter="colFilter" />
  </div>
</template>
