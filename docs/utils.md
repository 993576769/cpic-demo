# 目录
 - [storage](#storage)

### storage
支持对象和数组存储，使用作用域区分不同存储数据

普通对象式存储示例代码
```
// duration 过期时间，单位毫秒，为空表示不会自动过期清除
const storage = new Storage('存储作用域名称'， duration);
storage.add(key, data)  // 添加存储数据
storage.get(key)  // 获取对应存储数据
storage.remove(key)  // 删除对应存储数据
storage.clear()  // 情况当前存储作用域下，所有存储数据
storage.checkOverdue()  // 手动清除本地存储的过期数据，返回已过期数据
storage.overdueData  // new Storage 时，过期了的数据
```

数组存储实例代码
```
// maxLength 数组最大长度，默认 Infinity，超过最大长度的部分不会被存储
// duration 过期时间，单位毫秒，为空表示不会自动过期清除
// isRepeat 是否保存重复数据，默认 true
const storage = new ArrayStorage('存储作用域名称'， { maxLength, duration, isRepeat });
storage.get() // 获取整个数组数据

// 修改数据请使用以下方法，不要直接修改数据，清空数据请使用 splice 方法
storage.push()  // 对应数组原型方法
storage.pop()  // 对应数组原型方法
storage.shift()  // 对应数组原型方法
storage.unshift()  // 对应数组原型方法
storage.splice()  // 对应数组原型方法
storage.sort()  // 对应数组原型方法
storage.reverse()  // 对应数组原型方法
storage.checkOverdue()  // 手动清除本地存储的过期数据，返回已过期数据
storage.overdueData  // new ArrayStorage 时，过期了的数据
```
