# 简介
model(数据模型) 作用类似于旧项目的 xxxStore，但是没有 find、findOrCreate 这类 api，只有 new 的创建方法

model 不是状态管理，这一点要和全局 store 区分

model 以 @vuex-orm/core 的 api 来构建，目前只引入了 Model 的模块，状态管理和 vuex 均没有引入

# 以文章（POST）为例子，声明一个 Model
所有 Model 都需要继承 models/record.js （Record 已经继承了 @vuex-orm/core/Model，按照官方文档所有自定义Model 都要继承 @vuex-orm/core/Model）

可参考文档(https://vuex-orm.org/guide/model/defining-models.html)
```javascript
class Post extends Record {
  static fields() {
    return {
      ...super.fields(),
      title: this.attr(''),
      description: this.attr(''),
      user_id: this.attr(null),
      user: this.belongsTo(User, 'user_id'),
    }
  }

  get share_config() {}
  get is_my_post() {}
}
```

fields 的声明主要是字段、和其他 Model 进行关联的声明，没有声明的字段不会出现在实例上(后面会有不声明字段的解决方法)

getter 的声明相当于 vue 的 computed

# api 请求
Post.api() 会返回 request 的对象，通过 request 请求的数据，会变成 Post 的实例
```javascript
Post.api().get('posts/1').then(res => {
  // res.data => Post
})

Post.api().get('posts').then(res => {
  // res.data => [Post, Post]
})
```

# 文章列表页例子
```javascript
export default {
  data(){
    return {
      posts: this.$Collection({
        fetch: params => Post.api().get('posts', params),
      })
    }
  }
}
```

# 文章详情页例子
```javascript
export default {
  data(){
    return {
      post: new Post
    }
  },
  methods: {
    onLoad(){
      Post.api().get('posts/1').then(res => this.post = res.data)
    }
  }
}
```

# 更新文章例子
更新尽量使用 updateAttrs 方法，单纯的 Object.assign 可能会把关联 model 给覆盖

updateAttrs 尽量传递[普通对象](https://www.html.cn/doc/lodash/#_isplainobjectvalue)，而非 Model
```javascript
export default {
  data(){
    return {
      post: new Post
    }
  },
  methods: {
    onLoad(){
      Post.api().get('posts/1').then(res => this.post = res.data)
    },
    
    submit() {
      this.post.api().put('posts/1')
      // 或者
      this.$request.put('posts/1').then(res => this.post.updateAttrs(res.data))
    }
  }
}
```

# 监听事件来更新数据
需要用到[service](./service.md)的 api
```javascript
class Post extends Record {
  static fields() {
    // .......  
  }

  constructor(record) {
    super(record)
    if (this.id) {
      service.subscribe({ event: 'updatePost', model: record }, attrs => {
        this.updateAttrs(attrs)
      })
    }
  }
}
```
```javascript
// src/service/index.js
class Service extends Vue {
  updatePost() {
    // ...
    this.$emit(this.buildEventName({ event: 'updatePost', model: post }), newPost)
  }
}
```

# 未声明字段处理
Record 类已自动处理了这个场景
```javascript
// src/models/record.js
export default class Record extends Model {
  constructor(record) {
    super(record)
    // 如果 record 中的字段不在 this 上，会自动赋值进去
    // 对于对象、数组的字段，建议在 fields 里声明初始值，防止字段为空
  }
}
```
