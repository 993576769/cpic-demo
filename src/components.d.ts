/**
 * 目前使用 uni-app easycom 自动导入组件, 但这种方式 TS 无法自动推断类型, 所以加入全局组件的类型定义
 * 如果 easycom 目录下新增了组件, 需要在 GlobalComponents 下面加上新增的组件, 否则无法正确推断组件类型
*/
import '@vue/runtime-core'

export {}

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    CommonExample: typeof import('@/components/common/example.vue')['default']
    // ...
  }
}
