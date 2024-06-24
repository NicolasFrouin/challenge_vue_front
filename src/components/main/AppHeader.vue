<script setup lang="ts">
import company from "@/company";
import { ElLink, ElSwitch, ElIcon, ElHeader, ElButton, ElContainer } from "element-plus";
import { Moon, Sunny, Fold, Expand } from "@element-plus/icons-vue";
import { ref, watch } from "vue";
import { useAppState } from "@/stores/state";

const { sidebarOpen, toggleSidebar } = useAppState();

const darkTheme = ref<boolean>(localStorage.getItem("theme") === "dark");

if (darkTheme.value) {
  document.documentElement.classList.add("dark");
}

watch(darkTheme, (value) => {
  document.documentElement.classList.toggle("dark", value);
  localStorage.setItem("theme", value ? "dark" : "light");
});
</script>

<template>
  <ElHeader class="bg-black flex items-center justify-between p-4">
    <ElButton type="default" :icon="sidebarOpen ? Fold : Expand" @click="toggleSidebar" />
    <ElLink href="/" :underline="false" class="text-white text-lg font-bold hover:text-white">
      <img src="/src/assets/logo.svg" alt="Logo" class="h-8 w-8" />
      {{ company.name }}
    </ElLink>
    <div class="flex">
      <ElContainer>
        <ElSwitch v-model="darkTheme" style="--el-switch-on-color: #2c2c2c; --el-switch-off-color: #f2f2f2">
          <template #active-action>
            <ElIcon color="black">
              <Moon />
            </ElIcon>
          </template>
          <template #inactive-action>
            <ElIcon color="black">
              <Sunny />
            </ElIcon>
          </template>
        </ElSwitch>
      </ElContainer>
    </div>
  </ElHeader>
</template>
