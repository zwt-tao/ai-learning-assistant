# Vue3 基础

## Vue 是什么

Vue 是一个用于构建用户界面的渐进式 JavaScript 框架。Vue3 是第三个主要版本，采用 Composition API，代码组织更灵活。Vue 的核心思想是数据驱动视图：数据变了，页面自动更新，不需要手动操作 DOM。

## ref 与响应式

ref 用于创建响应式数据。用 ref 包裹一个值后，修改它的 .value 属性，页面会自动重新渲染。在模板中不需要写 .value，Vue 会自动解包。reactive 用于对象类型的响应式，但 ref 更通用。

## 模板语法

Vue 模板中用双大括号 {{ }} 输出变量。v-bind 绑定属性，简写为冒号。v-on 绑定事件，简写为 @。v-if 控制元素是否渲染，v-show 控制元素显示隐藏。v-for 遍历列表，v-model 实现表单双向绑定。

## 组件

组件是 Vue 的基本构建块。每个组件有自己的模板、逻辑和样式。组件通过 props 接收父组件数据，通过 emit 向父组件发送事件。App.vue 是根组件，可以引入其他子组件。

## 生命周期

组件从创建到销毁经历多个阶段：setup 是 Composition API 的入口，onMounted 在组件挂载到页面后执行，onUnmounted 在组件销毁前执行。常见的副作用请求放在 onMounted 中。

## 计算属性与侦听器

computed 用于根据依赖自动计算派生值，有缓存。watch 用于监听某个数据变化后执行副作用。watchEffect 立即执行一次，并自动追踪依赖。

## Axios 与 HTTP

Axios 是常用的 HTTP 请求库。get 请求获取数据，post 请求发送数据。响应对象的 data 属性是后端返回的实际数据。async/await 配合 try/catch 处理异步请求和错误。
