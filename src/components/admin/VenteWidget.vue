<template>
  <AppWidget
    v-if="resData"
    titre="Ventes par Année"
    :type="BarChart"
    :data="resData.map((group) => group.count)"
    :colors="['#FE828C']"
    :labels="resData.map((group) => group._id)"
    label="Ventes"
    :width="400"
    :height="400"
  />
</template>

<script setup lang="ts">
import { BarChart } from 'vue-chart-3';
import AppWidget from '@/components/admin/AppWidget.vue';
import { apiRoutes, useRefStore, useRequest } from '@/utils';
import { onMounted } from 'vue';
import useAuthStore from '@/stores/auth';

const { token } = useRefStore(useAuthStore());
const { resData, sendRequest } = useRequest<{ _id: string; count: number }[]>(
  {
    url: apiRoutes.orders.sellsByYear,
    // @ts-expect-error
    headers: { Authorization: `Bearer ${token.value}` },
  },
  false,
);

onMounted(() => {
  sendRequest();
});
</script>
