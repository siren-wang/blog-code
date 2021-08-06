---
date: 2021-08-05
category: React
title: Optimizing Performance
tags:
  - 性能优化
---

> 组件的最佳写法应该是函数，而不是类。

<!-- more -->

## 使用生产版本

React 默认包含了许多有用的警告信息。这些警告信息在开发过程中非常有帮助。然而这使得 React 变得更大且更慢，所以你需要确保部署时使用了生产版本。

如果你不能确定你的编译过程是否设置正确，你可以通过安装 [Chrome 的 React 开发者工具](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) 来检查。如果你浏览一个基于 React 生产版本的网站，图标背景会变成深色：

[![React DevTools on a website with production version of React](https://zh-hans.reactjs.org/static/d0f767f80866431ccdec18f200ca58f1/0a47e/devtools-prod.png)](https://zh-hans.reactjs.org/static/d0f767f80866431ccdec18f200ca58f1/0a47e/devtools-prod.png)

如果你浏览一个基于 React 开发模式的网站，图标背景会变成红色：

[![React DevTools on a website with development version of React](https://zh-hans.reactjs.org/static/e434ce2f7e64f63e597edf03f4465694/0a47e/devtools-dev.png)](https://zh-hans.reactjs.org/static/e434ce2f7e64f63e597edf03f4465694/0a47e/devtools-dev.png)

推荐在开发应用时使用开发模式，而在为用户部署应用时使用生产模式。



## 虚拟化长列表

如果你的应用渲染了长列表（上百甚至上千的数据），我们推荐使用“虚拟滚动”技术。这项技术会在有限的时间内仅渲染有限的内容，并奇迹般地降低重新渲染组件消耗的时间，以及创建 DOM 节点的数量。

[react-window](https://react-window.now.sh/) 和 [react-virtualized](https://bvaughn.github.io/react-virtualized/) 是热门的虚拟滚动库。 它们提供了多种可复用的组件，用于展示列表、网格和表格数据。 如果你想要一些针对你的应用做定制优化，你也可以创建你自己的虚拟滚动组件，就像 [Twitter 所做的](https://medium.com/@paularmstrong/twitter-lite-and-high-performance-react-progressive-web-apps-at-scale-d28a00e780a3)。





https://zhuanlan.zhihu.com/p/120748634