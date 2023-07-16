---
date: 2021-08-23
category: React
title: React Hooks
cover: /images/react-hooks-best-practices-lead\_.jpeg
---

<!-- more -->

## 类组件与函数组件

> *Hook* 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。
> 
> React Hooks are a new(-ish) way of using state and other React features without writing a class, and in general, keeping code much simpler to understand and share.

**Hooks allow you to reuse stateful logic without changing your component hierarchy.** 



Redux 的作者 Dan Abramov [总结][1]了组件类的几个缺点：

- 大型组件很难拆分和重构，也很难测试。
- 业务逻辑分散在组件的各个方法之中，导致重复逻辑或关联逻辑。
- 组件类引入了复杂的编程模式，比如 render props 和高阶组件。

组件不要变成复杂的容器，最好只是 ==数据流的管道== 。开发者根据需要，组合管道即可。 **组件的最佳写法应该是函数，而不是类。**

> React Hooks 的设计目的，就是加强版函数组件，完全不使用"类"，就能写出一个全功能的组件。



### 函数组件和类组件的区别

React 中类组件和函数组件的差异，就表象来说可以说很多条

- 类组件有生命周期，函数组件没有
- 类组件需要继承 Class，函数组件不需要
- 类组件可以获取实例化的 this，并且基于 this 做各种操作，函数组件不行
- 类组件内部可以定义并维护 state， 函数组件都称为无状态了，肯定不行

引用 Dan 的一篇文章 [函数式组件与类组件有何不同？][2]其本质上的区别是：

> 函数组件捕获渲染时的值。
> 
> **Function components capture the rendered values.**

怎么理解这句话呢？

我们都知道，React 框架有一个经典的公式是`UI = f(data)`，React框架做的本质工作就是吃入数据，吐出UI，把声明式的代码转换为命令式的 DOM 操作，把数据层面的描述映射到用户可见的 UI 变化中去。这也就是说React的数据应该紧紧的和渲染绑定在一起，但是问题的关键就在于**类组件做不到这一点**。 [DEMO][3]

看一下这样的组件：

```js
class ProfilePage extends React.Component {
  showMessage = () => {
    alert('Followed ' + this.props.user);
  };

  handleClick = () => {
    setTimeout(this.showMessage, 3000);
  };

  render() {
    return <button onClick={this.handleClick}>Follow</button>;
  }
}
```

这个组件返回一个按钮，用 `setTimeout` 来模拟网络请求，点击之后延迟三秒显示 "Followed XXX" 确认弹窗。

看上去好像是没有什么问题，但是如果你在Dan用户下点击 follow按钮，并且在三秒内把用户切换到 Sophie， 最终弹出的提示框会变成 ‘Followed Sophie’，这明显很不合理。

![image][image-1]

这个现象有点奇怪，user 是通过 props 下发的，props不可改变，那么造成数据改变的原因就一定是 this 指向改变了。
真正的原因也确实如此，虽然 props 不可改变，但是 this 是可变的，**this.props 的每次调用都会去获取最新的 this 值，这也是 React 保证数据实时性的重要手段。**

那么就很清晰了，当 showMessage 最终执行时，此时的 this 绑定的是 Sophie 对应的上下文，`showMessage` 方法从一个“过于新”的 `props` 中取到 `user` 。所以输出为 "Followed Sophie"；

如果我们把上面的类组件改造成函数组件：

```js
function ProfilePage(props) {
  const showMessage = () => {
    alert('Followed ' + props.user);
  };

  const handleClick = () => {
    setTimeout(showMessage, 3000);
  };

  return (
    <button onClick={handleClick}>Follow</button>
  );
}
```

最终的输出值明显为''Followed Dan"，props 会在函数执行的瞬间就被捕获，而 props 本身又是不可变值，所以我们可以确保从当前开始读取到的 props 都是最初捕获到的。**当父组件传入新的 props 尝试重新渲染函数时，本质是基于新的 props 入参重新调用了一次函数**，并不会影响上一次调用。

