---
date: 2021-07-08
category: Javascript
title: Typescript
---

> 除了 never 本身以外，其他任何类型不能赋值给 never

<!-- more -->

## Never 与 void

当一个函数返回空值时，它的返回值为 void 类型，但是，当一个函数永不返回时（或者总是抛出错误），它的返回值为 never 类型。void 类型可以被赋值（在 strictNullChecking 为 false 时），但是除了 never 本身以外，其他任何类型不能赋值给 never。

