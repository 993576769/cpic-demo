import { omit } from 'lodash-es';
import type { Base } from './base';
import { getBaseDefaultData } from './base';

export interface ActiveStorage extends Omit<Base, 'updated_at'> {
  cn: 'ActiveStorage::Attachment';
  url: string;
  signed_id: string;
  content_type: 'image/jpeg'; // TODO: 待完善
  filename: string;
  byte_size: number;
}

//  通过 function 获取默认数据，防止引用类型数据，改到默认数据
export function getActiveStorageDefaultData(): ActiveStorage {
  const baseData = omit(getBaseDefaultData(), 'updated_at');
  return {
    ...baseData,
    cn: 'ActiveStorage::Attachment',
    url: '',
    signed_id: '',
    content_type: 'image/jpeg',
    filename: '',
    byte_size: 0,
  };
}
