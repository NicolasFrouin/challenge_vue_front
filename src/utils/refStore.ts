import { storeToRefs, type StoreGeneric } from 'pinia';

/**
 * Enhances a Pinia store with refs
 *
 * The refs are not passed to typescript, so trust the process and use scalar values as refs
 *
 * Use them by assessing `<VALUE>.value` for scalar and use functions as is
 *
 * Use `// \@ts-expect-error` to ignore the error (ignore the `\`)
 *
 * @param store A Pinia store
 * @returns The very same store with refs
 */
export function useRefStore<T extends StoreGeneric>(store: T): T {
  return { ...store, ...storeToRefs(store) };
}
