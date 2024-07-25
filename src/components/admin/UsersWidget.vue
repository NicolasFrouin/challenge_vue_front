<template>
  <AppWidget
    v-if="resData"
    titre="Utilisateurs"
    :type="LineChart"
    :data="resData.map((group) => group.count)"
    :colors="['#FE828C']"
    :labels="resData.map((group) => group._id)"
    label="Nombres Utilisateurs"
    :width="400"
    :height="400"
  />
</template>

<script setup lang="ts">
import { LineChart } from 'vue-chart-3';
import AppWidget from '@/components/admin/AppWidget.vue';
import { apiRoutes, useRefStore, useRequest } from '@/utils';
import useAuthStore from '@/stores/auth';
import { onMounted } from 'vue';

const { token } = useRefStore(useAuthStore());
const { resData, sendRequest } = useRequest<{ _id: string; count: number }[]>(
  {
    url: apiRoutes.users.adminDashboard,
    // @ts-expect-error
    headers: { Authorization: `Bearer ${token.value}` },
  },
  false,
);

onMounted(() => {
  sendRequest();
});
</script>
