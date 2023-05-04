import { defineStore, storeToRefs } from 'pinia';
import { ref } from 'vue';
import { randomString } from '@/utils/random';

interface Data<T> {
  data: T;
  meta?: Record<string, string | number>;
  [key: string]: any;
}

export interface DefineSimpleStoreOption<T> {
  fetch(params: unknown): Promise<Data<T>>;
}

export function useSimpleStore<T>(options: DefineSimpleStoreOption<T>) {
  const id = randomString();

  return (
    defineStore(id, () => {
      const isFetching = ref(false);
      const isRejected = ref(false);
      const isFulfilled = ref(false);

      let fetchPromies: Promise<Data<T>> | null = null;
      async function fetching(params: unknown, isForce = false) {
        if (!isFetching.value || isForce || !fetchPromies) {
          // 多次调用只发送一次请求，比如多接口 401 时，自动登录只调用一次
          fetchPromies = options.fetch(params);
        }
        isFetching.value = true;
        try {
          const res = await fetchPromies;
          isFetching.value = false;
          isRejected.value = false;
          isFulfilled.value = true;
          return res;
        } catch (err) {
          isFetching.value = false;
          isRejected.value = true;
          throw err;
        } finally {
          fetchPromies = null;
        }
      }

      function fetchData(params?: unknown, isForce = false) {
        return fetching(params, isForce);
      }

      function tryFetchData(params?: unknown, isForce = false) {
        return !isFulfilled.value ? fetchData(params, isForce) : Promise.resolve();
      }

      return {
        isFetching,
        isRejected,
        isFulfilled,
        fetchData,
        tryFetchData,
        fetching,
      };
    })
  )();
}

export function mapSimpleStore<T>(store: ReturnType<typeof useSimpleStore<T>>) {
  return {
    ...store,
    ...storeToRefs(store),
  };
}
