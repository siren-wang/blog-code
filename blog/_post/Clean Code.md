---
date: 2021-06-02
category: Principles
title: Clean Code 代码简洁之道
---

> 比起命令式，函数式变编程可以让代码的逻辑更清晰更优雅，方便测试。

<!-- more -->

## 函数式编程

比起命令式，函数式变编程可以让代码的逻辑更清晰更优雅，方便测试。

```javascript
const programmerOutput = [
  {
    name: 'Uncle Bobby',
    linesOfCode: 500
  }, {
    name: 'Suzie Q',
    linesOfCode: 1500
  }, {
    name: 'Jimmy Gosling',
    linesOfCode: 150
  }, {
    name: 'Gracie Hopper',
    linesOfCode: 1000
  }
];

// Bad
let totalOutput = 0;
for (let i = 0; i < programmerOutput.length; i++) {
  totalOutput += programmerOutput[i].linesOfCode;
}

// Good
let totalOutput = programmerOutput
  .map(output => output.linesOfCode)
  .reduce((totalLines, lines) => totalLines + lines, 0)
```



### 不要过度优化

现代浏览器已经在底层做了很多优化，过去的很多优化方案都是无效的，会浪费你的时间。 [Optimization Killers](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fpetkaantonov%2Fbluebird%2Fwiki%2FOptimization-killers)

```javascript
// 在老的浏览器中，由于 `list.length` 没有做缓存，每次迭代都会去计算，造成不必要开销。
// 现代浏览器已对此做了优化。
// Bad
for (let i = 0, len = list.length; i < len; i++) {
  // ...
}

// Good
for (let i = 0; i < list.length; i++) {
  // ...
}
```



## SOLID





https://juejin.cn/post/6844903751837286408#heading-34