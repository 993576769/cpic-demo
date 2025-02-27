<script lang="ts" setup>
import type { CSSProperties } from 'vue';
import { generateAliOssImageUrl } from '@/utils/generate-alioss-image-url';
import { computed } from 'vue';

interface Props {
  customStyle?: CSSProperties;
  cropX?: string;
  cropY?: string;
  cropWidth?: string;
  cropHeight?: string;
  resizeWidth?: string;
  resizeHeight?: string;
  resizePercent?: string;
  quality?: string;
  src: string;
  mode: 'scaleToFill' | 'aspectFit' | 'aspectFill' | 'widthFix' | 'heightFix' | 'top' | 'bottom' | 'center' | 'left' | 'right' | 'top left' | 'top right' | 'bottom left' | 'bottom right';
  webp: boolean;
  lazyLoad: boolean;
  showMenuByLongpress: boolean;
}

interface Emits {
  (event: 'error'): void;
  (event: 'load'): void;
}

const props = withDefaults(
  defineProps<Props>(),
  {
    customStyle: () => ({}),
    cropX: '',
    cropY: '',
    cropWidth: '',
    cropHeight: '',
    resizeWidth: '',
    resizeHeight: '',
    resizePercent: '',
    quality: '',
    src: '',
    mode: 'scaleToFill',
    webp: false,
    lazyLoad: false,
    showMenuByLongpress: false,
  },
);

const emits = defineEmits<Emits>();

const imgUrl = computed(() => {
  return props.src.indexOf('?') > 0
    ? props.src
    : `${props.src}?x-oss-process=image${encodeURIComponent(generateAliOssImageUrl(props))}`;
});
</script>

<template>
  <image
    :style="customStyle"
    :src="imgUrl"
    :mode="mode"
    :webp="webp"
    :lazy-load="lazyLoad"
    :show-menu-by-longpress="showMenuByLongpress"
    @error="emits('error')"
    @load="emits('load')"
  />
</template>
