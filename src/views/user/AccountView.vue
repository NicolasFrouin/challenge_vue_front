<script setup lang="ts">
import { RouterView } from 'vue-router';
import { UserSidepanel } from '@/components/user';
</script>

<template>
  <div class="flex md:flex-row flex-col justify-between">
    <UserSidepanel class="md:w-1/6 w-full md:pr-4" />
    <RouterView class="md:w-5/6 w-full" />
  </div>
</template>
