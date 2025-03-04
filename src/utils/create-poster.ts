import process from 'node:process';
import { useAuthStore } from '@/stores/auth';
import { cloneDeep } from 'lodash-es';

interface Ctx extends UniApp.CanvasContext {
  textAlign?: 'right' | 'left' | 'center';
  textBaseline?: 'top' | 'middle' | 'bottom';
}

interface DrawConfig {
  type: 'draw';
  draw: ({ ctx, config }: { ctx: Ctx; config: DrawConfig }) => void;
}

interface ImageConfig {
  type: 'image';
  top: number;
  left: number;
  width: number;
  height: number;
  url: string;
  mode?: 'top' | 'aspectFit' | 'aspectFill';
  round?: number;
}

interface TextConfig {
  type: 'text';
  text: string | { text: string; [key: string]: any }[];
  fontSize?: number;
  fontWeight?: 'bold';
  textDecoration?: 'line-through';
  lineHeight?: number;
  maxRow?: number;
  maxWidth?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingLeft?: number;
  ellipsis?: boolean;
  top?: number;
  left?: number;
  margin?: number;
  color?: string;
  textAlign?: 'right' | 'left' | 'center';
  baseline?: 'top' | 'middle' | 'bottom';
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
}

interface LineConfig {
  type: 'line';
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  strokeStyle: string;
  dash?: number[];
}

interface BackgroundConfig {
  type: 'background';
  top: number;
  left: number;
  width: number;
  height: number;
  color: string;
  round?: number;
}

interface BorderConfig {
  type: 'border';
  top: number;
  left: number;
  width: number;
  height: number;
  borderRadius?: number;
  borderColor: string;
  borderWidth?: number;
}

interface ArcConfig {
  type: 'arc';
  top: number;
  left: number;
  r: number;
  sAngle?: number;
  eAngle?: number;
  counterclockwise?: boolean;
  color?: string;
  alpha?: number;
}

export type Config =
  | DrawConfig
  | ImageConfig
  | TextConfig
  | LineConfig
  | BackgroundConfig
  | BorderConfig
  | ArcConfig;

interface PosterConfig {
  canvasId?: string;
  width?: number;
  height?: number;
  dpr?: number;
  config?: Config[];
  component?: any;
}

export class Poster {
  private canvasId: string;
  private width: number;
  private height: number;
  private dpr: any;
  private config: Config[];
  private component: any;
  private ctx: Ctx = {} as Ctx;
  private canvas: any;
  constructor(config: PosterConfig = {}) {
    this.canvasId = config.canvasId || '';
    this.width = config.width || 200;
    this.height = config.height || 200;
    this.dpr = config.dpr || this.getDpr();
    this.config = config.config || [];
    this.component = config.component || {};
  }

  getDpr() {
    let dpr = 2;
    try {
      dpr = uni.getSystemInfoSync().pixelRatio;
    } catch (e) {}
    return dpr;
  }

  createPoster(config?: PosterConfig): Promise<string> {
    if (config) {
      this.config = config.config || [];
    }
    if (this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      return this.drawByType(this.ctx, this.canvas);
    }
    return new Promise((resolve, reject) => {
      const query = uni.createSelectorQuery().in(this.component) as any;
      query.select(`#${this.canvasId}`)
        .fields({ node: true })
        .exec((res: any) => {
          const canvas = this.canvas = res[0].node;
          const ctx = this.ctx = canvas.getContext('2d');
          canvas.width = this.width * this.dpr;
          canvas.height = this.height * this.dpr;
          ctx.scale(this.dpr, this.dpr);
          ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
          this.drawByType(ctx, canvas)
            .then(resolve)
            .catch(reject);
        });
    });
  }

  draw(ctx: Ctx): Promise<string> {
    return new Promise((resolve) => {
      if (ctx.draw) {
        ctx.draw(true, resolve);
      }
    });
  }

  customDraw(ctx: Ctx, config: DrawConfig): void {
    if (typeof config.draw === 'function') {
      config.draw({ ctx, config });
    }
  }

  async drawByType(ctx: Ctx, canvas: any): Promise<string> {
    const cloneConfig: any = cloneDeep(this.config);
    for (const config of cloneConfig) {
      switch (config.type.toLowerCase()) {
        case 'draw':
          this.customDraw(ctx, config);
          break;
        case 'image':
          await this.drawImage(ctx, config, canvas);
          break;
        case 'text':
          this.handleDrawText(ctx, config);
          break;
        case 'line':
          this.drawLine(ctx, config);
          break;
        case 'background':
          this.drawBackground(ctx, config);
          break;
        case 'border':
          this.drawBorder(ctx, config);
          break;
        case 'arc':
          this.drawCircle(ctx, config);
          break;
      }
    }
    const base64 = await canvas.toDataURL();
    return base64;
  }

