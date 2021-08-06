---
date: 2021-08-03
category: Git Tips & Commands
title: Git workflow
cover: /images/animated-git-staging-area-committed.png

---

<!-- more -->

 ## Repository, working tree & index

There are three main components of a Git project:

- Repository
- Working tree
- Index (staging area)

The **repository**, or repo, is the “container” that tracks the changes to your project files. It holds all of the commits — a snapshot of all your files at a point in time — that have been made. You can access the commit history with the Git log.

The **working tree**, or working directory, consists of files that you are currently working on. You can think of a working tree as a file system where you can view and modify files.

The **index**, or staging area, is where commits are prepared. The index compares the files in the working tree to the files in the repo. When you make a change in the working tree, the index marks the file as modified before it is committed.



## Three states of Git files

Your work can be in three main states with Git:

- **Modified**: changes made to your project *working directory*
- **Staged**: changes prepared in the *staging area* for your next commit
- **Committed**: changes stored in your *git repository*

![](/images/git_workflow_002.png)