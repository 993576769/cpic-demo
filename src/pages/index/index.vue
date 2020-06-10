<template>
  <div class="page">home page</div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Index extends Vue {


}
</script>

<style lang="less" scoped>
  .page {
    color: @primary;
    .text-overflow;
    width: 100px;
  }
</style>
