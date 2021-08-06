 16.67ms（1s/60）必须要刷新一次，否则就会有卡顿感，刷新时间越长，就越卡顿

Total Blocking Time (TBT) is an important [lab metric](https://web.dev/user-centric-performance-metrics/#in-the-lab) for measuring [load responsiveness](https://web.dev/user-centric-performance-metrics/#types-of-metrics) because it helps quantify the severity of how non-interactive a page is prior to it becoming reliably interactive—a low TBT helps ensure that the page is [usable](https://web.dev/user-centric-performance-metrics/#questions).

The Total Blocking Time (TBT) metric measures the total amount of time between [First Contentful Paint (FCP)](https://web.dev/fcp/) and [Time to Interactive (TTI)](https://web.dev/tti/) where the main thread was blocked for long enough to prevent input responsiveness.



The main thread is considered "blocked" any time there's a [Long Task](https://web.dev/custom-metrics/#long-tasks-api)—a task that runs on the main thread for more than 50 milliseconds (ms). We say the main thread is "blocked" because the browser cannot interrupt a task that's in progress.



但我们需要注意的是，**React.Profiler 记录的是 commit 阶段的数据**。React 的执行分为两个阶段：

- **render** 阶段：该阶段会确定例如 DOM 之类的数据需要做那些变化。在这个阶段，React 将会执行 render 及 render 之前的生命周期。
- **commit** 阶段：该阶段 React 会提交更新，同时在这个阶段，React 会执行像 `componentDidMount` 和 `componentDidUpdate` 之类的生命周期函数。



https://zhuanlan.zhihu.com/p/120748634