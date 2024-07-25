<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="flex justify-center items-center h-screen flex-col">
    <h1 class="text-4xl font-bold">Merci pour votre commande !</h1>
    <RouterLink to="/" class="text-primary-500 underline text-xl">Revenir à l'accueil</RouterLink>
  </div>
</template>
