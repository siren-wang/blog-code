---
date: 2021-11-16
category: Javascript
title: String()和new String()的区别——JS的包装对象
---

<!-- more -->

Javascript中三种基本包装类型：Boolean，Number，String。

当调用str.substring(0)  //"miya",实际上JS内部隐式的帮我们创建了一个包装对象，调用substring方法时候实际过程是：

```js
var a1 = new String("miya");
var a2 = a1.substring(0);
a1 = null;
console.log(a2);  //miya
```

隐式包装对象和自己显示创建的包装对象差别点在于：

对象的生存周期，你用new操作符创建的引用类型的实例，一直保存在内存中除非手动销毁，而浏览器隐式创建的包装对象只存在于你操作string，boolean，number原始值属性时候，用完即销毁，这样我们就不能手动为基本类型添加属性和方法了。