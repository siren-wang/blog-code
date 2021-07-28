---
date: 2021-05-17
category: Javascript
title: Applicative Functor
---

JavaScript 的函数是*可调用*的，当 `hi` 后面紧跟 `()` 的时候就会运行并返回一个值；如果没有 `()`，`hi` 就简单地返回存到这个变量里的函数。

```js
// 太傻了
const getServerStuff = callback => ajaxCall(json => callback(json));

// 这才像样
const getServerStuff = ajaxCall;
```

```js
// 这行
ajaxCall(json => callback(json));

// 等价于这行
ajaxCall(callback);

// 那么，重构下 getServerStuff
const getServerStuff = callback => ajaxCall(callback);

// ...就等于
const getServerStuff = ajaxCall // <-- 看，没有括号哦
```