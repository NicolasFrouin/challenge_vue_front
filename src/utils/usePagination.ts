import { ref, computed, type Ref, type ComputedRef } from 'vue';

export type IPagination = {
  totalItems: number;
  currentPage?: number;
  pageSize?: number;
  maxPages?: number;
};

export type UsePagination = {
  next: () => void;
  prev: () => void;
  setPageSize: (size: number) => void;
  pageSize: Ref<number>;
  activePage: Ref<number>;
  totalPages: ComputedRef<number>;
  from: ComputedRef<number>;
  to: ComputedRef<number>;
};

function usePagination({ totalItems, currentPage = 1, pageSize = 10 }: IPagination): UsePagination {
  const activePage = ref(Math.max(1, currentPage));
  const itemsPerPage = ref(Math.max(1, pageSize));
  const totalPages = computed(() => Math.ceil(totalItems / itemsPerPage.value));
  const setPageSize = (size: number) => {
    itemsPerPage.value = size;
  };

  function next() {
    if (activePage.value < totalPages.value) {
      activePage.value += 1;
    }
  }

  function prev() {
    if (activePage.value > 1) {
      activePage.value -= 1;
    }
  }

  const from = computed(() => (activePage.value - 1) * itemsPerPage.value);
  const to = computed(() => Math.min(from.value + itemsPerPage.value, totalItems));

  return {
    next,
    prev,
    setPageSize,
    pageSize: itemsPerPage,
    activePage,
    totalPages,
    from,
    to,
  };
}

export default usePagination;
