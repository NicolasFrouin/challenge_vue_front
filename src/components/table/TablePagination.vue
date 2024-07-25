<script setup lang="ts">
import type { UsePagination } from '@/utils/usePagination';

const { pagination } = defineProps<{ pagination: UsePagination }>();
const { activePage, next, prev, totalPages, setPageSize, pageSize } = pagination;

const pageSizeOptions = [5, 10, 20, 50, 100];
</script>

<template>
  <div class="flex gap-4 items-center">
    <div>
      <span class="text-md"> Page {{ activePage }} sur {{ totalPages }} </span>
    </div>
    <div class="flex gap-1">
      <button type="button" @click="prev" :disabled="activePage === 1">Précédent</button>
      <button type="button" @click="next" :disabled="activePage === totalPages">Suivant</button>
    </div>
    <div>
      <label for="pageSize" class="hidden">Éléments par page :</label>
      <select
        @change="setPageSize(Number(($event.target as HTMLSelectElement).value) || 10)"
        class="px-2 py-1 bg-gray-200 rounded"
        id="pageSize"
      >
        <option v-for="size in pageSizeOptions" :key="size" :value="size" :selected="size === pageSize">
          {{ size }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped lang="postcss">
button {
  @apply px-4 py-2 bg-gray-200 rounded cursor-pointer;
}

button:disabled {
  @apply opacity-50 cursor-not-allowed;
}
</style>
