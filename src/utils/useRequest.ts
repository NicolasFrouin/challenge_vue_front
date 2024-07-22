import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { ref } from 'vue';

function useRequest<T>(config: AxiosRequestConfig, sendImmediately = true) {
  const resData = ref<T | null>(null);
  const isLoading = ref<boolean>(false);
  const error = ref<Error | null>(null);

  const abortController = new AbortController();

  function abort() {
    abortController.abort();
  }

  async function sendRequest() {
    isLoading.value = true;
    axios({ ...config, signal: abortController.signal })
      .then(({ data }) => (resData.value = data))
      .catch((err) => (error.value = err instanceof Error ? err : new Error(err)))
      .finally(() => (isLoading.value = false));
  }

  if (sendImmediately) {
    sendRequest();
  }

  return { resData, isLoading, error, sendRequest, abort };
}

export default useRequest;
