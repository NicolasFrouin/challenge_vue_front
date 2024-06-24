import { useWindowSize } from "@vueuse/core";
import { defineStore, storeToRefs } from "pinia";
import { computed, ref } from "vue";

const appState = defineStore("app", () => {
  const { width } = useWindowSize();

  const isMobile = computed(() => (width.value as number) <= 768);
  const sidebarOpen = ref(!isMobile.value);

  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value;
  };

  return {
    isMobile,
    sidebarOpen,
    toggleSidebar,
  };
});

export const useAppState = () => ({
  ...appState(),
  ...storeToRefs(appState()),
});
