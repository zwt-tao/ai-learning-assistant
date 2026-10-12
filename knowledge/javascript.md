# JavaScript 基础

## 变量与数据类型

JavaScript 有三种声明变量的关键字：var、let、const。var 是旧写法，作用域混乱，现在基本不用。let 用于可变变量，const 用于不可重新赋值的变量。常见数据类型包括字符串、数字、布尔值、对象、数组和 null。

## 函数

函数是一段可重复执行的代码。普通函数用 function 关键字声明，箭头函数用 => 语法。函数可以接收参数并返回值。在现代 JavaScript 中，函数是一等公民，可以作为参数传递，也可以作为返回值。

## 异步编程

JavaScript 是单线程语言，通过事件循环处理异步任务。Promise 是异步操作的对象，有 pending、fulfilled、rejected 三种状态。async/await 是 Promise 的语法糖，让异步代码看起来像同步代码。常见的异步场景包括网络请求、文件读取和定时器。

## 数组方法

数组有很多实用方法：map 遍历并返回新数组，filter 过滤元素，find 查找第一个匹配项，reduce 累加计算。这些方法都不会修改原数组，而是返回新结果。

## DOM 操作

浏览器提供 document 对象操作页面。getElementById 按 ID 查找元素，querySelector 按 CSS 选择器查找。修改元素的 textContent 或 innerHTML 可以改变页面内容。addEventListener 用于绑定事件，比如点击、输入、键盘事件。

## 错误处理

try/catch 用于捕获运行时错误。try 块放可能出错的代码，catch 块处理错误，finally 块无论是否出错都会执行。throw 用于主动抛出错误。