这就是 Dan 所说的函数式组件捕获了渲染所使用的值，并且我们还能进一步意识到：函数组件真正将数据和渲染紧紧的绑定到一起了。

---

假设函数式组件不存在。我们则如何解决这个问题呢？

一种方法是在事件之前读取 `this.props` ，然后将他们显式地传递到定时器回调函数中去。

```js
class ProfilePage extends React.Component {
  showMessage = (user) => {
    alert('Followed ' + user);
  };

  handleClick = () => {
    const {user} = this.props;
    setTimeout(() => this.showMessage(user), 3000);
  };

  render() {
    return <button onClick={this.handleClick}>Follow</button>;
  }
}
```

这种方法当然 <u>会起作用</u>。不过，这种方法使得代码明显变得更加冗长，而且易出问题。如果我们需要的不止是一个 props 怎么办？如果我们还需要访问 state 呢？

我们的问题是从 `this.props` 中读取数据太迟了——读取时已经不是我们所需要使用的上下文了。**如果能利用JavaScript闭包的话，问题将迎刃而解。**

> 通常来说我们会避免使用闭包，因为它会让我们难以想象一个可能会随着时间推移而变化的变量。但是在 React 中，props 和 state 是不可变的！（至少，在我们的强烈推荐中是不可变。）这就消除了闭包的一个主要缺陷。

```js
class ProfilePage extends React.Component {
  render() {
    // Capture the props!
    const props = this.props;

    // Note: we are *inside render*.
    // These aren't class methods.
    const showMessage = () => {
      alert('Followed ' + props.user);
    };

    const handleClick = () => {
      setTimeout(showMessage, 3000);
    };

    return <button onClick={handleClick}>Follow</button>;
  }
}
```

这样你就可以在渲染的时候 “捕获到” 属性了。

You’ve “captured” props at the time of render.

如果你在 `render` 方法中定义各种函数，而不是使用类属性，也失去了类的意义。

> 很多人认为在函数组件中延迟输出的 state 是调用时的 state，而不是最新的 state 是一个Bug，恰恰相反，这是一个函数式组件的特性，是真正践行了React设计理念的正确方式。

在函数式组件中，你也可以拥有一个在所有的组件渲染帧中共享的可变变量。它被成为 [useRef (jump to title)][4] 。



## Hook API

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

> **Hooks let us split the code based on what it is doing** rather than a lifecycle method name. React will apply *every* effect used by the component, in the order they were specified.

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

> 与 `componentDidMount` 或 `componentDidUpdate` 不同，使用 `useEffect` 调度的 effect 不会阻塞浏览器更新屏幕，这让你的应用看起来响应更快。大多数情况下，effect 不需要同步地执行。在个别情况下（例如测量布局），有单独的 [`useLayoutEffect`][5] Hook 供你使用，其 API 与 `useEffect` 相同。



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

>  所有 effect 函数中引用的值都应出现在依赖项数组中。否则你的代码会引用先前渲染中的旧变量。



### useContext

共享状态钩子。接收一个 context 对象（`React.createContext` 的返回值）并返回该 context 的当前值。当前的 context 值由上层组件中距离当前组件最近的 `<MyContext.Provider>` 的 `value` prop 决定。

```jsx {12}
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

Redux 的核心概念是，组件发出 action 与状态管理器通信。状态管理器收到 action 以后，使用 Reducer 函数算出新的状态，Reducer 函数的形式是 `(state, action) => newState` 。

```javascript
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

> The first and most important thing to understand about a reducer is that **it will always only return one value**. Reducers are really great for a lot of things, but they’re especially useful for applying a bit of logic to a group of values and ending up with another single result.

```jsx
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

返回一个 [memoized][6] 值。仅会在依赖项改变时重新计算 memoized 值，从而避免每次渲染时都进行高开销的计算。

```javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

传入 `useMemo` 的函数会在渲染期间执行。

> 请不要在这个函数内部执行与渲染无关的操作，诸如副作用这类的操作属于 `useEffect` 的适用范畴，而不是 `useMemo` 。

