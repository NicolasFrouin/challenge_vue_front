import { ref } from 'vue';

function usePagination(total: number, page = 1, pageSize = 10) {
  const totalPages = ref(Math.ceil(total / pageSize));
  const from = ref((page - 1) * pageSize + 1);
  const to = ref(Math.min(page * pageSize, total));

  return {
    page,
    pageSize,
    total,
    totalPages,
    from,
    to,
  };
}

export default usePagination;
