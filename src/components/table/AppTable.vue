<script setup lang="ts">
import { computed, ref } from 'vue';
import { apiRoutes, usePagination, usePrompt, useRefStore, useRequest } from '@/utils';
import { useRouter } from 'vue-router';
import useAuthStore from '@/stores/auth';
import TablePagination from './TablePagination.vue';
import { AppPrompt } from '../interaction';

export interface TableColumn {
  key: string;
  label: string;
}

export interface Action {
  label: string;
  handler: (row: Record<string, any>) => void;
}

export interface TableOrder {
  [key: string]: 'asc' | 'desc';
}

const emit = defineEmits(['refresh']);

const { token } = useRefStore(useAuthStore());
const router = useRouter();
const ressource = router.currentRoute.value.path.split('/').filter(Boolean).pop();
const { shown, open, close } = usePrompt();

const modalData = ref<any>(null);

async function deleteItem(id: string) {
  const { sendRequest } = useRequest(
    {
      // @ts-ignore
      url: apiRoutes[ressource].delete(id),
      method: 'DELETE',
      // @ts-expect-error
      headers: { Authorization: `Bearer ${token.value}` },
    },
    false,
  );
  sendRequest().then(() => {
    emit('refresh');
  });
}

function handleConfirm() {
  deleteItem(modalData.value.id);
  close();
}

const defaultActions = {
  edit: {
    label: 'Edit',
    handler: (row) =>
      router.push(
        router.resolve({
          // @ts-expect-error
          name: `${String(router.currentRoute.value.matched.at(-2).name)}-edit`,
          params: { id: row.id },
        }),
      ),
  },
  delete: { label: 'Delete', handler: (row) => (modalData.value = row) && open() },
} as const satisfies Record<string, Action>;

const props = defineProps<{
  columns: TableColumn[] | 'all';
  data: Record<string, any>[];
  actions?: (Action | keyof typeof defaultActions)[];
  dataFilter?: (row: Record<string, any>) => boolean;
  columnsFilter?: (column: TableColumn) => boolean;
}>();

const displayDataFilter = ref<((row: Record<string, any>) => boolean) | null>(props.dataFilter || null);
const displayColumnsFilter = ref<((column: TableColumn) => boolean) | null>(props.columnsFilter || null);
const order = ref<{ [key: string]: 'asc' | 'desc' } | null>(null);
const displayActions = computed(() => {
  return props.actions?.map((action) => (typeof action === 'string' ? defaultActions[action] : action));
});

const displayColumns = computed(() => {
  const cols = props.columns === 'all' ? Object.keys(props.data[0]).map((key) => ({ key, label: key })) : props.columns;
  return displayColumnsFilter.value ? cols.filter(displayColumnsFilter.value) : cols;
});

const displayData = computed(() => {
  const filteredData = displayDataFilter.value ? props.data.filter(displayDataFilter.value) : props.data;
  return order.value
    ? filteredData.sort((a, b) => {
        const key = Object.keys(order.value as TableOrder)[0];
        const direction = (order.value as TableOrder)[key] === 'asc' ? 1 : -1;
        return typeof a[key] === 'number' && typeof b[key] === 'number'
          ? (a[key] as number) - (b[key] as number) * direction
          : (a[key] ?? '').localeCompare(b[key] ?? '') * direction;
      })
    : filteredData;
});

const pagination = computed(() => usePagination({ totalItems: displayData.value.length, pageSize: 10 }));

function printValue(value: any) {
  if (!value) return '';
  if (!Number.isNaN(Number(value))) return value;
  if (new Date(value).toString() !== 'Invalid Date') return new Date(value).toLocaleString();
  return value;
}
</script>

<template>
  <div class="overflow-x-auto block whitespace-nowrap">
    <TablePagination :pagination="pagination" />
    <table>
      <thead class="bg-gray-50">
        <tr>
          <th
            v-for="column in displayColumns"
            :key="column.key"
            @click="order = { [column.key]: order && order[column.key] === 'asc' ? 'desc' : 'asc' }"
            class="px-6 py-3 text-left text-md font-bold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-primary-500"
          >
            {{ column.label }}
            <span v-if="order && order[column.key]" class="ml-2">{{ order[column.key] === 'asc' ? '▲' : '▼' }}</span>
          </th>
          <th v-if="actions">Actions</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr
          v-for="row in displayData.slice(pagination.from.value, pagination.to.value)"
          :key="row.id"
          class="hover:bg-gray-100"
        >
          <td
            v-for="column in displayColumns"
            :key="column.key"
            class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate"
          >
            {{ printValue(row[column.key]) }}
          </td>
          <td v-if="displayActions">
            <button
              v-for="action in displayActions"
              :key="action.label"
              @click="action.handler(row)"
              type="button"
              class="px-4 py-2 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-md m-1"
            >
              {{ action.label }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <AppPrompt title="Are you sure?" :show="shown" @cancel="close" @confirm="handleConfirm">
      <p>Are you sure you want to delete this item?</p>
    </AppPrompt>
  </div>
</template>
