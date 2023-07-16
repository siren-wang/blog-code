---
date: 2021-05-20
category: Javascript
title: JS高级程序设计（红宝书）要点总结
cover: /images/professional-Javascript.png
tags:
  - 面试专题

---

> Professional Javascript for web developers.

<!-- more -->

## ECMAScript

Js诞生于1995年，是一种专为与网页交互而设计的脚本语言，由三个部分组成：

`ECMAScript`：提供 ==核心语言功能== 。

`DOM` (Document Object Model)：文档对象模型，是针对 XML 但经过扩展用于 HTML 的应用程序编程接口(API)，将整个页面抽象为一组分层节点，通过创建表示文档的树，让开发者可以随心所欲地控制网页的内容和结构。

`BOM` (Browser Object Model)：浏览器对象模型，提供与浏览器交互的方法和接口。<u>主要针对浏览器窗口和子窗口(frame)</u>。

![](..//images/esinjs.png)

> Web 浏览器只是 ECMAScript 实现可能存在的一种宿主环境（host environment）。其他宿主环境还有服务器端 JavaScript 平台 Node.js 和即将被淘汰的 Adobe Flash。



## \<script\>元素

现代 Web 应用程序通常将所有 JavaScript 引用放在 `<body>` 元素之**后**。

```js
// 动态加载脚本
let script = document.createElement('script'); 
script.src = 'gibberish.js'; 
document.head.appendChild(script);
```

### defer vs async
`defer` 与 `async` 属性都在后台进行下载，但是并不会阻止文档的渲染

`defer` 与 `async` 的区别：前者要等到整个页面正常渲染结束，才会执行；后者一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。另外，如果有多个defer脚本，会按照它们在页面出现的顺序加载，而多个async脚本是不能保证加载顺序的。

> 一句话，defer是“渲染完再执行”，async是“下载完就执行”。 

![](/images/script.png)

::: warning
异步脚本不应该在加载期间修改 DOM。
:::

::: details
**Async vs defer Infographic**

![Async vs defer Infographic](/images/async.png)

:::

## 语言基础

ECMAScript的语法大量借鉴了C及其他类C语言（如Java和Perl）的语法。

ES中的一切（变量、函数名、操作符）都区分大小写。



### 标识符规则

1. 第一个字符不能是数字;
2. 其他字符可以是字母、下划线、美元符号或数字。

### 原始类型与引用类型

Javascript 是一种 ==无类型语言== 。这意味着变量可以存储任何类型的数据。根据最新的 ECMAScript 标准，javascript 中有八种数据类型。

| Primitive values    | Object  (or) compound   |
| ------------- |:-------------:| -----:|
| string, number, bigint, boolean, undefined, symbol, and null  | Object, Arrays, Functions | 

> Symbol 是 ES6 引入了一种新的原始数据类型，表示独一无二的值。

![primative vs reference](/images/primativevsreference.png)

原始值（值类型、基本类型）是一种既非对象，也无方法的数据。原始值放在栈（stack）中，引用值放在堆（heap）中。

> 原始值可以被替换，但不能被直接改变。
> 
> **All primitives are immutable, i.e., they cannot be altered.** It is important not to confuse a primitive itself with a variable assigned a primitive value.

```js
// Using a string method doesn't mutate the string
var bar = "baz";
bar.toUpperCase();
console.log(bar);               // baz

// Assignment gives the primitive a new (not a mutated) value
bar = bar.toUpperCase();       // BAZ
```

将存储原始值的变量赋值给新变量时，会为该变量另分配一个地址存储原始值(make a copy)，而之前地址内的值还在。

> In case of primitive data, the actual value itself is stored in the variable. Since the primitive data are immutable, **any operation on it creates a new value and the old value in the variable is replaced.**

```javascript
let pika = 100;
let ditto = pika; //assign by value (copied)
ditto++;
console.log(pika); //100
console.log(ditto); //101

// Changing ditto doesn't affect pika at all. 
// when pika was assigned to ditto, ditto made a copy of pika. It's a copy.
```

要修改某个变量中的字符串值，必须先销毁原始的字符串，然后将包含新值的另一个字符串保存到该变量，如下所示：

```js
let lang = "Java"; 
lang = lang + "Script";
```

该过程首先会分配一个足够容纳 10 个字符的空间，然后填充上 "Java"和"Script"。最后销毁原始的字符串"Java"和字符串"Script"。



### typeof vs instanceof

`typeof` 操作符最适合用来判断一个变量是否为原始类型。

```js
// This stands since the beginning of JavaScript
typeof null === 'object';
```

 通过 `new` 操作符创建的 ==包装对象== 类型为object。

```js
// All constructor functions, with the exception of the Function constructor,
// will always be typeof 'object'
let str = new String('String');
let num = new Number(100);

typeof str; // It will return 'object'
typeof num; // It will return 'object'

let func = new Function();

typeof func; // It will return 'function'
```

::: tip
我们可以使用 `typeof` 来获取一个变量是否存在，如 `if(typeof a!="undefined"){alert("ok")}`

而不要去使用 ` if(a)` ，因为如果 a 不存在（未声明）则会出错。
:::



`instanceof` 操作符用来判断对象的类型（通过测试对象在其原型链中是否存在一个构造函数的 `prototype` 属性）。如果用 `instanceof` 检测原始值，则始终会返回 `false`，因为原始值不是对象。



#### Pass By Value

**ECMAScript 中所有函数的参数都是按值传递的。** 如果是原始值，那么就跟原始值变量的复制一样，如果是引用值，那么就跟引用值变量的复制一样。在按值传递参数时，值会被复制到一个局部变量（即一个命名参数，也就是 `arguments` 对象中的一个槽位）。

```javascript
function passByValue(ditto) {
  ditto++;
}
let pika = 100;
console.log(pika); // 100
passByValue(pika); // pika is copied to ditto i.e passed by value
console.log(pika); // 100
```

很多开发者错误地认为，当在局部作用域中修改对象而变化反映到全局时，就意味着参数是按引用传递的。我们来看看以下例子：

```js
function setName(obj) { 
 obj.name = "Nicholas"; 
 obj = new Object(); 
 obj.name = "Greg"; 
} 
let person = new Object(); 
setName(person); 
console.log(person.name); // "Nicholas" 
```

当 `obj` 在函数内部被重写时，它变成了一个指向本地对象的指针。而那个本地对象在函数执行结束时就被销毁了。

> ECMAScript 中函数的参数就是局部变量。



|  |   Var    | Let   | Const |
| ------------- |:-------------:| :-----:| :----: |
| Stored in Global Scope  | YES |  NO |  NO |
|Function Scope  |  YES |  YES  | YES |
|Block Scope | NO | YES | YES |
|Can Be Reassigned? | YES | YES | NO |
|Can Be Redeclared? | YES | NO | NO |
|Can Be Hoisted | YES | NO | NO |