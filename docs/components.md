# 目录

 - [兼容iPhoneX底部 button-fixed-bottom](#兼容iPhoneX底部-button-fixed-bottom)
 - [自定义导航 navbar](#自定义导航)
 - [自定义页面 custom-page](#自定义页面)
 - [添加到我的小程序 add-to-my-miniprogram](#添加到我的小程序)
 - [canvas生成海报 create-poster](#canvas生成海报)
 - [用户信息授权 auth-userinfo](#用户信息授权)

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

| props   |  类型  | 默认值 | 描述 |
| :------ | :----: | :----: | :--- |
| title | String |    | 标题 |
| color  | String |   #141414   | 颜色 |
| backgroundColor  | String |   #fff   | 背景色 |
| fixed  | Boolean |   false   | 是否固定在顶部 |
| placeholder  | Boolean |   true   | 固定在顶部时是否开启占位 |
| statusBarPlaceholder  | Boolean |   true   | 是否留出状态栏高度 |
| border  | Boolean |   true   | 是否显示下边框 |
| zIndex  | Number |   10001   | 层级 |
| showBackButton  | Boolean |   false   | 是否显示返回 |
| backIcon  | String |     | 返回按钮图片路径 |

#### 事件

| event   |  参数  | 描述 |
| :------ | :----: | :--- |
| back | / |  点击返回按钮是触发 |
| ready | / |  组件是否ready |
| height | (height: Number) | 组件高度 |

---

### 自定义页面
- 示例代码：

```html
<common-custom-page :components="[]" />
```

### 参数

| props   |  类型  | 默认值 | 描述 |
| :------ | :----: | :----: | :--- |
| components | Array |  []  | 组件列表 |

---

### 添加到我的小程序
- 示例代码：

```html
<common-add-to-my-miniprogram />
```

### 参数

| props   |  类型  | 默认值 | 描述 |
| :------ | :----: | :----: | :--- |
| text | String |  点击添加「我的小程序」，下次访问更便捷  | 引导提示 |
| duration | Number | 6000 | 弹层显示时间 |
| customNavbar | Boolean | false | 页面使用了自定义导航 |

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

| props   |  类型  | 默认值 | 描述 |
| :------ | :----: | :----: | :--- |
| width | Number |  200  | 画布宽 |
| height | Number | 200 | 画布高 |
| config | Array | [] | 海报配置（见下面config配置） |

#### 事件

| event   |  参数  | 描述 |
| :------ | :----: | :--- |
| success | (图片data URI) |  生成图片完成 |

---

#### config配置
```javascript
[
  {
    type: 'draw', // 预设的不够用，自己画
    draw: Function: (ctx, config)
  },
  {
    type: 'image',
    top: Number,
    left: Number,
    width: Number, // 画到画布图片宽
    height: Number, // 画到画布图片高
    url: String, // 图片地址
    round: Number // 图片圆角大小
  },
  {
    type: 'text',
    top: Number,
    left: Number,
    text: String, // 文本
    fontSize: Number, // 默认 20
    lineHeight: Number, // 默认 fontSize * 1.5
    color: String,
    textAlign: String,
    baseline: String,
    maxWidth: Number, // 默认 375, 画布画文本最长长度
    maxRow: Number, // 默认 10, 自动折行最大行数
    ellipsis: Boolean // 默认true，文本显示不完是否显示'...'
  },
  {
    type: 'background',
    top: Number,
    left: Number,
    width: Number, // 背景宽
    height: Number, // 背景高
    color: String // 背景颜色
  },
  {
    type: 'arc',
    left: Number, // 圆心x
    top: Number, // 圆心y
    r: Number, // 圆半径
    width: Number, // 背景宽
    height: Number, // 背景高
    color: String // 背景颜色
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

| props   |  类型  | 默认值 | 描述 |
| :------ | :----: | :----: | :--- |
| withCredentials | Boolean |  false  | 是否带上登录态信息 |
| disabled | Boolean | false | 禁用状态 |

#### 事件

| event   |  参数  | 描述 |
| :------ | :----: | :--- |
| success | { userInfo, rawData, signature, encryptedData, iv, code: 如果withCredentials = true会有code } | 获取信息完成  |
