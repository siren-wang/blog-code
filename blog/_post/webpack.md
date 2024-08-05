---
date: 2021-07-08
category: React
title: Webpack打包部署
cover: /images/webpack.png
---

> webpack会自动地递归解析入口所需要加载的所有资源文件。

<!-- more -->


> 开箱即用，webpack 不需要您使用配置文件。但是，它将假定您的项目的入口点是 `src/index.js` 并将输出结果在 `dist/main.js` 中，为生产进行了缩小和优化。
> 
> Out of the box, webpack won't require you to use a configuration file. However, it will assume the entry point of your project is `src/index.js` and will output the result in `dist/main.js` minified and optimized for production.


我们可以不精通 Webpack，但要知道它是什么，帮我们做了哪些事情。这样的话，在遇到问题的时候，我们就能知道是哪个环节出了问题，以便进一步寻找解决问题的方案。

举个例子，在进行 React 开发时，如果遇到下面的错误，该从哪里着手解决呢？

![](/images/fail-to-compile.png)

这是在 React 开发时经常遇到的一个错误。仔细观察下错误提示，可以发现两个重要的信息：

1. Failed to compile：表示这是在编译阶段报的错误，也就是从你的源代码编译到可以由浏览器运行的代码。
2. SyntaxError：表明这个错误是个语法错误。要么是你的语法真的写错了，要么就是编译器没有正确配置，因此无法识别这样的代码。比如在这个例子中，错误提示其实已经很明确了，JSX 的语法没有启用。而 JSX 是由 babel-loader 处理的，因此你的着手点就应该确认 babel 有没有在 Webpack 中正确配置。

所以我们可以看到，只有了解代码的打包流程，才能在遇到问题时找到正确的解决方向。下面我们就来看下 Webpack 的基本工作原理，了解源代码最终是如何打包成最终在浏览器中运行的代码的。

### Webpack 的基本工作原理

Webpack 是目前最为主流的前端应用打包工具，它的核心思路是将源代码以及图片、样式文件等资源文件都视为模块，然后通过提供对不同类型资源的处理器，将它们进行统一处理，形成最终可在浏览器运行的代码。

下面这张图就显示了 Webpack 的工作机制：

![](/images/webpack.png)

Webpack 不仅是用于打包最终发布出去的应用程序，而且还能在开发时，为我们提供开发时服务器。它可以通过监测源代码的变化并实时编译，让我们能在代码发生变化时，及时看到运行的效果。

Webpack 对于开发环境和生产环境的配置会有所区别，但基本流程是一致的。

webpack是基于入口的。webpack会自动地递归解析入口所需要加载的所有资源文件，然后用不同的Loader来处理不同的文件，用Plugin来扩展webpack功能。总体来说，Webpack 的配置会分为下面三个部分：

- 输入输出配置：定义你的应用程序的入口，以及打包结果输出的文件夹位置。

- Loader(配置对于每一类资源文件的处理器)：在`module.rules`中配置，也就是说他作为模块的解析规则而存在。 类型为数组，每一项都是一个`Object`，里面描述了对于什么类型的文件（`test`），使用什么加载(`loader`)和使用的参数（`options`）。比如说，对 JavaScript 是用 babel-loader 去编译；对 less 文件则是用 less-loader 去编译；图片则用 file-loader去处理。你在项目中能使用哪些技术或者资源，完全取决于配置了哪些 loader。

- Plugin(插件配置)：在`plugins`中单独配置。类型为数组，每一项是一个`plugin`的实例，参数都通过构造函数传入。除了核心的源代码编译和打包流程，Webpack 还支持插件扩展功能，可以通过插件生成额外的打包结果，或者进行一些其它的处理。比如打包过程生成 index.html，源代码分析报表，提取 CSS 到独立文件，代码压缩，等等。

举一个简单的例子，我们来看看一个标准的 Webpack 配置文件究竟长什么样：

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');


