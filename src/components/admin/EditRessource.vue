<script setup lang="ts">
import useAuthStore from '@/stores/auth';
import { apiRoutes, useRefStore, useRequest } from '@/utils';
import { computed, reactive } from 'vue';
import { AppLoading } from '@/components/main';
import { SfInput } from '@storefront-ui/vue';
import axios from 'axios';

const { ressource, id, filterFields } = defineProps({
  ressource: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  filterFields: {
    type: Function,
    required: false,
    default: () => true,
  },
});

const { token } = useRefStore(useAuthStore());

const { resData, isLoading, error } = useRequest<any>({
  // @ts-ignore
  url: apiRoutes[ressource].byId?.(id),
  // @ts-expect-error
  headers: { Authorization: `Bearer ${token.value}` },
});

const data = reactive(resData);

async function handleSubmit() {
  // @ts-ignore
  axios.patch(apiRoutes[ressource].edit(id), data.value, {
    // @ts-expect-error
    headers: { Authorization: `Bearer ${token.value}` },
  });
}

function isDisabled(key: string) {
  switch (key) {
    case 'id':
    case 'createdAt':
    case 'updatedAt':
    case 'deletedAt':
      return true;
    default:
      return false;
  }
}

const displayFields = computed(() =>
  Object.entries(resData.value ?? {})
    .filter(([key, value]) => filterFields(key, value))
    .reduce((acc, [key, value]) => {
      // @ts-ignore
      acc[key] = value;
      return acc;
    }, {}),
);
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold">Edit Product</h1>
    <AppLoading v-if="isLoading" />
    <div v-else>
      <div v-if="error" class="text-red-500 p-2">{{ error }}</div>
      <div v-else class="w-2/3 mx-auto">
        <form class="flex flex-col" @submit.prevent="handleSubmit">
          <div v-for="key in Object.keys(displayFields)" :key="String(key)" class="mb-4">
            <label :for="key" class="block text-sm font-medium text-gray-700">{{ key }}</label>
            <SfInput type="text" :name="key" :id="key" v-model="data[key]" :disabled="isDisabled(key)" />
          </div>
          <button
            type="submit"
            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
