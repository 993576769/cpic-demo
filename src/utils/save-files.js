import checkApiAuth from './check-api-auth';

export async function saveFiles(urls, medium_type = 'image') {
 await checkApiAuth('writePhotosAlbum');
  await saveToPhotosAlbum(urls, medium_type);
}

async function saveToPhotosAlbum(urls, medium_type) {
  const method = medium_type === 'video' ? 'saveVideoToPhotosAlbum' : 'saveImageToPhotosAlbum';
  for (const url of [].concat(urls)) {
    let filePath;
    if (/^wxfile/.test(url) || /^http:\/\/tmp\//.test(url)) {
      filePath = url;
    } else {
      const { tempFilePath } = await uni.downloadFile({ url });
      filePath = tempFilePath;
    }
    await uni[method]({ filePath });
  }
}