useMemo除了**Computationally expensive calculations**，还有**Referential equality**，即在父组件传递给子组件时，参数是引用数据类型。例子说明：

```jsx {24-30}
import React, { useCallback, useMemo, useEffect, useState } from "react";

function StringFoo({ bar, baz }) {
  useEffect(() => {
  }, [bar, baz]);
  return <div>StringFoo</div>;
}

function ObjectFoo({ bar, baz }) {
  useEffect(() => {
  }, [bar, baz]);
  return <div>ObjectFoo</div>;
}

function MemoFoo({ bar, baz }) {
  useEffect(() => {
  }, [bar, baz]);
  return <div>memoFoo</div>;
}

function Blub() {
  const [count, setCount] = useState(0);

  // object
  const objectBar = () => {};
  const objectBaz = [1, 2, 3];

  // memo
  const memoBar = useCallback(() => {}, []);
  const memoBaz = useMemo(() => [1, 2, 3], []);

  return (
    <>
      <button
        onClick={() => { setCount(c => c + 1); }}
      >
        {count}
      </button>
      <StringFoo bar="bar" baz="baz" />
      <ObjectFoo bar={objectBar} baz={objectBaz} />
      <MemoFoo bar={memoBar} baz={memoBaz} />
    </>
  );
}

export default Blub;
```

有三种情况，参数是string；参数是数组和函数；参数是useMemo包裹的数组和函数。当我们点击button时：

- stringFoo不会重新渲染
- ObjectFoo会重新渲染，bar和baz是引用类型，虽然值没变，但是与原先不一样，故会重新渲染
- MemoFoo不会重新渲染，这就是useMemo起作用的地方

在打印台只有第二种情况"obj"变打印出来，可以点击[这里][7]试验。

**你可以把 `useMemo` 作为性能优化的手段，但不要把它当成语义上的保证。**（不要相信它一定会记住上一次的缓存值。） 将来，React 可能会选择“遗忘”以前的一些 memoized 值，并在下次渲染时重新计算它们，比如为离屏组件释放内存。

> 建议先编写在没有 `useMemo` 的情况下也可以执行的代码 —— 之后再在你的代码中添加 `useMemo` ，以达到优化性能的目的。



### useCallback

返回一个 [memoized][8] 回调函数。适用于将该回调函数传递给子组件，且子组件使用引用相等性避免非必要渲染（例如 `shouldComponentUpdate` ）的情况。

```js
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

`useCallback(fn, deps)` 相当于 `useMemo(() => fn, deps)` 。

> 依赖项数组不会作为参数传给回调函数。

优化原理：在使用 callback 作为 props 向子组件传递时，往往面临着引用相当性问题，父组件因为props变化生成新的 callback ，然后传递给子组件，尽快这个callback内容并没有变化（产生闭包运输的值也没有变化），但对于子组件来说 props 是发生了变化，又会引起子组件的重新渲染。而 useCallback 产生的记忆化回调函数，仅在依赖项变化时产生新的回调，否则使用缓存值，这对于子组件来说引用没有变化，并不会引起多余的更新。



### useRef
函数组件每次渲染都会被执行，函数内部的局部变量一般会重新创建，而利用 `useRef` 可以访问上次渲染的变量，实现类似[类组件的实例变量][9]效果。具体用途：

* 函数组件访问DOM元素；
* 函数组件访问之前渲染变量。

```js
const refContainer = useRef(initialValue);
```

在 `useRef` 创建的 ref 仿佛就像 ==外部定义的全局变量== ，不会随着组件的更新而重新创建。但组件销毁，它也会消失，不用手动进行销毁。

**函数组件为什么不能使用 `createRef` ？**

`createRef` 主要解决 class 组件访问 DOM 元素问题，并且最佳实践是在组件周期内只创建一次（一般在构造函数里调用）。如果在函数组件内使用 createRef 会造成每次 render 都会调用 createRef 。也就是我们每更新一次组件，更新后的 ref 都不一样。

> The createRef hook **creates a new reference** every time it renders, and the useRef hook will return the same reference each time.



**变更 `.current` 属性为什么不会引发重新渲染？**

`useRef()` 创建的是一个普通 Javascript 对象。和自建一个 `{current: ...}` 对象的唯一区别是，`useRef` 会在每次渲染时返回同一个 ref 对象。

我们分析以下代码：

```jsx {11-19}
function Minus() {
  const [minus, setMinus] = useState(0);
  const ref = useRef(null);

  const handleClick = () => {
    setMinus(minus + 1);
  };

  console.log(`ref.current=${ref.current && ref.current.innerText}`)

  // #1 useEffect
  useEffect(() => {
    console.log(`dep[ref.current] >`, ref.current && ref.current.innerText);
  }, [ref.current]);

  // #2 useEffect
  useEffect(() => {
    console.log(`dep[minus]>`, ref.current && ref.current.innerText);
  }, [minus]);

  return (
    <div className="App">
      <h1 ref={ref}>Num: {minus}</h1>
      <button onClick={handleClick}>Add</button>
    </div>
  );
}
```

1. 首次渲染，即第一次执行，输出：

```javascript
ref.current=null
dep[ref.current] > Num: 0
dep[minus]> Num: 0
```

   渲染阶段， ref 尚未挂载到 DOM 元素，因此输出 null，且 `#1 uesEffect` 依赖项判定为null。

   渲染后，ref 已挂载，所以 useEffect 输出了该元素的内容。

