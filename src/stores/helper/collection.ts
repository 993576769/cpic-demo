import { SimpleStore } from './simple';
import type { CustomAxiosResponse } from '@/models/request';
import type { Base } from '@/models/base';

export interface BaseItem {
  id: Base['id'];
}

export interface Params {
  offset: number;
  per_page: number;
  [key: string]: any;
}

interface ConstructorOptions<T> {
  params?: Partial<Params>;
  fetch?: SimpleStore<T[]>['fetch'];
}

export class Collection<T extends BaseItem> extends SimpleStore<T[]> {
  constructor(opts?: ConstructorOptions<T>) {
    super();
    if (opts?.fetch) {
      this.fetch = opts.fetch;
    }
    this.params = Object.assign({}, this.defaultParams, opts?.params);
  }

  private defaultParams = {
    offset: 0,
    per_page: 25,
  };

  data: T[] = [];
  params: Params = {
    offset: 0,
    per_page: 25,
  };

  meta: CustomAxiosResponse['meta'] = { total: 0, page: 1, total_pages: 0, offset: 0, per_page: 25 };

  get isComplete() {
    const total = this.meta?.total;
    if (total === undefined) {
      throw new Error('total is undefined');
    }

    return this.isFulfilled && this.data.length >= total;
  }

  get isEmpty() {
    return this.isFulfilled && this.data.length === 0;
  }

  async fetchData(params?: ConstructorOptions<T>['params'], isForce = false) {
    const res = await this.fetching({ ...this.params, ...params }, isForce);
    this.meta = res.meta;
    this.data = res.data || [];
    return res;
  }

  async fetchMoreData() {
    if (this.isFetching || this.isComplete) {
      return;
    }
    this.params.offset = this.data.length;
    const { data = [], meta } = await this.fetching(this.params);
    this.meta = meta;
    this.data.push(...data);
  }

  resetData() {
    this.isFulfilled = false;
    this.data = [];
  }

  unshift(item: T) {
    this.data.unshift(item);
    if (typeof this.meta?.total === 'number') {
      this.meta.total += 1;
    }
  }

  findItemById(id: T['id']) {
    return this.data.find(item => item.id === id);
  }

  removeItemById(id: T['id']) {
    const index = this.data.findIndex(item => item.id === id);
    if (index !== -1) {
      this.data.splice(index, 1);
    }
  }

  replaceItem(newItem: T) {
    const index = this.data.findIndex(item => item.id === newItem.id);
    if (index > -1) {
      this.data.splice(index, 1, newItem);
    }
  }
}
