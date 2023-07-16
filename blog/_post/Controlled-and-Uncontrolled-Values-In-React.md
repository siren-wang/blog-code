---
date: 2022-8-29
category: React
title: 非受控组件指定key后UI错乱
  - React
---
<!-- cover: /images/Controlled-and-Uncontrolled-Values-In-React.jpg -->

## 非受控组件指定key后UI错乱
所谓受控组件，是指数据交由 `state` 管理的组件。

### Uncontrolled Component
An uncontrolled component is a component that renders form elements, where the form element's data is handled by the DOM (default DOM behavior)

```js
// Example - Uncontrolled component:

const { useRef } from 'react';

function Example () {
  const inputRef = useRef(null);
  return <input type="text" defaultValue="bar" ref={inputRef} />
}
```

### Controlled Component
In a controlled component, the form element's data is handled by the React component (not DOM) and **kept in the component's state.** A controlled component basically overrides the default behavior of the HTML form elements.

![][image-1]

重现指定key后的非受控组件UI错乱问题：
![1][image-2]

代码如下
```js
export default function App() {
  const [arr, setArr] = useState(
    Array(5)
      .fill("")
      .map((i, idx) => ({ id: idx, value: idx }))
  );

  const remove = useCallback(
    (index) => {
      setArr(arr.filter((i, idx) => idx !== index));
    },
    [arr]
  );

  const change = useCallback(
    (e, index) => {
      setArr(
        arr.map((i, idx) => {
          if (idx === index) {
            return {
              ...i,
              value: e.target.value
            };
          }
          return i;
        })
      );
    },
    [arr]
  );

  return (
    <div className="App">
      {arr.map((item, index) => {
        return (
          <div key={index}>
            <span style={{ marginRight: 10 }}>id:{item.id}</span>
            <span>输入框:</span>
            <Input
              defaultValue={item.value}
              onChange={(e) => change(e, index)}
            />
            <DeleteOutlined onClick={() => remove(index)} />
          </div>
        );
      })}
    </div>
  );
}
```
在非受控状态下的Input组件，从被删掉的位置开始，后续的所有值都发生了错乱。我们从react如何进行更新的角度来分析，为什么会出现这样的差异。

在数据发生变化时，react会进行dom diff，找出最小的改动再应用到真实的dom上。在通过遍历数组再生成节点的场景中，key 在其中发挥了很重要的作用。
在本例中，==用index作为key== ，删除第二项后，react对比新旧dom树会以为`key=4` 这项被删除了（少了一项），从而渲染时仅保留原有前四项，但因为Input组件数据并不绑定state，所以展示旧的前四条数据，于是造成了“删除任意一条，都只能删除最后一行”的局面。


[image-1]:	/images/controlled-componets.webp
[image-2]:	/images/uncontrolled.awebp "control"