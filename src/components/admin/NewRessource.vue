<script setup lang="ts">
import { routes } from '@/router';
import { apiRoutes, useRefStore, useRequest } from '@/utils';
import { useRouter } from 'vue-router';
import useAuthStore from '@/stores/auth';
import { AppLoading } from '../main';

const emit = defineEmits<{
  validate: [];
}>();

const { ressource, data, title } = defineProps({
  title: {
    type: String,
    required: true,
  },
  ressource: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
});

const router = useRouter();
const { token } = useRefStore(useAuthStore());

const { sendRequest, isLoading } = useRequest(
  {
    // @ts-ignore
    url: apiRoutes[ressource as keyof typeof apiRoutes].create,
    method: 'POST',
    // @ts-ignore
    headers: { Authorization: `Bearer ${token.value}` },
    data,
  },
  false,
);

async function handleSubmit() {
  try {
    emit('validate');
  } catch (error: any) {
    return;
  }
  sendRequest().then(() => {
    router.push(router.resolve({ name: `admin-${ressource}-list` }) ?? routes.admin);
  });
}
</script>

<template>
  <div>
    <h1>{{ title }}</h1>
    <AppLoading v-if="isLoading" />
    <div v-else>
      <form @submit.prevent="handleSubmit">
        <slot></slot>
        <div class="flex gap-2">
          <button type="submit" class="bg-green-500">Créer</button>
          <button type="button" @click="router.back()" class="bg-red-500">Annuler</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
button {
  @apply text-white p-2 rounded-md mb-2 inline-block;
}
</style>
