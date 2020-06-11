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
        updateManager.onUpdateReady(async() => {
          await confirm('新版本已经准备好，是否重启应用？')
          updateManager.applyUpdate();
        })
      }
    }
  }
</script>

<style>
  /*每个页面公共css */
  Page {
    font-size: 14px;
    padding-bottom: env(safe-area-inset-bottom);
  }

  ::-webkit-scrollbar {
    display: none;
  }
</style>
