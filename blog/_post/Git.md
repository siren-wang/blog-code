---
date: 2021-08-03
category: Git Tips & Commands
title: Stage & Commit Files-- git add, git commit, & git log
cover: /images/git-1.png
---

<!-- more -->

Think of Git as keeping a list of changes to files. So how do we tell Git to record our changes? **Each recorded change to a file (or set of files) is called a commit.** 



### Tell Git Your Name & Email

```bash
$ git config --global user.name "Your Name"
$ git config --global user.email "you@example.com"
```



## Checking Your Git Setup (Name & Email)

```bash
$ git config --global user.name
$ git config --global user.email
```



df

## Staging

Staging is telling Git what files we want to commit (new untracked files, modified files, or deleted files). We add files to a staging area, and then we commit what has been staged. 

git add 将内容写入暂存区

```bash
$ git add "File A" "File D"
```

- If the file name/path has a space, wrap it in quotes. 

  修改了4个文件，在不放弃任何修改的情况下，其中一个文件不想提交，如何操作？（没add : git add 已经add: git reset --soft ）
  修改到一半的文件，突然间不需要或者放弃修改了，怎么恢复未修改前文件？ (git checkout)
  代码写一半，被打断去做其他功能开发，未完成代码保存？(git stash)
  代码写一半，发现忘记切换分支了？(git stash & git checkout)
  代码需要回滚了？（git reset）

## Check Status

```bash
$ git status
```

## Unstage a File

```bash
$ git reset HEAD example.html
```

## Deleting Files

```bash
$ git rm example.html to remove a file (and stage it)
$ git rm -r myfolder** to remove a folder (and stage it)
```

## git commit 

```bash
$ git commit -m "Message that describes what this change does"
```

将暂存区内容添加到本地仓库中

> Do not use past tense. **Use language like "Make headings blue"**. When people read the commit messages they will do know what your code will do. Your change will "Make headings blue".

每次使用git commit 命令我们都会在本地版本库生成一个40位的哈希值，这个哈希值也叫commit-id，

　　commit-id在版本回退的时候是非常有用的，它相当于一个快照



## Fixing Your Last Commit Message

If you made a mistake in your last commit message, run this command:

```bash
$ git commit --amend -m "Put your corrected message here"
```



## View a List of Commits

To see a simplified list of commits:

```bash
$ git log --oneline
```

To see a list of commits with more detail (such who made the commit and when):

```bash
$ git log
```

**NOTE:** If the list is long, use the **Down/Up Arrow** keys to scroll and hit **Q** to quit.

To see a list of commits with even more detail (including which files changed)

```bash
$ git log --stat
```







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

`git checkout`命令用于切换分支或恢复工作树文件。`git checkout`是git最常用的命令之一，同时也是一个很危险的命令，因为这条命令会重写工作区。



## Merge Conflict

Merge conficts occur when two branches modifies the same hunk of the same file. To make merging easier, avoid making a lot of changes over a long period of time without merging. Smaller, frequent merges are usually the best aproach.

> In some ways, the number and complexity of merge conflicts is a test of how moduler your code is.