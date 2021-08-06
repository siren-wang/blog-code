---
date: 2021-08-05
category: React
title: Optimizing Performance
tags:
  - 性能优化

---

> `PureComponent`相比于`Component`，在`shouldComponentUpdate`阶段多了一层浅比较。

<!-- more -->

浅比较就是只比较第一级，对于基本数据类型，只比较值；对于引用数据类型值，直接比较地址是否相同，不管里面内容变不变，只要地址一样，我们就认为没变。



PureComponent不能乱用，只有那些状态和属性不经常的更新的组件我们用来做优化，对于经常更新的，这样处理后反而浪费性能，因为每一次浅比较也是要消耗时间的

https://juejin.cn/post/6844903982683389965