# 目录

 - [小程序全局分享 onShareAppMessage](#小程序全局分享)

# 小程序全局分享
通过 mixin 定义了 [onShareAppMessage](../src/mixins/index.js#L5)，全局生效

页面自定义分享时，声明 onShareAppMessage 即可，会覆盖 mixin 的

mixin 提供了 $mergeShareAppMessage 的方法
```javascript
this.$mergeShareAppMessage({ title, path, imageUrl }) // return { title, path, imageUrl }
```
参数参考 https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onShareAppMessage-Object-object

没有传的参数会使用默认的, 页面自定义分享时可使用
