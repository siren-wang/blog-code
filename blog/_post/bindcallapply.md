---
date: 2021-04-18
category: Javascript
title: 手写底层 —— New、Call、Bind等
cover: /images/bind.png
tags:
  - 面试专题
---

## New

```javascript
function myNew(Con, args){
	let obj = {};  // const obj = Object.create({});
	Object.setPrototypeOf(obj, Con.prototype);  //obj.__prototype__ = con.prototype;
	let result = Con.call(obj, args);
    // 在构造函数有返回值的情况进行判断
	return typeof result === 'object'? result : obj;
}
```

> `Object.create({})` 和 `new Object()` 的区别：两者都是创建空对象，但是 new 创建出的空对象会绑定 Object 的 prototype 原型对象，但是 `Object.create({})` 的空对象是没有任何属性的。


## Call

1. 为 context 扩展一个属性，将原函数指向该属性。
2. 将其他所有参数传递给这个新属性（函数），返回运行结果。

```javascript
Function.prototype.myCall = function(context, ...args){
	//context存在 默认window对象
	context = context && typeof context === 'object'? context : window;
	//防止覆盖原属性
	const key = Symbol();
	//this为方法
	context[key] = this;
	const result = context[key](...args);
	delete context[key];
	return result;
}
```

## Apply

```javascript
Function.prototype.myApply = function(context, args = []){
	context = context && typeof context === 'object'? context : window;
	const key = Symbol();
	context[key] = this;
	const result = context[key](...args);
	delete context[key];
	return result;
}
```

## Bind

* 输入：接受一个或者多个参数，第一个是要绑定的上下文，额外参数当作绑定函数的**前置参数**。
* 输出：返回原函数的**拷贝**，即返回一个函数，这个函数具备原函数的功能.
* 实现：利用闭包和 `call` 。

```javascript
Function.prototype.myBind = function(context, ...args){
	let self = this;
	let fn = function(...args2){
		self.apply(this instanceof fn? this : context, [...args, ...args2]);
	}
	fn.prototype = object(self.prototype);  //保护
	return fn;
}
```

### `that = this` 

```javascript
var a = {
    b : function(){
        var func = function(){
            console.log(this.c);
        }
        func();
    },
    c : 'Hello!'
}
a.b();
//undefined
//this指向b

var a = {
    b : function(){
        var that = this;
        var func = function(){
            console.log(that.c);
        }
        func();
    },
    c : 'Hello!'
}
a.b();
//Hello!
//可以通过赋值的方式将this赋值给that

var a = {
    b : function(){
        var func = function(){
            console.log(this.c);
        }.bind(this);
        func();
    },
    c : 'Hello!'
}
a.b();
//Hello!
 
var a = {
    b : function(){
        var func = function(){
            console.log(this.c);
        }
        func.bind(this)();
    },
    c : 'Hello!'
}
a.b();
//Hello!
```

### 函数柯里化

柯里化(Currying)又称部分求值，是分步处理参数的过程。currying的函数首先会接受一些参数，接受了这些参数之后，该函数不会立即求值，而是继续返回另外一个函数，刚才传入的参数在函数形成的闭包中被保存起来。待到函数被真正求值的时候，之前传入的所有参数都会被一次性用于求值。

```javascript
function f(y, z){
    return this.x + y + z;
}
var m = f.bind({x : 1}, 2);
console.log(m(3));
//6
```

## Promise

实现以下 Promise 使用：

```js
const p1 = new Promise((resolve, reject) => {
  console.log('create a promise');
  resolve('成功了');
})
```

通过IIFE（立即执行函数）实现

```javascript
const MyPromise = (function(){
	const PromiseStatus = Symbol('PromiseStatus'),
		  PromiseValue = Symbol('PromiseValue');

	const _PENDING = 'pending';
	const _FULFILLED = 'fulfilled';
	const _REJECTED = 'rejected';

	const fulFilledList = Symbol('fulFilledList'),
		  rejectedList = Symbol('rejectedList');

	let that = null;

	const settleHandler = (_status, handler, queue) => {
		if(that[PromiseStatus] === _status){
			setTimeout(() => handler(that[PromiseValue]), 0);
		}else{
			queue.push(handler);
		}
	}

	const changePromiseStatus = (_status, _result) => {
		//Promise的状态一旦改变就不可以进行逆转, 所以我们必须确定当前阶段不是已决
		if( that[PromiseStatus] != _PENDING) return;
		that[PromiseStatus] = _status;
		that[PromiseValue] = _result;
		
		if(that[PromiseStatus] == _FULFILLED){
			that.fulFilledList.forEach((ele) => { ele(that[PromiseValue]); });
		}else{
			that.rejectedList.forEach((ele) => { ele(that[PromiseValue]); });
		}
	}
	const resolve = _data => {
		changePromiseStatus(_FULFILLED, _data);
	}

	const reject = _error => {
		changePromiseStatus(_REJECTED, _error);
	}
	return class MyPromise {
		constructor(executor){
			that = this;
			this[PromiseStatus] = _PENDING;
			this[PromiseValue] = undefined;
			this[fulFilledList] = [];
            this[rejectedList] = [];
			try{
				executor(resolve, reject);
			}
			// 如果我们在executor中报错, 则会直接触发reject从而进入rejected状态
			catch(err){
				reject(err);
			}	
		}

		then = (thenable, catchable) => {
			settleHandler(_FULFILLED, thenable, this[fulFilledList]);
			//a() && b() 如果 a 执行成功返回 true 则执行 b 返回 b 结果的值
			typeof catchable === 'function' &&  this.catch(catchable);
		}	

		catch = catchable => {
			settleHandler(_REJECTED, catchable, this[rejectedList]);
		}

	}
})();
```

## Promise.all

```javascript
function promiseAll(promises){
	if(!Array.isArray(promises)){
		throw new Error("Params must be an array!");
	}
	return new Promise((resolve, reject) => {
		let asyncLength = promises.length;
		let count = 0;
		let resArray = new Array(asyncLength);
		promises.forEach((item, index) => {
			Promise.resolve(item)
			.then((value) => {
				count++;
				resArray[index] = value;
				if(count==asyncLength){
					resolve(resArray);
				}
			})
			.catch((error) => {
				reject(error);
			})
		})
		
	})
}
```


## Promise.race

```javascript
function promiseRace(promises){
	if(!Array.isArray(promises)){
		throw new Error("Params must be an array!");
	}
	return new Promise((resolve, reject) => {
		promises.forEach((item) => {
			Promise.resolve(item)
			.then((value) => {
				resolve(value);
			})
			.catch((error) => {
				reject(error);
			})
		})
		
	})
}
```

## async/await

`Generator` 缺陷：

* 函数外部无法捕获异常
* 多个 yield 会导致调试困难

`async` 函数对 `Generator` 函数改进如下：

* 内置执行器
* 更好的语义
* 更广的适用性
* 返回值是 Promise

> `async/await` 做的事情就是将 `Generator` 函数转换成 `Promise`。说白了，async 函数就是 Generator 函数的语法糖，await 命令就是内部 then 命令的语法糖。