2. 点击[Add]，即第二次执行，输出：

```javascript
ref.current=Num: 0
dep[ref.current] > Num: 1
dep[minus]> Num: 1
```

   渲染阶段，ref 元素内容并未修改（重渲染），因此输出上次渲染的值。`#1 uesEffect` 的依赖项判定从 null 变为了 `<h1>Num: 0<h1>` （上次渲染的值）。

   渲染后，由于 useEffect 的依赖项均发生了变化，因此继续执行。

3. 点击[Add]，即第三次执行，输出：

```javascript
ref.current=Num: 1
denp[minus]> Num: 2
```

   渲染阶段，`#1 uesEffect` 的依赖项从 `<h1>Num: 0<h1>` 变为 `<h1>Num: 1<h1>`， 但**并未发生变化**。所以第一个 effect 函数不会执行。

> 首次渲染时，依赖项判断在 render 阶段进行，发生在 .current 更新之前。

`.current` 不可以作为其他 hooks 依赖项。另外，`.current` 发生变化应该作为 Side Effect（因为它会影响下次渲染），所以不应在 render 阶段更新 current 属性。



### useImperativeHandle

```javascript
useImperativeHandle(ref, createHandle, [deps])
```

在 `useRef` 中，由于勾住的对象是渲染后的原生html对象，父组件只能通过 ref 调用该原生html对象的函数。

而 `useImperativeHandle` 可以让父组件获取并执行子组件内某些自定义函数(方法)。本质上其实是子组件将自己内部的函数(方法)通过 `useImperativeHandle` 添加到父组件中 `useRef` 定义的对象中。

useImperativeHandle 应当与 [forwardRef][10] 一起使用：

```js
function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} ... />;
}
FancyInput = forwardRef(FancyInput);
```

父组件可以调用 `inputRef.current.focus()` 。

1. It gives you control over the value that is returned. Instead of returning the instance element, you explicitly state what the return value will be (see snippet below).
2. It allows you to replace native functions (such as `blur`, `focus`, etc) with functions of your own, thus allowing side-effects to the normal behavior, or a different behavior altogether. Though, you can call the function whatever you like.

### useLayoutEffect

useEffect 是在浏览器渲染结束之后才执行的，而 `componentDidMount`、`componentDidUpdate` 生命周期函数是在浏览器渲染之前同步执行。React 还有一个官方的 hook 是完全等价于这三个生命周期函数的，叫 useLayoutEffect。

`useEffect` 与 `useLayoutEffect` 的区别[ codePen][11]：

