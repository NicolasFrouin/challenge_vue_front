import { ref } from 'vue';

function usePrompt(isOpen = false) {
  const shown = ref(isOpen);

  function close() {
    shown.value = false;
  }

  function open() {
    shown.value = true;
  }

  return { shown, close, open };
}

export default usePrompt;
