import { request } from '@/utils/request';
import { randomString } from '@/utils/random';
import type { ActiveStorage } from '@/models/active-storage';

// 只上传图片和视频
export function useUploadFile() {
  // 非图片就是视频
  const images = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg', 'tiff'];

  async function uploadFile(filePath: string): Promise<ActiveStorage> {
    const extanme = filePath.split('.').pop();
    const fileInfo = await uni.getFileInfo({ filePath });
    const params = {
      hex_digest: fileInfo.digest,
      filename: `${randomString()}.${extanme}`,
      byte_size: fileInfo.size,
      content_type: images.includes(String(extanme).toLowerCase()) ? `image/${extanme}` : `video/${extanme}`,
    };
    // 一般来说接口和返回格式固定，若项目有特殊要求自行调整
    const { data } = await request.post('/active_storage/direct_upload', params);
    const fileSystemManager = uni.getFileSystemManager();
    const fileBinary = fileSystemManager.readFileSync(filePath);
    await request.put(data.direct_upload.url, fileBinary, { headers: data.direct_upload.headers });
    return {
      id: data.signed_id,
      created_at: data.created_at,
      cn: 'ActiveStorage::Attachment',
      url: data.direct_upload.blob_url,
      signed_id: data.signed_id,
      content_type: data.content_type,
      filename: data.filename,
      byte_size: data.byte_size,
    };
  }

  async function uploadFiles(filePaths: string[]): Promise<ActiveStorage[]> {
    const promises = filePaths.map(filePath => uploadFile(filePath));
    return Promise.all(promises);
  }

  return {
    uploadFile,
    uploadFiles,
  };
}
