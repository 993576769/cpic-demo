import { reactive } from 'vue';
import { SimpleStore } from './helper/simple';
import type { Settings } from '@/models/setting';
import { request } from '@/utils';

class SettingStore extends SimpleStore<Settings> {
  data: Settings | undefined;

  async fetch() {
    const res = await request.get<Settings>('settings');
    this.data = res.data;
    return res;
  }
}
export const settingStore = reactive(new SettingStore());
