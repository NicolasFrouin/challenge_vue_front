<script setup lang="ts">
import { ProductCardDesktop, ProductCardMobile } from '@/components/product';
import useAppState from '@/stores/state';

const { isMobile } = useAppState();
</script>

<template>
  <main class="p-4">
    <h1>HelloWorld</h1>
    <div class="flex flex-row flex-wrap">
      <Component
        :is="isMobile ? ProductCardMobile : ProductCardDesktop"
        v-for="i in 15"
        :key="i"
        class="w-[calc(25%-8px)] m-1"
      />
    </div>
  </main>
</template>
