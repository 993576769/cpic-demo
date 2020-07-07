import dayjs from 'dayjs';
import { request } from './request';
import { randomFileName } from './random';

const provider = 's3';

export async function uploadFiles(tempFilePaths) {
  const meta = await getUploadMeta();
  const results = [];

  for (const file of tempFilePaths) {
    let url = '';
    switch (provider) {
      case 's3':
        url = await uploadToS3(meta, file);
        break;
      case 'aliyun':
        url = await uploadToAliyun(meta, file);
        break;
      case 'qiniu':
        url = await uploadToQiniu(meta, file);
        break;
    }
    results.push(url);
  }

  return results;
}

async function uploadToS3(meta, file) {
  const key = meta.form_data.key.replace('${filename}', randomFileName());
  const res = await uni.uploadFile({
    url: meta.url,
    name: 'file',
    filePath: file,
    formData: { ...meta.form_data, key },
  });

  if (res.statusCode === 201) {
    return meta.url + '/' + key;
  } else {
    throw new Error('上传失败');
  }
}

async function uploadToAliyun(meta, file) {
  const key = meta.dir + randomFileName();
  const res = await uni.uploadFile({
    url: meta.host,
    name: 'file',
    filePath: file,
    formData: {
      OSSAccessKeyId: meta.access_key_id,
      policy: meta.policy,
      signature: meta.signature,
      success_action_status: 201,
      key,
    }
  });

  if (res.statusCode === 201) {
    return meta.host + '/' + key;
  } else {
    throw new Error('上传失败');
  }
}

async function uploadToQiniu(meta, file) {
  const key = randomFileName();
  const res = await uni.uploadFile({
    url: meta.upload_url,
    name: 'file',
    filePath: file,
    formData: {
      key,
      token: meta.token,
    }
  });
  const result = JSON.parse(res.data);
  if (res.statusCode === 200) {
    return `https://${meta.bucket_domain}/${result.key}`;
  } else {
    throw new Error(result.error);
  }
}

let upload_meta = null;

// Todo 规范 api url 和返回参数
async function getUploadMeta() {
  if (upload_meta && dayjs(upload_meta.signature_expiration).subtract(1, 'm').isAfter(dayjs())) {
    return upload_meta;
  }
  const { data: meta } = await request.get('utils/oss_presign');
  return upload_meta = meta;
}
