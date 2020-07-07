# 目录
 - [介绍](#介绍)
 - [例子](#例子)
 - [事件清除](#事件清除)

# 介绍
存放各类 api 请求的 vue 对象。可以在 api 请求后触发对应的函数名事件

# 例子
* 创建一篇文章
``` javascript
// 封装 api 请求函数
class Service extends Vue {
  // [Emit](https://github.com/kaorun343/vue-property-decorator#Emit)
  // 监听名为 ‘create-post’ 的事件，它会把函数名的中横线命名作为事件名
  @Emit()
  async createPost() {
    const res = await this.$request.post('posts', {});
    return res.data;
  }

  // 封装 $on 的方法(已内置)
  subscribe(name, handle, auto_clear) {
    // 通过 this.$on 来订阅，name 会转为中横线命名，为了和 @Emit 对应
  }

  // 封装 $emit 的方法(已内置)
  dispatchEvent(name, ...args) {
    // 手动触发订阅消息，下面是例子
  }

  async createPost() {
    const res = await this.$request.post('posts', {});
    this.dispatchEvent('createPost', res.data)
  }
}

// 在页面或者 store 可以监听 api 的事件(如果有)
service.subscribe('createPost', post => {
  console.warn(post)
})

// 在文章表单调用 api 请求
service.createPost()
```

* 收藏一篇文章
``` javascript
// 封装 api 请求函数
class Service extends Vue {
  async collectPost(post) {
    await this.$request.post('collect', {});
    // 触发订阅消息 collect-post
    this.dispatchEvent('collectPost', post)

    // 触发订阅消息 collect-post:posts:1
    this.dispatchEvent({ event: 'collectPost', model: post }, post)

   // 下面看一下这两者的区别
  }
}

// 在页面或者 store 可以监听 api 的事件(如果有)
service.subscribe('collectPost', post => {
  // 这里的 post 是不定的，既可能是 id 1 的post，也可能是 id 2 的post
})

service.subscribe({ event: 'collectPost', model: model }, post => {
  // 这里的 post 和传进去的 model 有对应的关系(并不是说相等 ===)
  // model 的对象需要包含两个属性(id, tn)
  // 那么监听的事件名就会变成 collect-post:${tn}:${id}
})
```

# 事件清除
subscribe 订阅的事件，会在页面销毁后自动清除。如果是永久监听的事件，需要把参数 auto_clear 设为 false
