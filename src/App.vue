<script lang="ts" setup>
const updateManager = uni.getUpdateManager();

updateManager.onUpdateReady(async () => {
  // TODO
  // await confirm('新版本已经准备好，是否重启应用？');
  updateManager.applyUpdate();
});
</script>
