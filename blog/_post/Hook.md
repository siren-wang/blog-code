---
date: 2021-07-26
category: React
title: React Hooks
sidebar: auto
cover: /images/react-hooks-best-practices-lead_.jpeg
---

> 组件的最佳写法应该是函数，而不是类。

<!-- more -->
# Hook API

> *Hook* 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。
>
> *Hooks* are a new addition in React 16.8. They let you use state and other React features without writing a class.

**Hooks allow you to reuse stateful logic without changing your component hierarchy.** 



### 类组件与函数组件

Redux 的作者 Dan Abramov [总结](https://medium.com/@dan_abramov/making-sense-of-react-hooks-fdbde8803889)了组件类的几个缺点：

- 大型组件很难拆分和重构，也很难测试。
- 业务逻辑分散在组件的各个方法之中，导致重复逻辑或关联逻辑。
- 组件类引入了复杂的编程模式，比如 render props 和高阶组件。

组件不要变成复杂的容器，最好只是数据流的管道。开发者根据需要，组合管道即可。 **组件的最佳写法应该是函数，而不是类。**

> React Hooks 的设计目的，就是加强版函数组件，完全不使用"类"，就能写出一个全功能的组件。



### useState

状态钩子。有时候我们也叫它 “State Hook”。它让我们在 React 函数组件上添加内部 state。

```javascript
import React, { useState } from 'react';

function Example() {
  // Declare a new state variable
  // "Array Destructuring”. It means that we’re making two new variables.
  const [count, setCount] = useState(0);
  return (
  	<button onClick={() => setCount(count + 1)} />
  );
}
```

> `useState` 不像 class 中的 `this.setState`，更新 state 变量总是**替换**它而不是合并它。



### useEffect

**useEffect 一般用于处理状态更新导致的 side effects**。可以把 `useEffect` Hook 看做 `componentDidMount`，`componentDidUpdate` 和 `componentWillUnmount` 这三个函数的组合。

第二个参数指定了副效应函数的依赖项。如果为一个**空数组**，那么副效应不依赖任何变量，所以那些变量无论怎么变，副效应函数的执行结果都不会改变，因而运行一次就够了。

 **Effects Without Cleanup**

```javascript
function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });
}
```

> 与 `componentDidMount` 或 `componentDidUpdate` 不同，使用 `useEffect` 调度的 effect 不会阻塞浏览器更新屏幕，这让你的应用看起来响应更快。大多数情况下，effect 不需要同步地执行。在个别情况下（例如测量布局），有单独的 [`useLayoutEffect`](https://zh-hans.reactjs.org/docs/hooks-reference.html#uselayouteffect) Hook 供你使用，其 API 与 `useEffect` 相同。



**Effects with Cleanup**

通常，组件卸载时需要清除 effect 创建的诸如订阅或计时器 ID 等资源。

```jsx
useEffect(
  () => {
    const subscription = props.source.subscribe();
    // Specify how to clean up after this effect:
    return () => {
      subscription.unsubscribe();
    };
  },
  [props.source],
);
```

为防止内存泄漏，清除函数会在组件卸载前执行。另外，如果组件多次渲染（通常如此），则**在执行下一个 effect 之前，上一个 effect 就已被清除**。在示例中，意味着组件的每一次更新都会创建新的订阅。

>  所有 effect 函数中引用的值都应该出现在依赖项数组中。否则你的代码会引用到先前渲染中的旧变量。



### useContext

共享状态钩子。接收一个 context 对象（`React.createContext` 的返回值）并返回该 context 的当前值。当前的 context 值由上层组件中距离当前组件最近的 `<MyContext.Provider>` 的 `value` prop 决定。

```jsx
<AppContext.Provider value={{
  username: 'superawesome'
}}>
  <div className="App">
    <Navbar/>
    <Messages/>
  </div>
</AppContext.Provider>


const Messages = () => {
  const { username } = useContext(AppContext)

  return (
    <div className="messages">
      <h1>Messages</h1>
      <p>1 message for {username}</p>
      <p className="message">useContext is awesome!</p>
    </div>
  )
}
```



### useReducer

Redux 的核心概念是，组件发出 action 与状态管理器通信。状态管理器收到 action 以后，使用 Reducer 函数算出新的状态，Reducer 函数的形式是`(state, action) => newState`。

```javascript
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

> The first and most important thing to understand about a reducer is that **it will always only return one value**. Reducers are really great for a lot of things, but they’re especially useful for applying a bit of logic to a group of values and ending up with another single result.



```javascript
const myReducer = (state, action) => {
  switch(action.type)  {
    case('countUp'):
      return  {
        ...state,
        count: state.count + 1
      }
    default:
      return  state;
  }
}

function App() {
  const [state, dispatch] = useReducer(myReducer, { count:   0 });
  return  (
    <div className="App">
      <button onClick={() => dispatch({ type: 'countUp' })}>
        +1
      </button>
      <p>Count: {state.count}</p>
    </div>
  );
}
```

> If your one element of your state relies on the value of another element of your state, then it’s almost always best to use `useReducer`.



### useMemo

仅会在依赖项改变时重新计算 memoized 值，从而避免每次渲染时都进行高开销的**计算**。

```javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

传入 `useMemo` 的函数会在渲染期间执行。

> 请**不要在这个函数内部执行与渲染无关的操作**，诸如副作用这类的操作属于 `useEffect` 的适用范畴，而不是 `useMemo`。



### useCallback

`useCallback(fn, deps)` 相当于 `useMemo(() => fn, deps)`。



useRef

useImperativeHandle

### useLayoutEffect

useEffect 是在浏览器渲染结束之后才执行的，而这三个生命周期函数是在浏览器渲染之前同步执行。React 还有一个官方的 hook 是完全等价于这三个生命周期函数的，叫 useLayoutEffect。

`useEffect` 与 `useLayoutEffect` 的区别[ codePen](https://link.zhihu.com/?target=https%3A//codepen.io/Lxylona/pen/xxOgzoV)：

* `useEffect` 在浏览器重绘之后才异步执行；
* `useLayoutEffect` 在浏览器重绘之前同步执行。

![image-20210719141405287](/Users/mac/Library/Application Support/typora-user-images/image-20210719141405287.png)

因为 useEffect 不会阻塞浏览器重绘，而且平时业务中我们遇到的绝大多数场景都是时机不敏感的，比如取数、修改 dom、事件触发/监听…… 所以**首推用 useEffect 来处理 side effects，性能上的表现会更好一些**。

useDebugValue

