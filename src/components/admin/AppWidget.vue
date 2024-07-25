<template>
  <div class="card">
    <div class="center">
      <h2>{{ data.titre }}</h2>
    </div>
    <component :is="type" :chartData="testData" />
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { Chart, registerables } from 'chart.js';

const data = defineProps({
  titre: {
    type: String,
    required: true,
  },
  type: {
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  colors: {
    type: Array,
    required: true,
  },
  labels: {
    type: Array,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
});

Chart.register(...registerables);

const testData = reactive({
  labels: data.labels,
  datasets: [
    {
      label: data.label,
      data: data.data,
      backgroundColor: data.colors,
      width: data.width,
      height: data.height,
    },
  ],
});
</script>

<style scoped>
.center {
  text-align: center;
  font-weight: bold;
}
</style>
