<script setup lang="ts">
import { computed, reactive, ref } from 'vue';

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

const props = defineProps<{
  columns: TableColumn[] | 'all';
  data: Record<string, any>[];
  actions?: Action[];
  dataFilter?: (row: Record<string, any>) => boolean;
  columnsFilter?: (column: TableColumn) => boolean;
}>();

const displayDataFilter = ref<((row: Record<string, any>) => boolean) | null>(props.dataFilter || null);
const displayColumnsFilter = ref<((column: TableColumn) => boolean) | null>(props.columnsFilter || null);
const order = ref<{ [key: string]: 'asc' | 'desc' } | null>(null);
const pagination = reactive({ page: 1, pageSize: 10 });

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
          : a[key].localeCompare(b[key]) * direction;
      })
    : filteredData;
});
</script>

<template>
  <div class="overflow-x-auto block whitespace-nowrap">
    <table>
      <thead class="bg-gray-50">
        <tr>
          <th
            v-for="column in displayColumns"
            :key="column.key"
            @click="order = { [column.key]: order && order[column.key] === 'asc' ? 'desc' : 'asc' }"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
          >
            {{ column.label }}
          </th>
          <th v-if="actions">Actions</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr
          v-for="row in displayData.slice(
            pagination.pageSize * pagination.page - pagination.pageSize,
            pagination.pageSize * pagination.page,
          )"
          :key="row.id"
          class="hover:bg-gray-100"
        >
          <td
            v-for="column in displayColumns"
            :key="column.key"
            class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
          >
            {{ row[column.key] }}
          </td>
          <td v-if="actions">
            <button v-for="action in actions" :key="action.label" @click="action.handler(row)" type="button">
              {{ action.label }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
