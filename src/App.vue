<script>
  /* eslint-disable pathname/match-name */
  import { confirm } from '@/utils';

  export default {
    onShow() {
      this.checkUpdateManager();
    },
    methods: {
      // 新版本提示
      checkUpdateManager() {
        const updateManager = uni.getUpdateManager();
        updateManager.onUpdateReady(async () => {
          await confirm('新版本已经准备好，是否重启应用？');
          updateManager.applyUpdate();
        });
      }
    }
  };
</script>

<style lang="scss">
  /*每个页面公共css */
  @import './styles/flex.scss';

  page {
    font-size: 14px;
    color: #333333;
    padding-bottom: env(safe-area-inset-bottom);
  }

  ::-webkit-scrollbar {
    display: none;
  }

  .text-color-primary {
    color: $primary;
  }

  .text-center {
    text-align: center;
  }

  .text-overflow {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .text-overflow-2 {
    @include text-overflow(2);
  }

  // 重置 button 样式，当做 div 使用
  .reset-btn {
    padding: 0;
    line-height: inherit;
    border-radius: 0;
    margin: 0;
    background-color: inherit;
    color: inherit;
    font-size: inherit;

    &::after {
      display: none;
    }
  }

  image {
    height: 0;
    vertical-align: top;
  }

  .disabled {
    pointer-events: none;
  }
</style>
