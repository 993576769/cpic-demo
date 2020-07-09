<template>
  <div class="page">
    <common-navbar title="beansmile" fixed />
    <div>home page</div>

    <common-add-to-my-miniprogram custom-navbar />

    <img :src="poster" v-if="poster" style="width: 100%;" mode="widthFix" />

    <common-notice-bar
      text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
    />

    <common-create-poster
      :width="300"
      :height="300"
      :config="config"
      @success="handleCreatePosterSuccess"
    >
      <button>生成海报</button>
    </common-create-poster>

    <common-auth-userinfo
      withCredentials
      @success="handleAuthSuccess"
    >
      <div>授权</div>
    </common-auth-userinfo>
    <common-list-page :store="store" storeName="store">
      <div class="lis">列表数据</div>
      <div slot="loadMore">load more</div>
      <div slot="empty">empty</div>
      <div slot="noMore">no more</div>
    </common-list-page>

    <common-button-fixed-bottom>
      <button>底部按钮</button>
    </common-button-fixed-bottom>
  </div>
</template>

<script>
  import { Vue, Component } from 'vue-property-decorator';
  import { Collection } from '@/store';

  @Component
  export default class Home extends Vue {
    config = [
      {
        type: 'text',
        top: 0,
        left: 0,
        text: '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
        maxRow: 2,
        maxWidth: 300,
        fontSize: 20,
        color: 'red'
      },
      {
        type: 'background',
        color: 'red',
        top: 0,
        left: 0,
        width: 200,
        height: 200
      },
      {
        type: 'arc',
        color: 'green',
        r: 50,
        top: 100,
        left: 100
      },
      {
        type: 'image',
        url: require('@/static/logo.png'),
        left: 0,
        top: 0,
        width: 100,
        height: 100,
        round: 50
      }
    ]

    poster = '';

    store = new Collection({
      fetch() {
        // return Promise.resolve();
      }
    })

    handleCreatePosterSuccess(img) {
      this.poster = img;
    }

    handleAuthSuccess(e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }

  }
</script>
