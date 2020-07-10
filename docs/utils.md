# 目录
 - [storage](#storage)
 - [检查并调用手机权限](#检查并调用手机权限)
 - [保存图片或视频到本地相册](#保存图片或视频到本地相册)
 - [nav](#nav)

### storage
支持对象和数组存储，使用作用域区分不同存储数据

普通对象式存储示例代码
``` javascript
// duration 过期时间，单位毫秒，为空表示不会自动过期清除
const storage = new Storage('存储作用域名称'， duration);
storage.add(key, data)             // 添加存储数据
storage.get(key)                   // 获取对应存储数据
storage.remove(key)                // 删除对应存储数据
storage.clear()                    // 情况当前存储作用域下，所有存储数据
storage.checkOverdue()             // 手动清除本地存储的过期数据，返回已过期数据
storage.overdueData                // new Storage 时，过期了的数据
```

数组存储实例代码
``` javascript
// maxLength 数组最大长度，默认 Infinity，超过最大长度的部分不会被存储
// duration 过期时间，单位毫秒，为空表示不会自动过期清除
// isRepeat 是否保存重复数据，默认 true
const storage = new ArrayStorage('存储作用域名称'， { maxLength, duration, isRepeat });
storage.get()                      // 获取整个数组数据

// 修改数据请使用以下方法，不要直接修改数据，清空数据请使用 splice 方法
storage.push()                     // 对应数组原型方法
storage.pop()                      // 对应数组原型方法
storage.shift()                    // 对应数组原型方法
storage.unshift()                  // 对应数组原型方法
storage.splice()                   // 对应数组原型方法
storage.sort()                     // 对应数组原型方法
storage.reverse()                  // 对应数组原型方法
storage.checkOverdue()             // 手动清除本地存储的过期数据，返回已过期数据
storage.overdueData                // new ArrayStorage 时，过期了的数据
```

---

### 检查并调用手机权限
说明：使用手机权限每次都要判断用户是否拒绝相关权限，所以统一封装了起来

参数说明：
checkApiAuth(scope, [options], [isAuto]);

| 参数    | 是否必填 | 类型      | 默认值 | 说明                                                         |
| :------ | :------: | :-------- | :----: | :----------------------------------------------------------- |
| scope   |    是    | `String`  |   -    | 需要调用的小程序接口函数                                     |
| options |    否    | `Object`  |   {}   | 调用小程序函数需要传递的参数                                 |
| isAuto  |    否    | `Boolean` |  true  | 是否自动调用，传递`false`只检查权限，不自动调用小程序对应API |

示例代码：
```js
import { checkApiAuth } from '@/utils';


// 操作事件
async handleClick() {
  const res = await checkApiAuth('chooseAddress');
}
```

---

### 保存图片或视频到本地相册
说明：保存图片或视频到本地相册，支持小程序本地链接和网络链接。

参数说明：
saveFiles(urls, [mediumType]);

| 参数        | 是否必填 | 类型             | 默认值 | 说明                                    |
| :---------- | :------: | :--------------- | :----: | :-------------------------------------- |
| urls        |    是    | `String`或`Array` |   -    | 媒体文件本地链接或网络链接              |
| mediumType |    否    | `String`         | image  | `image` 或 `video`，默认`image`保存图片 |

示例代码：
```js
import { saveFiles } from '@/utils';

// 操作事件
async handleClick() {
  await saveFiles('http://xxx.xxx.com/xxx.jpg');
  showToast('保存成功');
}
```

---

### nav
nav 对象把 uni 里路由相关的 api 进行了封装(https://uniapp.dcloud.io/api/router)
参数传递和文档一致

#### navigateto
navigateto 新增了一个参数(params: Object)，用于传递路由参数，参数可包含函数

跳转到新页面例子
```javascript
this.$nav.navigateto({
  url: '/pages/extra/web-site', // url 上不要加参数
  params: {
    src: 'https://xxx',
    on_message: data => null
  }
})
```

新页面调用路由上的函数，可以参考[这里](../src/pages/extra/web-site.vue#L27)
```javascript
this.$nav.dispatchRouteEvent('路由参数上 on_message 的值', data)
```
