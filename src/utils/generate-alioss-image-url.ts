interface AliOssParams {
  resizeWidth?: string;
  resizeHeight?: string;
  resizePercent?: string;
  quality?: string;
  cropX?: string;
  cropY?: string;
  cropWidth?: string;
  cropHeight?: string;
}

export function generateAliOssImageUrl(props: AliOssParams) {
  let [resize, quality, crop] = ['', '', ''];
  resize += props.resizeWidth ? `,w_${props.resizeWidth},` : '';
  resize += props.resizeHeight ? `,h_${props.resizeHeight},` : '';
  resize += props.resizePercent ? `,p_${props.resizePercent},` : '';
  resize = resize ? `/resize${resize}` : '';

  quality += props.quality ? `,q_${props.quality}` : '';
  quality = quality ? `/quality,q_${props.quality}` : '';

  crop += props.cropX ? `,x_${props.cropX},` : '';
  crop += props.cropY ? `,y_${props.cropY},` : '';
  crop += props.cropWidth ? `,w_${props.cropWidth},` : '';
  crop += props.cropHeight ? `,h_${props.cropHeight},` : '';
  crop = crop ? `/crop${crop}` : '';

  return resize + quality + crop;
}