  async loadImage(url: string, canvas: any): Promise<any> {
    if (/^https?:\/\//.test(url)) {
      let header = {};
      if (url.match(import.meta.env.VUE_APP_API_HOST)) {
        const store = useAuthStore();
        header = { Authorization: store.accessToken };
      }
      const { tempFilePath } = await uni.downloadFile({ url, header });
      url = tempFilePath;
    }
    if (process.env.VUE_APP_PLATFORM === 'mp-weixin') {
      const img = canvas.createImage();
      img.src = url;
      return new Promise((resolve, reject) => {
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error('图片加载失败'));
      });
    }
    return url;
  }

  async execDrawImage(ctx: Ctx, config: ImageConfig, img: any): Promise<void> {
    ctx.save();
    const { top, left, width, height, url, mode } = config;
    this.clipRound(ctx, config);
    if (mode) {
      const info = typeof img === 'string' ? (await uni.getImageInfo({ src: url })) : img;
      ctx.beginPath();
      ctx.rect(left, top, width, height);
      ctx.clip();
      if (mode === 'top') {
        const newHeight = width / info.width * info.height;
        ctx.drawImage(img, left, top, width, newHeight);
      } else if (mode === 'aspectFit' || mode === 'aspectFill') {
        const ratio = Math[mode === 'aspectFit' ? 'min' : 'max'](width / info.width, height / info.height);
        const newHeight = Math.round(ratio * info.height);
        const newWidth = Math.round(ratio * info.width);
        ctx.drawImage(img, left - ((newWidth - width) / 2), top - ((newHeight - height) / 2), newWidth, newHeight);
      } else {
        ctx.drawImage(img, left, top, width, height);
      }
    } else {
      ctx.drawImage(img, left, top, width, height);
    }
    ctx.restore();
  }

  async drawImage(ctx: Ctx, config: ImageConfig, canvas: any): Promise<void> {
    if (!config.url) {
      return console.error('图片不能为空', config);
    }
    const img = await this.loadImage(config.url, canvas);
    await this.execDrawImage(ctx, config, img);
  }

  handleDrawText(ctx: Ctx, config: TextConfig): void {
    if (Array.isArray(config.text)) {
      const textArr = config.text.filter(item => item.text);
      // eslint-disable-next-line array-callback-return
      textArr.map((textObj) => {
        const newConfig = Object.assign({}, config, textObj);
        const { left, textWidth, margin = 0 } = this.drawText(ctx, newConfig);
        config.left = config.textAlign === 'right' ? left - textWidth - margin : left + textWidth + margin;
      });
    } else {
      this.drawText(ctx, config);
    }
  }

  drawText(ctx: Ctx, config: TextConfig): any {
    let {
      text,
      fontSize = 20,
      fontWeight,
      textDecoration,
      lineHeight = 12,
      maxRow = 10,
      maxWidth = 375,
      paddingTop = 0,
      paddingRight = 0,
      paddingLeft = 0,
      ellipsis = true,
      top = 0,
      left = 0,
      margin = 0,
      color = '#000000',
      textAlign,
      baseline = 'top',
    } = config;
    if (!text) {
      return;
    }
    lineHeight = lineHeight || fontSize * 1.5;
    ctx.save();
    ctx.textAlign = textAlign;
    ctx.fillStyle = color;
    // 这里直接写死 ctx.textBaseline，后面会根据 baseline 重新计算Y轴的值;
    ctx.textBaseline = 'middle';
    ctx.font = fontWeight === 'bold' ? `bold ${fontSize}px/${lineHeight}px sans-serif` : `${fontSize}px/${lineHeight}px sans-serif`;

    const textArr: string[] = [];
    for (let i = 0; i < text.length; i++) {
      const textLine = (textArr[Math.max(textArr.length - 1, 0)] || '') + text[i];
      const { width: textWidth } = ctx.measureText(textLine);
      const index = Math.max(textWidth > maxWidth ? textArr.length : textArr.length - 1, 0);
      textArr[index] = (textArr[index] || '') + text[i];
    }

    if (textArr.length > maxRow) {
      textArr.length = maxRow;
      if (ellipsis) {
        textArr[maxRow - 1] = `${textArr[maxRow - 1].slice(0, -2)}...`;
      }
    }

    // 画文字背景和边框
    this.drawTextBackgroundAndBorder(ctx, { ...config, lineHeight }, textArr);

    let textWidth = 0;
    textArr.forEach((item, index) => {
      const x = textAlign === 'right' ? (left - margin) : (left + margin);
      let y = top + index * lineHeight;
      if (baseline === 'top') {
        y = top + index * lineHeight + lineHeight / 2;
      } else if (baseline === 'bottom') {
        y = top + index * lineHeight - lineHeight / 2;
      }
      const { width } = ctx.measureText(item);
      textWidth = width;
      ctx.fillText(item || '', x + paddingLeft, y + paddingTop);
      if (textDecoration === 'line-through') {
        const lineConfig: LineConfig = {
          startX: x - 2,
          startY: y,
          endX: left + textWidth + 6,
          endY: y,
          strokeStyle: color,
          type: 'line',
        };
        this.drawLine(ctx, lineConfig);
      }
    });
    ctx.restore();
    return { ...config, textWidth: textWidth + paddingLeft + paddingRight };
  }

  drawTextBackgroundAndBorder(ctx: Ctx, config: any, textArr: any[]): void {
    const {
      backgroundColor,
      textAlign,
      left,
      top,
      margin = 0,
      paddingTop = 0,
      paddingLeft = 0,
      paddingRight = 0,
      paddingBottom = 0,
      borderRadius = 0,
      lineHeight,
      borderColor,
    } = config;

    const newConfig = {
      top,
      left: textAlign === 'right' ? (left - margin) : (left + margin),
      // eslint-disable-next-line prefer-spread
      width: Math.max.apply(Math, textArr.map(item => ctx.measureText(item).width)) + paddingLeft + paddingRight,
      height: textArr.length * lineHeight + paddingTop + paddingBottom,
    };

    if (backgroundColor) {
      this.drawBackground(ctx, {
        ...newConfig,
        color: backgroundColor,
        round: borderRadius,
        type: 'background',
      });
    }
    if (borderColor) {
      this.drawBorder(ctx, { ...config, ...newConfig });
    }
  }

  drawRadiusRect(ctx: Ctx, config: BorderConfig): void {
    const { left, top, width, height, borderRadius = 0 } = config;
    const br = borderRadius / 2;
    ctx.beginPath();
    ctx.moveTo(left + br, top);
    ctx.lineTo(left + width - br, top);
    ctx.arc(left + width - br, top + br, br, 2 * Math.PI * (3 / 4), 2 * Math.PI * (4 / 4));
    ctx.lineTo(left + width, top + height - br);
    ctx.arc(left + width - br, top + height - br, br, 0, 2 * Math.PI * (1 / 4));
    ctx.lineTo(left + br, top + height);
    ctx.arc(left + br, top + height - br, br, 2 * Math.PI * (1 / 4), 2 * Math.PI * (2 / 4));
    ctx.lineTo(left, top + br);
    ctx.arc(left + br, top + br, br, 2 * Math.PI * (2 / 4), 2 * Math.PI * (3 / 4));
  }

  drawBorder(ctx: Ctx, config: BorderConfig): void {
    const { width, top, left, height, borderRadius, borderColor, borderWidth = 1 } = config;
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = borderWidth;
    if (borderRadius) {
      this.drawRadiusRect(ctx, config);
    } else {
      ctx.strokeRect(left, top, width, height);
    }
    ctx.stroke();
  }

  drawLine(ctx: Ctx, config: LineConfig): void {
    const { startX, startY, endX, endY, strokeStyle, dash } = config;
    ctx.save();
    ctx.beginPath();
    dash && ctx.setLineDash(dash, 0);
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = strokeStyle;
    ctx.stroke();
    ctx.restore();
  }

  clipRound(ctx: Ctx, config: any): void {
    const { round, width, height, left, top } = config;
    if (round) {
      const minSize = Math.min(width, height);
      const r = round > minSize / 2 ? minSize / 2 : round;
      ctx.beginPath();
      ctx.moveTo(left + r, top);
      ctx.arcTo(left + width, top, left + width, top + height, r);
      ctx.arcTo(left + width, top + height, left, top + height, r);
      ctx.arcTo(left, top + height, left, top, r);
      ctx.arcTo(left, top, left + width, top, r);
      ctx.clip();
    }
  }

  drawBackground(ctx: Ctx, config: BackgroundConfig): void {
    const { top, left, width, height, color } = config;
    ctx.save();
    this.clipRound(ctx, config);
    ctx.fillStyle = color;
    ctx.fillRect(left, top, width, height);
    ctx.restore();
  }

  drawCircle(ctx: Ctx, config: ArcConfig): void {
    const {
      top,
      left,
      r,
      sAngle = 0,
      eAngle = 2 * Math.PI,
      counterclockwise = false,
      color = '#ffffff',
      alpha = 1,
    } = config;
    ctx.save();
    ctx.fillStyle = color;
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.arc(left, top, r, sAngle, eAngle, counterclockwise);
    ctx.fill();
    ctx.restore();
  }
}
