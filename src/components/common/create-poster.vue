<template>
  <div class="common-create-poster">
    <canvas class="canvas" type="2d" id="create-poster-canvas" :style="{ width: width + 'px', height: height + 'px' }" />
    <div @click="createPoster">
      <slot />
    </div>
  </div>
</template>

<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import _ from 'lodash';

  @Component
  export default class CreatePoster extends Vue {
    @Prop({ type: Number, default: 200 }) width;
    @Prop({ type: Number, default: 200 }) height;
    @Prop({ type: Array, default: () => [] }) config;

    getDpr() {
      let dpr = 2;
      try {
        dpr = uni.getSystemInfoSync().pixelRatio;
      // eslint-disable-next-line no-empty
      } catch (e) {}
      return dpr;
    }

    async createPoster() {
      if (this.ctx && this.canvas) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        await this.$autoLoading(this.drawByType(this.ctx, this.canvas), '正在生成图片...');
        return;
      }

      const query = uni.createSelectorQuery().in(this);
        query.select('#create-poster-canvas')
          .fields({ node: true })
          .exec(async res => {
            const canvas = this.canvas = res[0].node;
            const ctx = this.ctx = canvas.getContext('2d');
            const dpr = this.getDpr();
            canvas.width = this.width * dpr;
            canvas.height = this.height * dpr;
            ctx.scale(dpr, dpr);
            await this.$autoLoading(this.drawByType(ctx, canvas), '正在生成图片...');
          });
    }

    async drawByType(ctx, canvas) {
      const cloneConfig = _.cloneDeep(this.config);
      for (const config of cloneConfig) {
        switch (config.type.toLowerCase()) {
          case 'draw':
            await this.customDraw(ctx, config, canvas);
            break;
          case 'image':
            await this.drawImage(ctx, config, canvas);
            break;
          case 'text':
            this.handleDrawText(ctx, config, canvas);
            break;
          case 'line':
            this.drawLine(ctx, config, canvas);
            break;
          case 'background':
            this.drawBackground(ctx, config, canvas);
            break;
          case 'arc':
            this.drawCircle(ctx, config, canvas);
            break;
        }
      }
      const { tempFilePath } = await uni.canvasToTempFilePath({ canvas }, this);
      this.$emit('success', tempFilePath);
    }

    customDraw(ctx, config) {
      if (_.isFunction(config.draw)) {
        return config.draw({ ctx, config });
      }
    }

    drawImage(ctx, config, canvas) {
      const { top, left, width, height, url, round, mode } = config;
      const img = canvas.createImage();
      return new Promise(resolve => {
        img.onload = async () => {
          ctx.save();
          if (round) {
            const minSize = Math.min(width, height);
            const r = (round > minSize / 2) ? minSize / 2 : round;
            ctx.beginPath();
            ctx.moveTo(left + r, top);
            ctx.arcTo(left + width, top, left + width, top + height, r);
            ctx.arcTo(left + width, top + height, left, top + height, r);
            ctx.arcTo(left, top + height, left, top, r);
            ctx.arcTo(left, top, left + width, top, r);
            ctx.clip();
          }
          if (mode === 'aspectFill') {
            const info = await uni.getImageInfo({ src: url });
            ctx.beginPath();
            ctx.rect(left, top, width, height);
            ctx.clip();
            const newHeight = width / info.width * info.height;
            const topOffset = newHeight > height ? (newHeight - height) / 2 : 0;
            ctx.drawImage(img, left, top - topOffset, width, newHeight);
          } else {
            ctx.drawImage(img, left, top, width, height);
          }
          ctx.restore();
          resolve();
        };
        img.src = url;
      });
    }

    handleDrawText(ctx, config) {
      if (config.text instanceof Array) {
        const textArr = config.text;
        textArr.map(textObj => {
          Object.assign(config, textObj);
          const { left, textWidth } = this.drawText(ctx, config);
          config.left = config.textAlign === 'right' ? left - textWidth : left + textWidth;
        });
      } else {
        this.drawText(ctx, config);
      }
    }

    drawText(ctx, config) {
      let { text, fontSize = 20, fontWeight, textDecoration, lineHeight, maxRow = 10, maxWidth = 375, ellipsis = true, top, left, margin = 0, color, textAlign, baseline = 'top' } = config;
      lineHeight = lineHeight || fontSize * 1.5;
      ctx.save();
      ctx.textAlign = textAlign;
      ctx.fillStyle = color;
      ctx.textBaseline = baseline;
      ctx.font = fontWeight === 'bold' ? `bold ${fontSize}px/${lineHeight}px sans-serif` : `${fontSize}px/${lineHeight}px sans-serif`;

      const textArr = [];
      for (let i = 0; i < text.length; i++) {
        const textLine = (textArr[Math.max(textArr.length - 1, 0)] || '') + text[i];
        const { width: textWidth } = ctx.measureText(textLine);
        const index = Math.max(textWidth > maxWidth ? textArr.length : textArr.length - 1, 0);
        textArr[index] = (textArr[index] || '') + text[i];
      }

      if (textArr.length > maxRow) {
        textArr.length = maxRow;
        if (ellipsis) {
          textArr[maxRow - 1] = textArr[maxRow - 1].slice(0, -2) + '...';
        }
      }

      let textWidth = 0;
      textArr.forEach((item, index) => {
        const x = textAlign === 'right' ? (left - margin) : (left + margin);
        const y = top + index * lineHeight;
        const { width } = ctx.measureText(item);
        textWidth = width;
        ctx.fillText(item || '', x, y);
        if (textDecoration === 'line-through') {
          const lineConfig = { startX: x - 2, startY: y + fontSize / 2, endX: left + textWidth + 6, endY: y + fontSize / 2, strokeStyle: color };
          this.drawLine(ctx, lineConfig);
        }
      });
      ctx.restore();

      return { ...config, textWidth };
    }

    drawLine(ctx, config) {
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

    drawBackground(ctx, config) {
      const { top, left, width, height, color } = config;
      ctx.save();
      ctx.fillStyle = color;
      ctx.fillRect(left, top, width, height);
      ctx.restore();
    }

    drawCircle(ctx, config) {
      const { top, left, r, sAngle = 0, eAngle = 2 * Math.PI, counterclockwise = false, color = '#ffffff', alpha = 1 } = config;
      ctx.save();
      ctx.fillStyle = color;
      ctx.globalAlpha = alpha;
      ctx.arc(top, left, r, sAngle, eAngle, counterclockwise);
      ctx.fill();
      ctx.restore();
    }
  }
</script>

<style lang="scss">
  .common-create-poster {
    .canvas {
      position: fixed;
      left: -200%;
    }
  }
</style>
