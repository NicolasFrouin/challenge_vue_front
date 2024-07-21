import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { ref } from 'vue';

function useRequest(options: AxiosRequestConfig, sendImmediately = true) {
  const resData = ref<any>(null);
  const isLoading = ref(sendImmediately);
  const error = ref<Error | null>(null);

  async function sendRequest() {
    isLoading.value = true;
    axios(options)
      .then(
        ({ data }) => (resData.value = data),
        (reason) => {
          throw reason instanceof Error ? reason : new Error(String(reason));
        },
      )
      .catch((err) => (error.value = err))
      .finally(() => (isLoading.value = false));
  }

  if (sendImmediately) {
    sendRequest();
  }

  return { resData, isLoading, error, sendRequest };
}

export default useRequest;
