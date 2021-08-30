---
date: 2021-08-20
category: Javascript
title: 超实用Javascript技巧
---

> Always on the lookout for new ways to be more efficient.

<!-- more -->



### 短路求值

短路求值是一种逻辑运算符的求值策略。只有当第一个运算数的值无法确定逻辑运算的结果时，才对第二个运算数进行求值。短路求值用 `||`或 `&&` 來寫比起if判斷式更短更簡潔的判斷式。

> **Short circuit conditionals.** The second argument is executed or evaluated only if the first argument does not suffice to determine the value of the expression.

* 用 `||` 設定<u>預設值</u>

- 用 `&&` <u>檢查</u>物件屬性是否存在，如果存在才去執行後面的動作

```javascript
//We have the following code:
if (hungry) {
    goToFridge();
}

//We can make it even shorter by using the variable with the function
hungry && goToFridge()
```

利用 `||` 的特性，我們可以在宣告變數時，賦予變數預設值，而不需要用 if-else 判斷式。例如以下的例子，假設我不能確定 `data` 是否存在，我可以這樣寫：

```javascript
var data = data || { bar: 456 } //給預設值

function getPersonJob(person) {
  person.job && console.log(`${ person.name } 的工作是 ${ person.job }`)
}
```

AND跟OR的優先順序是AND優先，如果混著用的話就會先做AND。

```javascript
true || false && false      // returns true, because && is executed first
```



