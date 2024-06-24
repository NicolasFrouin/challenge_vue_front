<script setup lang="ts">
import { ref } from "vue";
import { ElMenu, ElMenuItem, ElMenuItemGroup, ElSubMenu, ElRadioButton, ElRadioGroup, ElIcon } from "element-plus";
import { Document, Menu as IconMenu, Location, Setting } from "@element-plus/icons-vue";

const isCollapse = ref(true);
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<template>
  <ElRadioGroup v-model="isCollapse" style="margin-bottom: 20px">
    <ElRadioButton :value="false">expand</ElRadioButton>
    <ElRadioButton :value="true">collapse</ElRadioButton>
  </ElRadioGroup>
  <nav>
    <ElMenu
      default-active="1-1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
    >
      <ElSubMenu index="1">
        <template #title>
          <ElIcon><location /></ElIcon>
          <span>Navigator One</span>
        </template>
        <ElMenuItemGroup>
          <template #title><span>Group One</span></template>
          <ElMenuItem index="1-1">item one</ElMenuItem>
          <ElMenuItem index="1-2">item two</ElMenuItem>
        </ElMenuItemGroup>
        <ElMenuItemGroup title="Group Two">
          <ElMenuItem index="1-3">item three</ElMenuItem>
        </ElMenuItemGroup>
        <ElSubMenu index="1-4">
          <template #title><span>item four</span></template>
          <ElMenuItem index="1-4-1">item one</ElMenuItem>
        </ElSubMenu>
      </ElSubMenu>
      <ElMenuItem index="2">
        <ElIcon><IconMenu /></ElIcon>
        <template #title>Navigator Two</template>
      </ElMenuItem>
      <ElMenuItem index="3" disabled>
        <ElIcon><Document /></ElIcon>
        <template #title>Navigator Three</template>
      </ElMenuItem>
      <ElMenuItem index="4">
        <ElIcon><Setting /></ElIcon>
        <template #title>Navigator Four</template>
      </ElMenuItem>
    </ElMenu>
  </nav>
</template>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
