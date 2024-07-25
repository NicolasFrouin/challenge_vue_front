<template>
  <AppWidget
    titre="Ventes par Catégorie ce mois"
    :type="DoughnutChart"
    :data="[40, 70, 60, 43, 104]"
    :colors="['#FE828C', '#D66F78', '#D84A57', '#FF9DA4', '#FF4856']"
    :labels="['Boisson Gazeuse', 'Boisson Plate', 'Boisson Sans Sucre', 'Edition Limité', 'Autre']"
    label=""
    :width="800"
    :height="800"
  />
</template>

<script setup lang="ts">
import { DoughnutChart } from 'vue-chart-3';
import AppWidget from '@/components/admin/AppWidget.vue';
</script>
