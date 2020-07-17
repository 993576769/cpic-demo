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

    createPoster() {
      if (this.ctx && this.canvas) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawByType(this.ctx, this.canvas);
        return;
      }

      const query = uni.createSelectorQuery().in(this);
        query.select('#create-poster-canvas')
          .fields({ node: true })
          .exec(res => {
            const canvas = this.canvas = res[0].node;
            const ctx = this.ctx = canvas.getContext('2d');
            const dpr = this.getDpr();
            canvas.width = this.width * dpr;
            canvas.height = this.height * dpr;
            ctx.scale(dpr, dpr);
            this.drawByType(ctx, canvas);
          });
    }

    async drawByType(ctx, canvas) {
      for (const config of this.config) {
        switch (config.type.toLowerCase()) {
          case 'draw':
            await this.customDraw(ctx, config, canvas);
            break;
          case 'image':
            await this.drawImage(ctx, config, canvas);
            break;
          case 'text':
            this.drawText(ctx, config, canvas);
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
      const { top, left, width, height, url, round } = config;
      const img = canvas.createImage();
      return new Promise(resolve => {
        img.onload = () => {
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
          ctx.drawImage(img, left, top, width, height);
          ctx.restore();
          resolve();
        };
        img.src = url;
      });
    }

    drawText(ctx, config) {
      let { text, fontSize = 20, lineHeight, maxRow = 10, maxWidth = 375, ellipsis = true, top, left, color, textAlign, baseline = 'top' } = config;
      lineHeight = lineHeight || fontSize * 1.5;
      ctx.save();
      ctx.textAlign = textAlign;
      ctx.fillStyle = color;
      ctx.textBaseline = baseline;
      ctx.font = `${fontSize}px/${lineHeight}px sans-serif`;

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

      textArr.forEach((item, index) => {
        ctx.fillText(item || '', left, top + index * lineHeight);
      });
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