* useEffect 在浏览器重绘之后才异步执行；
* useLayoutEffect 在浏览器重绘之前同步执行。

![image-20210719141405287][image-2]

因为 useEffect 不会阻塞浏览器重绘，而且平时业务中我们遇到的绝大多数场景都是时机不敏感的，比如取数、修改 dom、事件触发/监听…… 所以**首推用 useEffect 来处理 side effects，性能上的表现会更好一些**。



## 什么时候使用 useMemo 和 useCallback

> 性能优化不是免费的。 它们总是带来成本，但这并不总是带来好处来抵消成本。
> 
> Performance optimizations are not free. They ALWAYS come with a cost but do NOT always come with a benefit.

### 引用相等

在React中，有两种情况下引用相等很重要，让我们一个个地来看。

#### 依赖列表

```js
function Foo({bar, baz}) {
  const options = {bar, baz}
  React.useEffect(() => {
    buzz(options)
  }, [options]) // we want this to re-run if bar or baz change
  return <div>foobar</div>
}

function Blub() {
  return <Foo bar="bar value" baz={3} />
}
```

此处 `useEffect` 将对每次渲染中对 `options` 进行引用相等性检查，并且由于JavaScript的工作方式，每次渲染 `options` 都是新的，所以每次渲染后都会调用 `useEffect` 回调，而不是仅在 bar 和 baz 更改时调用。

```jsx
// option 1
function Foo({bar, baz}) {
  React.useEffect(() => {
    const options = {bar, baz}
    buzz(options)
  }, [bar, baz]) // we want this to re-run if bar or baz change
  return <div>foobar</div>
}
```

但是有一种情况下：如果 bar 或者 baz 是（非原始值）对象、数组、函数等，这不是一个实际的解决方案。这正是 `useCallback` 和 `useMemo` 存在的原因。你可以这样解决问题：

```jsx
function Foo({bar, baz}) {
  React.useEffect(() => {
    const options = {bar, baz}
    buzz(options)
  }, [bar, baz])
  return <div>foobar</div>
}

function Blub() {
  const bar = React.useCallback(() => {}, [])
  const baz = React.useMemo(() => [1, 2, 3], [])
  return <Foo bar={bar} baz={baz} />
}
```

#### React.memo

```jsx
function CountButton({onClick, count}) {
  return <button onClick={onClick}>{count}</button>
}

function DualCounter() {
  const [count1, setCount1] = React.useState(0)
  const increment1 = () => setCount1(c => c + 1)

  const [count2, setCount2] = React.useState(0)
  const increment2 = () => setCount2(c => c + 1)

  return (
    <>
      <CountButton count={count1} onClick={increment1} />
      <CountButton count={count2} onClick={increment2} />
    </>
  )
}
```

每次单击其中任何一个按钮时，`DualCounter` 的状态都会发生变化，因此会重新渲染，然后重新渲染两个`CountButton`。 但是，实际上只需要重新渲染被点击的那个按钮吧？因此，如果你点击第一个按钮，则第二个也会重新渲染，但没有任何变化，我们称之为“不必要的重新渲染”。

**大多数时候，你不需要考虑去优化不必要的重新渲染**。React是非常快的，你可以利用时间去做很多事情，比起做这些类似的优化要好得多。

然而，有些情况下渲染可能会花费大量时间（比如重交互的图表、动画等）。多亏 React 的实用性，有一个逃生舱（escape hatch）：

```js
const CountButton = React.memo(function CountButton({onClick, count}) {
  return <button onClick={onClick}>{count}</button>
})
```

现在 React 只会当 `props` 改变时会重新渲染！但我们还没有完成，还记得引用相等吗？在 `DualCounter` 组件中，我们组件函数里定义了两个函数，这意味着每次 `DualCounter` 重新渲染，那些函数会新创建，因此 React 无论如何会重新渲染两个按钮。

所以这是 `useCallback` 和 `useMemo` 能派上用场的另外一个场景：

