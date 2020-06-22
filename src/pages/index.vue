<template>
  <div class="page">
    <common-navbar title="beansmile" fixed />
    <div>home page</div>

    <common-button-fixed-bottom>
      <button>底部按钮</button>
    </common-button-fixed-bottom>
  </div>
</template>

<script>
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class Home extends Vue {


  }
</script>
