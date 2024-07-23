<script setup lang="ts">
import { ref } from 'vue';

const { show, title } = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['confirm', 'cancel']);
</script>

<template>
  <div
    v-if="show"
    class="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    @click.self="emit('cancel')"
    @keydown.escape="emit('cancel')"
  >
    <div class="bg-white mx-auto p-4 rounded-lg shadow-lg">
      <h2 class="text-lg font-bold">{{ title }}</h2>
      <slot></slot>
      <div class="flex justify-end mt-4">
        <button
          type="button"
          @click="emit('cancel')"
          class="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded mr-2"
        >
          Cancel
        </button>
        <button
          type="button"
          @click="emit('confirm')"
          class="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>
