<template>
    <AppWidget
      titre="Utilisateurs"
      :type="LineChart"
      :data="[40, 70, 60, 43, 104]"
      :colors="['#FE828C']"
      :labels="['2020', '2021', '2022', '2023', '2024']"
      label="Nombres Utilisateurs"
      :width="400"
      :height="400"
    />
  </template>
  
  <script setup lang="ts">
  import { LineChart } from 'vue-chart-3';
  import AppWidget from '@/components/admin/AppWidget.vue';
  </script>