module.exports = {
  entry: {
    // 定义应用的入口点 src/app.js，并命名为 main
    main: path.resolve(__dirname, './src/app.js'),
  },
  output: {
    // 打包输出的文件名，这里将生成 main.bundle.js
    filename: '[name].bundle.js',
    // 定义打包结果的输出位置
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    // 定义处理源文件的规则，rules 下会按顺序使用匹配的规则
    rules: [
      {
        // 遇到 .js 结尾的文件则使用这个规则
        test: /.js$/,
        // 忽略 node_modules 目录下的 js 文件
        exclude: /node_modules/,
        use: {
          // 使用 babel-loader 处理 js
          loader: 'babel-loader',
          // babel-loader 的一些选项
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    // 使用 HtmlWebpackPlugin 生成一个 index.html，其中自动引入 js
    // 并配置了页面的 title
    new HtmlWebpackPlugin({
      title: 'Webpack Output',
    }),
  ],
};
```


这段配置代码，我们不仅定义了输入输出，还配置了 babel-loader，用于编译 JavaScript 文件到兼容主流浏览器的代码。同时，还为 babel-loader 设置了参数 presets，例子中这个参数的值 @babel/preset-env可以确保 Babel 能够处理 JSX 等语法。最后，我们通过一个 HtmlWebpackPlugin，来自动生成 index.html。我们一般会把它存储为 webpack.config.js 这样一个文件。


### 理解 loader 和 plugin

loader 和 plugin 是 Webpack 最核心的两个概念，了解了这两个核心概念，我们就能掌握 Webpack 是如何处理你的代码，并最终生成打包结果。

为了理解它们的工作机制，我们来看一个 Less 文件处理的例子，看看要如何配置 Webpack，才能在项目中使用 Less 作为 Css 的预处理器。

Less 允许我们通过更强大的机制去写 Css，比如可以定义变量，允许嵌套的规则定义，等等。要让一个 Less 文件最终打包到目标文件中，并被浏览器运行，那么首先需要把 Less 代码转换成 Css，再通过 style 标记插入到浏览器中。

这个过程涉及到三个 loader，如下：

1. less-loader：用于将 Less 代码转换成 Css。
2. css-loader：用于处理 Css 中的 import、url 等语句，以便能分析出图片等静态资源打包到最终结果。
3. style-loader：会自动生成代码，并将打包后的 Css 插入到页面 style 标签。这个 loader 会将 Css 打包到 js 文件中，在应用运行时，自动生成的代码再把这些 css 应用到页面上。
   
从中可以看到，这个过程涉及到 loader 的一个重要机制：链式使用。前面一个 loader 的输出结果，可以作为后一个 loader 的输入，这样的话，整个编译过程可以由各个独立的 loader 完成不同的步骤，一方面让每个步骤的任务更加明确，另外也可以让 loader 得以重用。

比如说如果项目要支持 `sass` 作为 Css 预处理器，那么顺序就是 sass-loader -> css-loader -> style-loader。可以看到，我们只要替换 less-loader 为 sass-loader，后两个 loader 是完全一样的。

那么，支持 `css loader` 的 `Webpack` 配置就可以用如下代码来实现：

```javascript
module.exports = {
  // ...
  module: {
    rules: [
      // ...
      {
        // 检测 less 文件
        test: /.less$/,
        // 使用了三个 loader，注意执行顺序是数组的倒序
        // 也就是先执行 less-loader
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
  //...
};
```

::: 常见的loader
- file-loader：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件
- url-loader：和 file-loader 类似，但是能在文件很小的情况下以 base64 的方式把文件内容注入到代码中去
- source-map-loader：加载额外的 Source Map 文件，以方便断点调试
- image-loader：加载并且压缩图片文件
- babel-loader：把 ES6 转换成 ES5
- css-loader：加载 CSS，支持模块化、压缩、文件导入等特性
- style-loader：把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS。
- eslint-loader：通过 ESLint 检查 JavaScript 代码
:::

可以看到，在 module.rules 配置项中我们增加了一条规则，用于 Less 文件的处理。并使用了三个 loader ，用于将 less 代码最终打包到 JavaScript 文件中。

可能有人会问了，为什么 CSS 代码会进入到 JavaScript 文件中呢？最终它是怎么应用到页面的呢？其实背后的过程主要是，生成的 CSS 代码会以字符串的形式作为一个模块打包到最终结果，然后在运行时由 style-loader 提供的一个函数 injectStylesIntoStyleTag ，来将这个模块加入到页面的 style 标签中，从而最终生效。

比如如下代码，就展示了 injectStylesIntoStyleTag 这个函数的核心部分：创建 style 标签。这里你不需要完全理解代码的内容，只需要知道它是用来动态使用 CSS 代码就可以了。

```javascript
function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};


  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;


    if (nonce) {
      attributes.nonce = nonce;
    }
  }


  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });


  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');


    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }


    target.appendChild(style);
  }


  return st
```

Webpack 官方文档：[https://webpack.js.org/](https://webpack.js.org/)