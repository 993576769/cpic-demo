import { computed, ref } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import { useSimpleStore } from './simple';
import type { CustomAxiosResponse } from '@/models/request';
import type { Base } from '@/models/base';
import { randomString } from '@/utils/random';

export interface BaseItem {
  id: Base['id'];
}
export interface Params {
  offset: number;
  per_page: number;
  [key: string]: any;
}

export interface DefineCollectionStoreOption<T extends BaseItem> {
  fetch(params: Partial<Params>): Promise<CustomAxiosResponse<T[]>>;
  params?: Partial<Params>;
}

export function useCollectionStore<T extends BaseItem>(options: DefineCollectionStoreOption<T>) {
  const simpleStore = useSimpleStore(options);
  const id = randomString();

  return defineStore(id, () => {
    const params = ref<Params>({
      offset: 0,
      per_page: 25,
      ...options.params,
    });

    const data = ref<T[]>([]);

    const meta = ref<CustomAxiosResponse['meta']>({ total: 0, page: 1, total_pages: 0, offset: 0, per_page: 25 });

    const isComplete = computed(() => {
      const total = meta.value?.total;
      if (total === undefined) {
        throw new Error('total is undefined');
      }
      return simpleStore.isFulfilled && data.value.length >= total;
    });

    const isEmpty = computed(() => {
      return simpleStore.isFulfilled && data.value.length === 0;
    });

    async function fetchData(fetchParams?: Params, isForce = false) {
      params.value.offset = 0;
      const res = await simpleStore.fetching({ ...params.value, ...fetchParams }, isForce);
      meta.value = res?.meta;
      // TODO: 这里类型不对
      data.value = (res?.data || []) as any;
      return res;
    }

    async function fetchMoreData() {
      if (simpleStore.isFetching || isComplete.value) {
        return;
      }
      params.value.offset = data.value.length;
      const res = await simpleStore.fetching(params.value);
      meta.value = res.meta;
      // TODO: 这里类型不对
      data.value.push(...(res.data as any));
    }

    async function tryFetchData() {
      if (simpleStore.isFetching || isComplete.value) {
        return;
      }
      const res = await simpleStore.fetching(params.value);
      meta.value = res?.meta;
      // TODO: 这里类型不对
      data.value = (res?.data || []) as any;
    }

    function resetData() {
      simpleStore.isFulfilled = false;
      data.value = [];
    }

    function unshift(item: T) {
      data.value.unshift(item as any);
      if (typeof meta.value?.total === 'number') {
        meta.value.total += 1;
      }
    }

    function findItemById(id: T['id']) {
      return data.value.find(item => item.id === id);
    }

    function removeItemById(id: T['id']) {
      const index = data.value.findIndex(item => item.id === id);
      if (index !== -1) {
        data.value.splice(index, 1);
      }
    }

    function replaceItem(newItem: T) {
      const index = data.value.findIndex(item => item.id === newItem.id);
      if (index > -1) {
        data.value.splice(index, 1, newItem as any);
      }
    }

    return {
      ...storeToRefs(simpleStore),
      params,
      isComplete,
      isEmpty,
      data,
      meta,
      fetchData,
      tryFetchData,
      fetchMoreData,
      resetData,
      unshift,
      findItemById,
      removeItemById,
      replaceItem,
    };
  })();
}

export function mapCollectionStore<T extends BaseItem>(store: ReturnType<typeof useCollectionStore<T>>) {
  return {
    ...store,
    ...storeToRefs(store),
  };
}
