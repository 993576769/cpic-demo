# 目录

 - [兼容iPhoneX底部 button-fixed-bottom](#兼容iphonex底部-button-fixed-bottom)
 - [自定义导航 navbar](#自定义导航)
 - [自定义页面 custom-page](#自定义页面)
 - [添加到我的小程序 add-to-my-miniprogram](#添加到我的小程序)
 - [canvas生成海报 create-poster](#canvas生成海报)
 - [用户信息授权 auth-userinfo](#用户信息授权)
 - [Loading组件 loading-screen](#LoadingScreen)
 - [空列表 empty-view](#EmptyView)
 - [通告栏 notice-bar](#通告栏)
 - [加载更多列表](#加载更多列表)

### 兼容iPhoneX底部 button-fixed-bottom
- 需要定位在最底部的组件，使用`button-fixed-bottom` 组件包裹起来，自动会在`iPhone X`等设备添加底部保护区域
- 示例代码：
```html
<common-button-fixed-bottom>
  内容
</common-button-fixed-bottom>
```
#### 参数
| props   |  类型  | 默认值 | 描述 |
| :------ | :----: | :----: | :--- |
| bgColor | String |  #fff  | 颜色 |
| zIndex  | Number |   99   | 颜色 |

---

### 自定义导航

- 示例代码：

```html
<common-navbar title="beansmile" />
```

#### 参数

| props                |  类型   | 默认值  | 描述                     |
| :------------------- | :-----: | :-----: | :----------------------- |
| title                | String  |         | 标题                     |
| color                | String  | #141414 | 颜色                     |
| backgroundColor      | String  |  #fff   | 背景色                   |
| fixed                | Boolean |  false  | 是否固定在顶部           |
| placeholder          | Boolean |  true   | 固定在顶部时是否开启占位 |
| statusBarPlaceholder | Boolean |  true   | 是否留出状态栏高度       |
| border               | Boolean |  true   | 是否显示下边框           |
| zIndex               | Number  |  10001  | 层级                     |
| showBackButton       | Boolean |  false  | 是否显示返回             |
| backIcon             | String  |         | 返回按钮图片路径         |

#### 事件

| event  |       参数       | 描述               |
| :----- | :--------------: | :----------------- |
| back   |        /         | 点击返回按钮是触发 |
| ready  |        /         | 组件是否ready      |
| height | (height: Number) | 组件高度           |

---

### 自定义页面
- 示例代码：

```html
<common-custom-page :components="[]" />
```

### 参数

| props      | 类型  | 默认值 | 描述     |
| :--------- | :---: | :----: | :------- |
| components | Array |   []   | 组件列表 |

---

### 添加到我的小程序
- 示例代码：

```html
<common-add-to-my-miniprogram />
```

### 参数

| props        |  类型   |                 默认值                 | 描述                 |
| :----------- | :-----: | :------------------------------------: | :------------------- |
| text         | String  | 点击添加「我的小程序」，下次访问更便捷 | 引导提示             |
| duration     | Number  |                  6000                  | 弹层显示时间         |
| customNavbar | Boolean |                 false                  | 页面使用了自定义导航 |

### canvas生成海报
- 示例代码：

```html
<common-create-poster
  :width="300"
  :height="300"
  :config="config"
  @success="handleCreatePosterSuccess"
>
  <button>生成海报</button>
</common-create-poster>
```

### 参数

| props  |  类型  | 默认值 | 描述                         |
| :----- | :----: | :----: | :--------------------------- |
| width  | Number |  200   | 画布宽                       |
| height | Number |  200   | 画布高                       |
| config | Array  |   []   | 海报配置（见下面config配置） |

#### 事件

| event   |      参数      | 描述         |
| :------ | :------------: | :----------- |
| success | (图片data URI) | 生成图片完成 |

---

#### config配置
```javascript
[
  {
    type: 'draw',                    // 预设的不够用，自己画
    draw: Function: (ctx, config)
  },
  {
    type: 'image',
    top: Number,
    left: Number,
    width: Number,                   // 画到画布图片宽
    height: Number,                  // 画到画布图片高
    url: String,                     // 图片地址
    round: Number                    // 图片圆角大小
  },
  {
    type: 'text',
    top: Number,
    left: Number,
    text: String,                    // 文本
    fontSize: Number,                // 默认 20
    lineHeight: Number,              // 默认 fontSize * 1.5
    color: String,
    textAlign: String,
    baseline: String,
    maxWidth: Number,                // 默认 375, 画布画文本最长长度
    maxRow: Number,                  // 默认 10, 自动折行最大行数
    ellipsis: Boolean                // 默认true，文本显示不完是否显示'...'
  },
  {
    type: 'background',
    top: Number,
    left: Number,
    width: Number,                   // 背景宽
    height: Number,                  // 背景高
    color: String                    // 背景颜色
  },
  {
    type: 'arc',
    left: Number,                    // 圆心x
    top: Number,                     // 圆心y
    r: Number,                       // 圆半径
    width: Number,                   // 背景宽
    height: Number,                  // 背景高
    color: String                    // 背景颜色
  }
]
```

---

### 用户信息授权
- 示例代码：

```html
<common-auth-userinfo
  withCredentials
  @success="handleAuthSuccess"
>
  <div>授权</div>
</common-auth-userinfo>
```

### 参数

| props           |  类型   | 默认值 | 描述               |
| :-------------- | :-----: | :----: | :----------------- |
| withCredentials | Boolean | false  | 是否带上登录态信息 |
| disabled        | Boolean | false  | 禁用状态           |

#### 事件

| event   |                                             参数                                              | 描述         |
| :------ | :-------------------------------------------------------------------------------------------: | :----------- |
| success | { userInfo, rawData, signature, encryptedData, iv, code: 如果withCredentials = true会有code } | 获取信息完成 |

---

### LoadingScreen

#### 简介
全屏覆盖的 loading 组件，可以通过 css 调整 position 的相关坐标

- 示例代码：

```html
<div>
  <div>text</div>
  <common-loading-screen/>
</div>
```

```html
<div>
  <div>text</div>
  <common-loading-screen :prop-ctx-vid="vueId"/>
</div>
```

```javascript
export default {
   methods: {
     onFetch() {}
   }
}
```

#### 参数

| props         |  类型   |  默认值   | 描述                                                                                                  |
| :------------ | :-----: | :-------: | :---------------------------------------------------------------------------------------------------- |
| onFetch       | String  | 'onFetch' | fetch 函数，因为小程序传递函数有问题，这里传的是函数名，组件内部获取上一级作用域来调用对应的函数      |
| usedCustomNav | Boolean |   false   | 页面如果使用了自定义导航的话，需要传 true                                                             |
| propCtxVid    | String  |    ‘’     | 在组件中使用 loading 而不是页面中使用时，需要传递 vueId(uni 内置)，用作获取上一级作用域。页面可以不传 |

---

### EmptyView

#### 简介
空列表时展示

- 示例代码：

```html
<div>
  <common-empty-view v-if="list.isEmpty"/>
</div>
```

#### 参数

| props |  类型  |   默认值   | 描述     |
| :---- | :----: | :--------: | :------- |
| text  | String | '暂无数据' | 提示文本 |

### 通告栏
- 示例代码：

```html
<common-notice-bar
  text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
/>
```

### 参数

| props           |  类型  | 默认值  | 描述            |
| :-------------- | :----: | :-----: | :-------------- |
| text            | String |   ''    | 文字内容        |
| delay           | Number |    1    | 动画延迟时间(s) |
| speed           | Number |   50    | 滚动速率(px/s)  |
| color           | String | #ed6a0c | 文本颜色        |
| backgroundColor | String | #fffbe8 | 滚动条背景      |

---

### 加载更多列表

集成列表页下拉刷新和滚动加载更多，减少列表页面这部分的重复代码

##### 说明

Props

| props                 |  类型   |     默认值     | 描述                                                                                                                                 |
| :-------------------- | :-----: | :------------: | :----------------------------------------------------------------------------------------------------------------------------------- |
| storeName             | String  |       -        | 必填，需要继承了 `Collection` 的 `storeName`，详情看示例代码。注意，storeName 会一直向父级查找，一直找到为止，如果一直没找到会报错。 |
| emptyText             | String  |   '暂无数据'   | 为空时的文案，优先级低于`slot`                                                                                                       |
| loadingMoreText       | String  |  '加载中...'   | 加载中的文案，优先级低于`slot`                                                                                                       |
| noMoreText            | String  | '没有更多了 ~' | 没有更多数据时的文案，优先级低于`slot`                                                                                               |
| staticText            | String  | '上滑加载更多' | 默认静止时的文案，优先级低于`slot`                                                                                                   |
| refresherEnabled      | Boolean |     false      | 开启自定义下拉刷新                                                                                                                   |
| refresherThreshold    | Number  |       45       | 设置自定义下拉刷新阈值                                                                                                               |
| refresherDefaultStyle | String  |    'black'     | 设置自定义下拉刷新默认样式，支持设置 `black`、`white`、`none`， `none` 表示不使用默认样式                                            |
| refresherBackground   | String  |     '#FFF'     | 设置自定义下拉刷新区域背景颜色                                                                                                       |
| lowerThreshold        | Number  |       50       | 距离底部多少时触发滚动加载更多                                                                                                       |

Slot:

| slot        | 描述                                                           |
| :---------- | :------------------------------------------------------------- |
| default     | 列表里面的显示内容                                             |
| empty       | 列表为空时显示的内容，优先级高于`props`                        |
| staticMore  | 默认状态，提示用户可以滚动加载时显示的内容，优先级高于`props`  |
| loadingMore | 加载中状态，显示正在加载 的内容，优先级高于`props`             |
| noMore      | 全部加载完成状态，显示没有更多数据了 的内容，优先级高于`props` |

实例代码：
```js
// template
// 注意，这里的 storeName 的字符串，对应 js 中 new Collection 或者是继承了 Collection 的字段名
// storeName 会一直往父级查找，如果找不到就会报错
<common-list-page storeName="store">
  <div>列表显示的主要内容</div>
  <div slot="empty">empty</div>
  <div slot="staticMore">上滑加载更多</div>
  <div slot="loadingMore">加载中...</div>
  <div slot="noMore">没有更多了</div>
</common-list-page>

// js
import { Collection } from '@/stores';

class ListPage extends Vue {
  // 这里的 store 对应组件 Props 中的 storeName
  store = new Collection({
    fetch() {
      // ....
    }
  })
}
```
