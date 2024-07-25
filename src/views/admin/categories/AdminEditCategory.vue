<script setup lang="ts">
import { EditRessource } from '@/components/admin';
import { useRouter } from 'vue-router';

const router = useRouter();
const id = router.currentRoute.value.params.id as string;
</script>

<template>
  <div>
    <EditRessource ressource="categories" :id="id" />
  </div>
</template>
