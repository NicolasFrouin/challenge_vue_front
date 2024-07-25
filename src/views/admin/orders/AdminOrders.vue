<script setup lang="ts">
/* eslint-disable import/no-cycle */
import { AppLoading } from '@/components/main';
import { AppTable } from '@/components/table';
import { routes } from '@/router';
import useAuthStore from '@/stores/auth';
import { Role } from '@/types/user';
import { useRequest } from '@/utils';
import { apiRoutes } from '@/utils/apiRoutes';
import { useRefStore } from '@/utils/refStore';
import { onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const { token, jwtLogin, hasRights } = useRefStore(useAuthStore());

const { resData, sendRequest, isLoading, error, abort } = useRequest<Record<string, any>[]>(
  {
    url: apiRoutes.orders.all,
    /* @ts-expect-error */
    headers: { Authorization: `Bearer ${token.value}` },
  },
  false,
);

async function fetchData() {
  jwtLogin().then((res) =>
    res && hasRights(Role.Accountant) ? sendRequest() : router.push({ name: routes.login.name }),
  );
}

function refresh() {
  fetchData();
}

const actions = [
  {
    label: 'Voir',
    handler: (row: Record<string, any>) =>
      // eslint-disable-next-line no-underscore-dangle
      router.push(router.resolve({ name: 'admin-orders-view', query: { id: row._id } })),
  },
];

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
    <div v-if="resData?.length">
      <AppTable columns="all" :data="resData" :actions="actions" @refresh="refresh" />
    </div>
    <div v-else class="text-center p-2">Aucune commande trouvée</div>
  </div>
</template>
