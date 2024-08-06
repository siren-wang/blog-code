---
date: 2024-08-06
category: React
title: Wolf DevTool 工具使用
---

### DevTool 工具使用

#### 组件树查阅

点击 WolfPanel 选项卡，即可看到当前页面的Wolf 组件树。点击组件树内组件，右方（下方）列表展示当前组件的所有属性。其中，Data为当前组件的上下文数据。

![](/images/devtool1.png)

#### 请求查阅

在Requests选项卡下，可以查看所有Wolf相关的请求（包括Wolf组件请求等）其中，Wolf-Proxy-Url为Wolf代理的真实请求。点击某一个请求后，右方（下方）会展示所选中的请求的详细信息。

![](/images/devtool2.png)

点击Filter框可以对所有请求url进行搜索；点击Wolf-Proxy-Url可以只看Wolf平台代理的请求。

![](/images/devtool3.png)