import dayjs from './dayjs';

export function randomString() {
  return Math.random().toString(36).substring(2, 9);
}

export function randomFileName(fileName: string) {
  return [
    dayjs().format('YYMMDD'),
    randomString(),
    fileName,
  ].filter(Boolean).join('/');
}
