---
date: 2021-08-17
category: Principles
title: Performance evaluation
cover: /images/speed-test.png
tags:
  - 性能优化

---

> 16.67ms（1s/60）必须要刷新一次，否则就会有卡顿感。

<!-- more -->

## RAIL 性能模型

我们需要一个明确的指引告诉开发者，在用户的眼里“性能”意味着什么。围绕用户，Chrome 团队提出了 RAIL 模型来衡量应用性能，即：Response、Animation、Idle、Load，分别代表着 web 应用生命周期的四个不同方面。

#### Response 响应

保证在用户察觉出延迟之前就得到反馈，也就是<u>在轻触后的100毫秒内</u>。当最终结果还需要花更长的时间得到，也应给用户一个“加载中”的标识，告诉用户“本产品已经收到指令”，不至于让用户**自我怀疑** 。



#### Animation 动画

合理地动画，每一帧动画要<u>在16毫秒内完成</u>，才能达到60FPS（1000ms/60 ~= 16.6 ms）。



#### Idle 空置

要制作响应迅速动画精良的应用通常需要比较长的工时。[Optimistic UI](https://link.zhihu.com/?target=http%3A//info.meteor.com/blog/optimistic-ui-with-meteor-latency-compensation)模式利用这个技术达到了很好的效果。并非所有工作都要在 response 阶段或者 load 阶段完成：评论引导、组件初始化、数据检索和排序和分析数据的送都不是需要立刻传达给用户的，所以可以在浏览器空闲的时候再处理这些任务。



#### Load 加载

想要尽快将页面加载出来，我们需要把最需要传达的内容<u>在 1 秒内渲染出来</u>。超过 1 秒钟，用户的注意力就会被分散，当前执行的任务将有中断感。要达到在 1 秒内渲染完毕的目标，我们要优先考虑关键渲染路径，将所有不需要在加载时处理的任务延迟到浏览器空闲时再处理（或根据需求拦加载）。



## 性能目标

最好的性能指标是：100ms 内响应用户输入；动画或者滚动需在 10ms 内产生下一帧；最大化空闲时间；页面加载时长不超过 5 秒。

| Performance delays     | User perception |
| :--------------: | ------------------------------------------------------------ |
| 0 to 16 ms       | Users are exceptionally good at tracking motion, and they dislike it when animations aren't smooth. They perceive animations as smooth so long as 60 new frames are rendered every second. That's 16 ms per frame, including the time it takes for the browser to paint the new frame to the screen, leaving an app about 10 ms to produce a frame. |
| 0 to 100 ms      | Respond to user actions within this time window and users feel like the result is immediate. Any longer, and the connection between action and reaction is broken. |
| 100 to 1000 ms   | Within this window, things feel part of a natural and continuous progression of tasks. For most users on the web, loading pages or changing views represents a task. |
| 1000 ms or more  | Beyond 1000 milliseconds (1 second), users lose focus on the task they are performing. |
| 10000 ms or more | Beyond 10000 milliseconds (10 seconds), users are frustrated and are likely to abandon tasks. They may or may not come back later. |

> Web 的性能一定程度上影响了用户留存率，Google DoubleClick 研究表明：如果一个移动端页面加载时长超过 3 秒，用户就会放弃而离开。BBC 发现网页加载时长每增加 1 秒，用户就会流失 10%。

### Response: process events in under 50ms

To ensure a visible response within 100 ms, process user input events within 50 ms. This applies to most inputs, such as clicking buttons, toggling form controls, or starting animations. This does not apply to touch drags or scrolls.

> For actions that take longer than 50 ms to complete, always provide feedback.

**50 ms or 100 ms?** 

The goal is to respond to input in under 100 ms, so why is our budget only 50 ms? This is because there is generally other work being done in addition to input handling, and that work takes up part of the time available for acceptable input response. If an application is performing work in the recommended 50 ms chunks during idle time, that means input can be queued for up to 50 ms if it occurs during one of those chunks of work. Accounting for this, it's safe to assume only the remaining 50 ms is available for actual input handling. 

![](/images/I7HDZ9qGxe0jAzz6PxNq.png)



### Animation: produce a frame in 10 ms

Produce each frame in an animation in 10 ms or less. Technically, the maximum budget for each frame is 16 ms (1000 ms / 60 frames per second ≈ 16 ms), but browsers need about 6 ms to render each frame, hence the guideline of 10 ms per frame.

Recognize all the types of animations. Animations aren't just fancy UI effects. Each of these interactions are considered animations:

- Visual animations, such as entrances and exits, [tweens](https://www.webopedia.com/TERM/T/tweening.html), and loading indicators.
- Scrolling. This includes flinging, which is when the user starts scrolling, then lets go, and the page continues scrolling.
- Dragging. Animations often follow user interactions, such as panning a map or pinching to zoom.

### Idle: maximize idle time

Maximize idle time to increase the odds that the page responds to user input within 50 ms.  

Use idle time to complete deferred work. For example, for the initial page load, load as little data as possible, then use idle time to load the rest.

### Load: deliver content and become interactive in under 5 seconds

When pages load slowly, user attention wanders, and users perceive the task as broken. Sites that load quickly have [longer average sessions, lower bounce rates, and higher ad viewability](https://www.thinkwithgoogle.com/intl/en-154/insights-inspiration/research-data/need-mobile-speed-how-mobile-latency-impacts-publisher-revenue/).

For subsequent loads, a good target is to load the page in under 2 seconds.

Consider lazy-loading images, code-splitting JavaScript bundles.



---

接下来将介绍几个常用的前端性能指标。

## 性能指标

### First Paint (FP)

FP又称**白屏**时间，标志着浏览器渲染第一个像素点的时间。
![](/images/FP.png)



### First Contentful Paint (FCP)

FCP又称**首屏**时间，标志着浏览器渲染第一个DOM元素的时间。这些内容元素可以是 text, image, SVG, canvas.

![](/images/FCP.png)

Total Blocking Time (TBT) is an important [lab metric](https://web.dev/user-centric-performance-metrics/#in-the-lab) for measuring [load responsiveness](https://web.dev/user-centric-performance-metrics/#types-of-metrics) because it helps quantify the severity of how non-interactive a page is prior to it becoming reliably interactive—a low TBT helps ensure that the page is [usable](https://web.dev/user-centric-performance-metrics/#questions).

The Total Blocking Time (TBT) metric measures the total amount of time between [First Contentful Paint (FCP)](https://web.dev/fcp/) and [Time to Interactive (TTI)](https://web.dev/tti/) where the main thread was blocked for long enough to prevent input responsiveness.



The main thread is considered "blocked" any time there's a [Long Task](https://web.dev/custom-metrics/#long-tasks-api)—a task that runs on the main thread for more than 50 milliseconds (ms). We say the main thread is "blocked" because the browser cannot interrupt a task that's in progress.



但我们需要注意的是，**React.Profiler 记录的是 commit 阶段的数据**。React 的执行分为两个阶段：

- **render** 阶段：该阶段会确定例如 DOM 之类的数据需要做那些变化。在这个阶段，React 将会执行 render 及 render 之前的生命周期。
- **commit** 阶段：该阶段 React 会提交更新，同时在这个阶段，React 会执行像 `componentDidMount` 和 `componentDidUpdate` 之类的生命周期函数。



https://zhuanlan.zhihu.com/p/120748634