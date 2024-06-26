import { defineStore } from 'pinia';
import { ref } from 'vue';

const useAppState = defineStore('app', () => {
  const loading = ref(false);

  function setLoading(state: boolean) {
    loading.value = state;
  }

  function toggleLoading() {
    loading.value = !loading.value;
  }

  return {
    loading,
    setLoading,
    toggleLoading,
  };
});

export default useAppState;
