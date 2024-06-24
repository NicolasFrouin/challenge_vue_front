<script setup lang="ts">
import { RouterView } from 'vue-router';
import { AppFooter, AppHeader } from '@/components/main';
</script>

<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->
  <AppHeader />
  <main>
    <RouterView />
  </main>
  <AppFooter />
</template>
