<script setup lang="ts">
import { ElAffix, ElAnchor, ElAnchorLink, ElContainer } from "element-plus";
import { AppAside, AppFooter, AppHeader, AppMain } from "./components/main";
import { useAppState } from "@/stores/state";
import { computed } from "vue";

const { isMobile, sidebarOpen } = useAppState();

computed(() => {
  console.log("APP", sidebarOpen);
  return sidebarOpen;
});
</script>

<template>
  <ElContainer>
    <AppAside v-if="!isMobile" v-show="sidebarOpen" />
    <ElAffix v-else v-show="sidebarOpen" style="width: 200px; height: 100vh">
      <ElAnchor>
        <ElAnchorLink href="#/home" title="Home" />
        <ElAnchorLink href="#/about" title="About" />
        <ElAnchorLink href="#/contact" title="Contact" />
      </ElAnchor>
    </ElAffix>
    <!-- v-else > Affix / Anchor -->
    <ElContainer direction="vertical">
      <AppHeader />
      <AppMain />
      <AppFooter />
    </ElContainer>
  </ElContainer>
</template>
