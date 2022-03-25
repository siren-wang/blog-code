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



### 解构赋值

通过解构赋值(Destructuring), 可以将属性/值从对象/数组中取出,赋值给其他变量。

#### 1. Extracting properties

Where `identifier1` , …,  `identifierN` are names of properties to access, and `expression` should evaluate to an object.

```javascript
const { identifier1, identifier2, ..., identifierN } = expression;
```

#### 2. Default values

You can set a default value if the property doesn’t exist in the destructured object. 

```javascript {6}
const hero = {
  name: 'Batman',
  realName: 'Bruce Wayne'
};

const { enemies = ['Joker'] } = hero;

enemies;     // => ['Joker']
```

#### 3. Aliases

If you’d like to create variables of different names than the properties, then you can use the aliasing feature of object destructuring.

```javascript {6}
const hero = {
  name: 'Batman',
  realName: 'Bruce Wayne'
};

const { realName: secretName } = hero;
secretName; // => 'Bruce Wayne'
```

#### 4. Extracting properties from nested objects 

Often objects can be nested（嵌套对象） in other objects. In other words, some properties can contain objects. In such case, you still can use the object destructuring and access properties from deep. Here’s the basic syntax:

```javascript
const { nestedObjectProp: { identifier } } = expression;
```

`nestedObjectProp`  is the name of the property that holds a nested object. `identifier` is the property name to access from the nested object. `expression` should evaluate to the destructured object.

```javascript {10}
const hero = {
  name: 'Batman',
  realName: 'Bruce Wayne',
  address: {
    city: 'Gotham'
  }
};

// Object destructuring:
const { address: { city } } = hero;
city; // => 'Gotham'
```

#### 5. Extracting a dynamic name property

You can extract to variables properties with a dynamic name (the property name is known at runtime):

```javascript {6}
const hero = {
  name: 'Batman',
  realName: 'Bruce Wayne'
};

const prop = 'name';
const { [prop]: name } = hero;
name; // => 'Batman'
```

#### 6. Rest object after destructuring

The rest syntax is useful to collect the remaining properties after the destructuring:

```javascript
const hero = {
  name: 'Batman',
  realName: 'Bruce Wayne'
};

const { name, ...realHero } = hero;
realHero; // => { realName: 'Bruce Wayne' }
```

#### 7. Common use cases

**Bind properties to variables**

The object destructuring can assign values to variables declared using `const`, `let` and `var`. Or even assign to an already existing variable.

How to destructure to an already declared variable:

```javascript {8}
// existing variable
let name;

const hero = {
  name: 'Batman',
};

({ name } = hero);
name; // => 'Batman'
```

Combine `for..of` cycle with object destructuring to extract the property right away:

```javascript {6}
const heroes = [
  { name: 'Batman' },
  { name: 'Joker' }
];

for (const { name } of heroes) {  console.log(name); // logs 'Batman', 'Joker'
}
```

将下面 `obj` 对象中的数据分成两个部分：

```js
const obj = {
    name: '大漠',
    blog: 'w3cplus',
    email: 'w3cplus@hotmail.com',
    joined: '2019-06-19',
    followers: 45
}

let user = {}, userDetails = {}

({name: user.name, email: user.email, ...userDetails} = obj)

console.log(user)
> Result: {name: "大漠", email: "w3cplus@hotmail.com"}

console.log(userDetails)
> Result: {blog: "w3cplus", joined: "2019-06-19", followers: 45}
```

**Function parameter destructuring**

> Generally, the object destructuring can be placed **anywhere where an assignment happens.**

You could destruct an object right inside the parameters list of a function:

```javascript {7}
const heroes = [
  { name: 'Batman' },
  { name: 'Joker' }
];

const names = heroes.map(
  function({ name }) {    return name;
  }
);

names; // => ['Batman', 'Joker']
```

### 拍平多维数组

使用 `...` 运算符，将二维数组拍平：

```js {4}
const arr = [1, [2, '大漠'], 3, ['blog', '1', 2, 3]]
// The concat() method is used to merge two or more arrays. 
// This method does not change the existing arrays, but instead returns a new array.
const flatArray = [].concat(...arr)

console.log(flatArray)
> Result: (8) [1, 2, "大漠", 3, "blog", "1", 2, 3]
```

不过上面的方法只适用于二维数组。通过递归调用，可以使用它适用于多维数组：

```js {5}
function flattenArray(arr) {  
    const flattened = [].concat(...arr);  
    // The some() method tests whether at least one element in the array
    // passes the test implemented by the provided function.
    return flattened.some(item => Array.isArray(item)) ? flattenArray(flattened) : flattened;
}

const array = [1, [2, '大漠'], 3, [['blog', '1'], 2, 3]]
console.log(flattenArray(array))
> Result: (8) [1, 2, "大漠", 3, "blog", "1", 2, 3]
```



