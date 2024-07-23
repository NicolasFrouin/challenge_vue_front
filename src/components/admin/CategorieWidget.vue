<template>
    <AppWidget
      titre="Ventes par Année"
      :type="BarChart"
      :data="[1000, 1345, 1289, 1403, 1467]"
      :colors="['#FE828C']"
      :labels="['2020', '2021', '2022', '2023', '2024']"
      label="Ventes"
      :width="400"
      :height="400"
    />
  </template>
  
  <script setup lang="ts">
  import { BarChart } from 'vue-chart-3';
  import AppWidget from '@/components/admin/AppWidget.vue';
  </script>