import { storeToRefs, type StoreGeneric } from 'pinia';

export function useRefStore<T extends StoreGeneric>(store: T): T {
  return { ...store, ...storeToRefs(store) };
}
