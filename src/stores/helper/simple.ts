interface Data<T> {
  data: T;
  meta?: Record<string, string | number>;
  [key: string]: any;
}

export class SimpleStore<T = unknown> {
  private fetchPromies: Promise<Data<T>> | null = null;

  isFetching = false;
  isRejected = false;
  isFulfilled = false;

  // fetch 需要自行定义好
  fetch(params: unknown): Promise<Data<T>> {
    return Promise.resolve({ data: <T>params });
  }

  fetchData(params?: unknown, isForce = false) {
    return this.fetching(params, isForce);
  }

  tryFetchData(params?: unknown, isForce = false) {
    return !this.isFulfilled && this.fetchData(params, isForce);
  }

  async fetching(params: unknown, isForce = false) {
    if (!this.isFetching || isForce || !this.fetchPromies) {
      // 多次调用只发送一次请求，比如多接口 401 时，自动登录只调用一次
      this.fetchPromies = this.fetch(params);
    }

    this.isFetching = true;
    try {
      const res = await this.fetchPromies;
      Object.assign(this, {
        isFetching: false,
        isRejected: false,
        isFulfilled: true,
      });
      return res;
    } catch (err) {
      Object.assign(this, {
        isFetching: false,
        isRejected: true,
      });
      throw err;
    } finally {
      this.fetchPromies = null;
    }
  }
}
