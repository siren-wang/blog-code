---
date: 2021-07-26
category: Git
title: Git Basic Concepts
---

# CircleCI: Continuous Integration and Delivery

> **Integration Hell** refers to the point in production when members on a delivery team integrate their individual code

git add 将内容写入暂存区

## git commit 

将暂存区内容添加到本地仓库中

每次使用git commit 命令我们都会在本地版本库生成一个40位的哈希值，这个哈希值也叫commit-id，

　　commit-id在版本回退的时候是非常有用的，它相当于一个快照



## gst(git status tool)



```bash
$ git checkout -b dev
```

`git checkout`命令加上`-b`参数表示创建并切换，相当于以下两条命令：

```bash
$ git branch dev
$ git checkout dev
Switched to branch 'dev'
```

##  **在 Git 中切换到一个现有分支**

```bash
git checkout -
```

