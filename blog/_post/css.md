---
date: 2021-06-02
category: CSS
title: CSS 高频考点
---

> flex:  flex-grow  flex-shrink  flex-basis

<!-- more -->

## flex: 0 1 auto

三个参数分别对应的是 flex-grow, flex-shrink 和 flex-basis，默认值为0 1 auto。
1.flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
2.flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
3.flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。



## z-index

> `z-index` 属性设定了一个**定位元素**及其**后代元素**或 flex 项目的 z-order。 

`z-index` 属性指定：

1. 盒子在当前堆叠上下文中的堆叠层级。
2. 盒子是否创建一个本地堆叠上下文。

```javascript
/* 字符值 */
z-index: auto;

/* 整数值 */
z-index: 0;
z-index: 3;
z-index: 289;
z-index: -1;/* 使用负值降低优先级 */

/* 全局值 */
z-index: inherit;
z-index: initial;
z-index: unset;
```

区分

1. `z-index: auto`
2. `z-index: 0`
3. no `z-index` at all

Not specifying `z-index` is the same as `z-index: auto;` that is its initial value.

About `z-index: 0` it's important to note the following:

`z-index: 0` creates a stacking context while `z-index: auto` do not. 

Check [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context) for more information.