```jsx
const CountButton = React.memo(function CountButton({onClick, count}) {
  return <button onClick={onClick}>{count}</button>
})

function DualCounter() {
  const [count1, setCount1] = React.useState(0)
  const increment1 = React.useCallback(() => setCount1(c => c + 1), [])

  const [count2, setCount2] = React.useState(0)
  const increment2 = React.useCallback(() => setCount2(c => c + 1), [])

  return (
    <>
      <CountButton count={count1} onClick={increment1} />
      <CountButton count={count2} onClick={increment2} />
    </>
  )
}
```

现在我们可以避免所谓的“不必要的重新渲染”。

但**在没有测量前**，强烈建议不要使用 `React.memo` （或者它的朋友 `PureComponent` 和 `shouldComponentUpdate`），因为优化总会带来成本，并且你需要确保知道会有多少成本和收益，这样你才能决定在你的案例中它是否能真的有帮助（而不是有害的）。

> 一直保持正确是一件很困难的事情，所以你可能无法获得任何好处。



### 昂贵的计算

这是 `useMemo` 内置于 React 的另一个原因（注意这个不适用于 `useCallback`）。

想象一下你有一个计算成本很高的同步计算值的函数（我的意思是有多少应用真实地需要 [像这样计算素数][12]，但这就是一个例子）：

```js
function RenderPrimes({iterations, multiplier}) {
  const primes = React.useMemo(() => calculatePrimes(iterations, multiplier), [
    iterations,
    multiplier,
  ])
  return <div>Primes! {primes}</div>
}
```

可以这样做的原因是，即使你在每次渲染时定义了计算素数的函数（非常快），React只在需要值时才调用该函数。 除此之外，React还会在给定输入的情况下存储先前的值，并在给定跟之前相同输入的情况下返回先前的值。 这是 **memoization** 在起作用。

每个抽象(和性能优化)都是有代价的。应用 [AHA 编程原则][13]，直到确实需要抽象或优化时才去做，这样可以避免承担成本而不会获得收益的情况。

> AHA编程原则：避免草率的抽象、宁可复制代码也不要错误的抽象（因为抽象通常是为了减少重复代码）和为了改变而优化。

具体来说，`useCallback` 和 `useMemo` 的成本是：

* 对于你的同事来说，你使代码更复杂了；
* 你可能在依赖项数组中犯了一个错误，并且你可能通过调用内置的 hook、并防止依赖项和 memoized 值被垃圾收集，而使性能变差；
* 少量的内联函数和变量（这个影响可以忽略不计），机制内在的消耗，潜在的内存泄露。

如果你获得了必要的性能收益，那么这些成本都是值得承担的，但**最好先测量一下**。

[1]:	https://medium.com/@dan_abramov/making-sense-of-react-hooks-fdbde8803889
[2]:	https://overreacted.io/zh-hans/how-are-function-components-different-from-classes/
[3]:	https://link.zhihu.com/?target=https%3A//codesandbox.io/s/pjqnl16lm7
[4]:	#useref
[5]:	https://zh-hans.reactjs.org/docs/hooks-reference.html#uselayouteffect
[6]:	https://en.wikipedia.org/wiki/Memoization
[7]:	https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Feastling%2Fpen%2FOJJYPYY
[8]:	https://en.wikipedia.org/wiki/Memoization
[9]:	#%E5%87%BD%E6%95%B0%E7%BB%84%E4%BB%B6%E5%92%8C%E7%B1%BB%E7%BB%84%E4%BB%B6%E7%9A%84%E5%8C%BA%E5%88%AB
[10]:	https://zh-hans.reactjs.org/docs/react-api.html#reactforwardref
[11]:	https://link.zhihu.com/?target=https%3A//codepen.io/Lxylona/pen/xxOgzoV
[12]:	https://developer.mozilla.org/en-US/docs/Tools/Performance/Scenarios/Intensive_JavaScript
[13]:	https://kentcdodds.com/blog/aha-programming

[image-1]:	/images/v2-386a449110202d5140d67336a0ade5a0_b.gif
[image-2]:	/images/image-20210719141405287.png