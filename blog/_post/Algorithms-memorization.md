---
date: 2021-09-22
category: Algorithms
title: 递归优化
cover: /images/memorization.png
tags:
  - 代码之美

---

> 递归中的备忘录：解决重复计算的法宝

<!-- more -->

![](/images/dp-mindmap.png)

### 备忘录（memorization）

为消除重叠子问题，即消灭重复计算的过程。我们可以创建一个备忘录（memorization），在每次计算出某个子问题的答案后，将这个临时的中间结果记录到备忘录里，然后再返回。

接着，每当遇到一个子问题时，我们不是按照原有的思路开始对子问题进行递归求解，而是先去这个备忘录中查询一下。如果发现之前已经解决过这个子问题了，那么就直接把答案取出来复用，没有必要再递归下去耗时的计算了。

对于备忘录，可以考虑使用以下两种数据结构：

- 数组（Array），通常对于简单的问题来说，使用一维数组就足够了。在后续的课程中，你会看到更为复杂的状态存储过程，届时我会指导你使用更高维度（二维甚至三维）的数组来存储状态。
- 哈希表（Hash table），如果你存储的状态不能直接通过索引找到需要的值（比如斐波那契数列问题，你就可以直接通过数组的索引确定其对应子

问题的解是否存在，如果存在你就拿出来直接使用），比如你使用了更高级的数据结构而非简单的数字索引，那么你还可以考虑使用哈希表，即字典来存储中间状态，来避免重复计算的问题。

先看如何使用备忘录来解决斐波那契数列问题，代码：

```java {13}
int fibonacci(int n, int[] memo) {
    if (0 == n || 1 == n) { return n; }
    if (memo[n] != 0) { return memo[n]; } // 看来备忘录中找到了之前计算的结果，既然找到了，直接返回，避免重复计算

    if(n > 1) {
        memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
        return memo[n];
    }

    return 0; // 如果数值无效(比如 < 0)，则返回0
}

int fibonacciAdvance(int n) {
    int[] memo = new int[n + 1];
    return fibonacci(n, memo);
}
```

```c++ {13}
int Fibonacci(int n, std::vector& memo) {
  if (0 == n || 1 == n) { return n; }
  if (memo[n] != 0) { return memo[n]; } // 看来备忘录中找到了之前计算的结果，既然找到了，直接返回，避免重复计算 

  if(n > 1) {
    memo[n] = Fibonacci(n - 1, memo) + Fibonacci(n - 2, memo);
    return memo[n];
  }

  return 0; // 如果数值无效(比如 < 0)，则返回0
}

int FibonacciAdvance(int n) {
  std::vector memo(n + 1, 0); // 初始化备忘录，在这里我使用数组
  return Fibonacci(n, memo);
}
```

从以上代码可以看出，在第13行创建了一个基于数组的备忘录，用来存储中间计算状态。第3行代码十分关键，它从我们的备忘录中查询对应索引位置存储的状态是否已经计算过（值 > 0时），如果计算过了，那么就直接返回之前计算过的答案。

实际上，这就是“剪枝与优化”，在这里把一棵存在巨量冗余的递归树通过剪枝，改造成了一幅不存在冗余的递归图，极大减少了子问题（即递归图中节点）的个数。

通过这种方式，我们大幅缩减了算法的计算量，所有重复的部分都被跳过了。这时，再看看递归的复杂度是多少？

1. 同样，我们先考虑子问题的个数（即上图中节点的总数）。由于本算法不存在冗余计算，子问题就是 F(1), F(2), F(3) … F(10)，因此为 O(n)；
2. 再考虑求解一个子问题的复杂度：没有计算，因此是 O(1)；
3. 综上所述，该算法的时间复杂度是O(n)。


使用算法解决重复计算的第一步就是需要将问题定义成函数，比如上面的硬币问题，我们可以将满足x的最小硬币总数定义成一个函数f(x)：

$$
F(x)=left{begin{array}{c}
min(f(x-c)+1), x>0,f(x-c)e-1,cin C
0,x=0
-1,x<0
end{array}right.
$$

说明：在这个函数中，C 指的是硬币面值的集合。

那如果要处理这个问题，我们只需要避免每次都重复计算 F(x) 的结果就行了。如果有一次的路径中已经计算了 F(8)，那么如果在其它的路径中再次遇到 F(8) 的时候，我们就不需要再次计算这个路径了。

所以我们需要一个集合来存储所有F(x)的结果，F(x) 在计算时首先查询集合中是否存储了 F(x) 的结果，如果有则返回，没有再执行整个计算步骤。

看来，我们已经把指数级 O(2n) 时间复杂度的问题进行了“疯狂”的简化。相较于暴力递归，这就是传说中的“降维打击”。

#### 使用备忘录求解硬币找零问题
现在，让我们再次回到硬币找零问题去实践一遍。首先这是一个可以使用动态规划解决的问题，它存在最优化问题；其次，就像我刚才所说的，该问题存在重叠子问题。

现在，让我们来看看如何使用备忘录，对硬币找零算法的复杂度进行“大刀阔斧”的简化。

我们仿照使用备忘录提高斐波那契数列算法效率的方法，对硬币找零算法进行剪枝和优化。为了简单起见，我在这里直接贴出改进后的算法实现。

```java
int getMinCountsHelper(int total, int[] values, int[] memo) {
   int savedMinCount = memo[total];
   if (savedMinCount != -2) { return savedMinCount; }


   int valueLength = values.length;
   int minCount = Integer.MAX_VALUE;
   for (int i = 0;  i < valueLength; i ++) { // 遍历所有面值
       int currentValue = values[i];
       // 如果当前面值大于硬币总额，那么跳过
       if (currentValue > total) { continue; }

       // 使用当前面值，得到剩余硬币总额
       int rest = total - currentValue;
       int restCount = getMinCountsHelper(rest, values, memo);
       // 如果返回-1，说明组合不可信，跳过
       if (restCount == -1) { continue; }

       // 保留最小总额
       int totalCount = 1 + restCount;
       if (totalCount < minCount) { minCount = totalCount; }
   }
   
   // 如果没有可用组合，返回-1
   if (minCount == Integer.MAX_VALUE) {
       memo[total] = -1;
       return -1;
   }

   memo[total] = minCount; // 记录到备忘录
   return minCount; // 返回最小硬币数量
}

int getMinCountsSol() { // 入口函数
   int[] values = { 3, 5 }; // 硬币面值
   int total = 14; // 总值

   int[] memo = new int[total + 1];// , -2); // 备忘录，没有缓存的元素为-2
   Arrays.fill(memo, -2);
   memo[0] = 0; // 其中0对应的结果也是0，首先存在备忘录中

   // 求得最小的硬币数量，并输出结果
   return getMinCountsHelper(total, values, memo); // 输出结果
}

```

```c++
int GetMinCountsHelper(int total, const std::vector& values, std::vector& memo) {
    auto savedMinCount = memo[total];
    if (savedMinCount != -2) { return savedMinCount; }

    int valueLength = values.size();
    int minCount = INT_MAX;
    for (int i = 0;  i < valueLength; i ++) { // 遍历所有面值
        int currentValue = values[i];
        // 如果当前面值大于硬币总额，那么跳过
        if (currentValue > total) { continue; }

        // 使用当前面值，得到剩余硬币总额
        int rest = total - currentValue;
        int restCount = GetMinCountsHelper(rest, values, memo);
        // 如果返回-1，说明组合不可信，跳过
        if (restCount == -1) { continue; }

        // 保留最小总额
        int totalCount = 1 + restCount;
        if (totalCount < minCount) { minCount = totalCount; }
    }
    
    // 如果没有可用组合，返回-1
    if (minCount == INT_MAX) {
        memo[total] = -1;
        return -1;
    }

    memo[total] = minCount; // 记录到备忘录
    return minCount; // 返回最小硬币数量
}

int GetMinCountsSol() { // 入口函数
    std::vector values = { 3, 5 }; // 硬币面值
    int total = 11; // 总值

    std::vector memo(total + 1, -2); // 备忘录，没有缓存的元素为-2
    memo[0] = 0; // 其中0对应的结果也是0，首先存在备忘录中

    // 求得最小的硬币数量，并输出结果
    return GetMinCountsHelper(total, values, memo); // 输出答案
}
```

在函数中加入了一个memo参数。

因此，对于原来实现的代码，算法时间复杂度可以概括为：

1. 先考虑子问题的个数，我只画了这颗树的一部分，因此从树上这个比较难看出来，但从斐波那契数列的题目上我们可以推广，得到其个数是 O(nm), m=|values|，即指数级别；
2. 再考虑求解一个子问题的复杂度：每个子问题中含有一个循环，因此时间复杂度为 O(m), m=|values|；
3. 综上所述，该算法的时间复杂度是 O(mnm), m=|values|。


而通过备忘录优化后的算法时间复杂度为：

1. 先考虑子问题的个数，如果我们求n元总额的硬币最小数量，那么子问题最多就是 0…n 个，一共 n+1 个子问题；
2. 因为我们缓存了子问题的数量，所以其实每个子问题都只会被求解一次；
3. 针对每个子问题求解，我们都需要通过硬币面额数量知道需要筛选的子问题数量，每个子问题求解时的时间是 O(m), m=|values|；
4. 最后我们可以得知，采用备忘录形式时，整个时间复杂度就是子问题的数量乘以需要考虑的面额数量，也就是 O(m*n), m=|values|。

我在这里创建的备忘录memo其实是一个缓存数组，每次求解函数F(x)之后都会将结果缓存在数组中。数组初始化长度是total+1，也就是可以存储0-total的计算结果。所有元素的初值都是-2，表示没有缓存。然后我们将memo[0] 设置为0，表示公式中如果x为0，那么F(x)的结果也就是0。

接着在 GetMinCountsHelper 函数中，先查找memo中是否已经缓存了当前total的值。如果有则直接返回，如果没有那么重新计算。

重新计算完成后，如果结果为-1（即无效组合），那么就将当前total对应的缓存设置为-1，否则设置为我们计算的结果。

通过备忘录，我们避免了重复计算，即避免重复计算那些已经计算过的子问题。

重叠子问题处理模式
现在，你已经知道了如何处理具体的问题：比如斐波那契数列和硬币找零问题。但是如果我们遇到了类似新问题该如何处理呢？这里我总结一下对这类问题的处理方法。

假设面试问题是这样的：当目标为 x，其中x可能是一个任意长度的向量，目标可能包含多个元素，求最优解 F(x)。举个例子，比如在硬币这个问题里，x 就是硬币总额度，F(x)就是最少的硬币数量。

同时，我们还需要知道问题是求最小值还是最大值，并以此来定义我们的数值函数 G(t)。如果求最小值，那么 G 是 min，如果求最大值，那么 G 就是 max。

除此之外，我们还需要通过当前的问题获得后续的一系列子问题，假定当前得到子问题的参数为 c，得到后续子问题的函数是 S，那么这个函数就是 S(x, c)。

接着，我们就可以用 F(S(x, c)) 来求得子问题的结果。

我们再定义一个函数 V(x)，该函数可以聚合当前参数c和当前子问题的结果。最后，我们还要定义每一步如何与子问题进行叠加。定义一个叠加函数 H(x)。

综上所述，最后得到如下求解公式：

$$
F(x) = H(G(V(F(S(x, c)), c))
$$

因此，解决类似问题时，只需要把问题套用到上面的公式（框架）中，就能用一个递归函数来描述所有的问题。可以尝试把斐波那契数列和硬币问题分别套入这个模型，就知道后面的问题定义该怎么举一反三了。

在定义好问题后，就可以编写基于递归算法的代码了。不过需要注意，上面的公式并不包含边界值的处理。所谓的边界值就是无法再分解为子问题的子问题。


#### 重叠子问题缓存的限制

我们刚刚学习了重叠子问题的处理模式，提炼出了一个通用的求解公式。你可能会问，这种利用重叠子问题的缓存来提升速度的方法是不是万灵药呢？

有一句老话，叫计算机中不存在“银弹”，也就是说没有任何一种方法能够解决世界上的所有问题。通过备忘录的思想来处理重叠子问题的方法亦是如此。

我们回想一下在上一课中提到过的问题，就有不少是不存在重叠子问题的，比如八皇后问题。既然没有重叠子问题，那么通过备忘录来对其优化加速，又从何谈起呢？

有些问题虽然看起来像包含“重叠子问题”的子问题，但是这类子问题可能具有后效性，但我们追求的是 ==无后效性== 。


> **无后效性**
> 
> 所谓无后效性，指的是在通过A阶段的子问题推导B阶段的子问题的时候，我们不需要回过头去再根据B阶段的子问题重新推导A阶段的子问题，即子问题之间的依赖是单向性的。

所以说，如果一个问题可以通过重叠子问题缓存进行优化，那么它肯定都能被画成一棵树。

### 方案弊端

我们可以看到，通过重叠子问题缓存可以极大加速我们的代码执行效率。但是凡事都有两面性，我们毋庸置疑，这种方案肯定是通过某种牺牲换取了性能的提升。

在硬币找零问题中，我们在代码里加入了一个memo数组作为备忘录，这个数组的大小是钱币总额+1。如果计算出F(x)的结果，就把F(x)的结果存在数组中x的位置，这样后续再计算相同的子问题时，我们就可以利用缓存来避免重复计算了。

但这样有个问题，如果我们的钱币总额数量非常巨大，那这个数组的大小就会非常巨大，导致的结果就是会占据大量的内存存储空间，而且有很多的数字其实是不会被求解的，存在很多的“存储空洞”。显然，这是一种浪费。

同样，如果考虑为了节省空间，那么我们可以使用哈希表，但是哈希表的检索性能肯定不如数组。你可能会说，哈希表的插入和查找的算法复杂度是 O(1) 啊，它怎么可能会慢呢？

原因在于，哈希表通常都会使用经过设计的数据结构（比如拉链法）来避免记录碰撞，因此实际的速度肯定不如直接访问数组的特定位置。

因此在这个问题里，我们仍然优先选用数组和指定的索引来快速访问数据。

话说回来，如果遇到一个目标结果 x 是一个向量的情况下，这个数组就会随着向量维度一起提升，比如如果 x 是二维向量，那么缓存数组就必须是二维数组，以此类推。因此向量维度提升造成的空间压力也可能是巨大的。

所以，需要根据实际情况，在空间和时间中寻求一个平衡，虽然这样的经验需要积累，但更多的时候是需要你在编写代码前，将这个问题考虑在内。

### 动态规划总结

动态规划问题一定具备以下三个特征：

1. 重叠子问题：在穷举的过程中（比如通过递归），存在重复计算的现象；
2. 无后效性：子问题之间的依赖是单向性的，某阶段状态一旦确定，就不受后续决策的影响；
3. 最优子结构：子问题之间必须相互独立，或者说后续的计算可以通过前面的状态推导出来。

#### 什么是最优子结构？

什么叫子问题之间必须相互独立？我举一个简单的例子，，假设你在外卖平台购买5斤苹果和3斤香蕉。由于促销的缘故，这两种水果都有一个互相独立的促销价。如果原问题是让你以最低的价格购买这些水果，你该怎么买？显然，由于这两种水果的促销价格相互独立、互不影响，你只需直接购买就能享受到最低折扣的价格。

现在我们得到了正确的结果：最低价格就是直接购买这两种折扣水果。因为这个过程符合最优子结构，打折的苹果和香蕉这两个子问题是互相独立、互不干扰的。

但是，如果平台追加一个条件：折扣不能同时享用。即购买了折扣的苹果就不能享受折扣的香蕉，反之亦然。这样的话，你肯定就不能同时以最低的苹果价格和最低的香蕉价格享受到最低折扣了。

按刚才那个思路就会得到错误的结果。因为子问题并不独立，苹果和香蕉的折扣价格无法同时达到最优，这时最优子结构被破坏。

回过头来，我们再读一下最优子结构的定义。首先，我们知道了什么是子问题之间必须相互独立。

其次，所谓后续的计算可以通过前面的状态推导，是指：如果你准备购买了5斤折扣苹果，那么这个价格（即子问题）就被确定了，继续在购物车追加3斤折扣香蕉的订单，只需要在刚才的价格上追加折扣香蕉的价格，就是最低的总价格（即答案）。

现在，让我们回到硬币找零的问题上来，它满足最优子结构吗？满足。

假设有两种面值的硬币 c[0]=5, c[1]=3，目标兑换金额为 k=11。原问题是求这种情况下求最少兑换的硬币数。

如果你知道凑出 k=6 最少硬币数为 “2”（注意，这是一个子问题），那么你只需要再加 “1” 枚面值为 c[0]=5 的硬币就可以得到原问题的答案，即 2 + 1 = 3。

原问题并没有限定硬币数量，你应该可以看出这些子问题之间没有互相制约的情况，它们之间是互相独立的。因此，硬币找零问题满足最优子结构，可以使用动态规划思想来进行求解。

#### 使用动态规划求解硬币找零


当动态规划最终落到实处，就是一个状态转移方程，这同样是一个吓唬人的名词。不过没关系，其实我们已经具备了写出这个方程的所有工具。现在，就让我带你一起看看如何写出这个状态转移方程。

首先，任何穷举算法（包括递归在内）都需要一个终止条件。那么对于硬币找零问题来说，终止条件是什么呢？当剩余的金额为 0 时结束穷举，因为这时不需要任何硬币就已经凑出目标金额了。在动态规划中，我们将其称之为初始化状态。

接着，我们按照上面提到的凑硬币的思路，找出子问题与原问题之间会发生变化的变量。原问题指定了硬币的面值，同时没有限定硬币的数量，因此它们俩无法作为“变量”。唯独剩余需要兑换的金额是变化的，因此在这个题目中，唯一的变量是目标兑换金额 k。

在动态规划中，我们将其称之为状态参数。同时，你应该注意到了，这个状态在不断逼近初始化状态。而这个不断逼近的过程，叫做状态转移。

接着，既然我们确定了状态，那么什么操作会改变状态，并让它不断逼近初始化状态呢？每当我们挑一枚硬币，用来凑零钱，就会改变状态。在动态规划中，我们将其称之为决策。

终于，我们构造了一个初始化状态->确定状态参数->设计决策的思路。现在万事俱备，只欠东风，让我们一起来写这个状态转移方程。通常情况下，状态转移方程的参数就是状态转移过程中的变量，即状态参数。而函数的返回值就是答案，在这里是最少兑换的硬币数。

我在这里先用递归形式（伪代码形式）描述一下状态转移的过程，这跟我们在上面讨论的挑硬币的过程是一致的。

```javascript
DP(values, k) {
  res = MAX
  for c in values
    // 作出决策，找到需要硬币最少的那个结果
    res = min(res, 1 + DP(values, k-c)) // 递归调用
  
  if res == MAX
    return -1

  return res
}
```

顺着这个思路，我把状态转移方程给写出来，它是这样的：

$$
F(n)=left{begin{array}{c}
0,n=0
-1,n<0
min{ 1+DP(n-c) | c in values }
end{array}right.
$$

> 递归形式的求解几乎就是简单的把题设中的函数表达式照搬过来，因此从数学意义上讲，递归更直观，且易于理解。


#### 递归与动态规划

带备忘录的递归算法也是一种动态规划解法。但是，我们为何不把这种方法作为动态规划面试题的常规解法呢？

这是递归带来的固有问题。

首先，从理论上说，虽然带备忘录的递归算法与动态规划解法的时间复杂度是相同规模的（稍后我就会展示新的动态规划解法），但在计算机编程的世界里，递归是依赖于函数调用的，而每一次函数调用的代价非常高昂。

递归调用是需要基于堆栈才能实现的。而对于基于堆栈的函数调用来说，在每一次调用的时候都会发生环境变量的保存和还原，因此会带来比较高的额外时间成本。这是无法通过时间复杂度分析直接表现出来的。

更重要的是，即便我们不考虑函数调用带来的开销，递归本身的处理方式是自顶向下的。所谓自顶向下，是指访问递归树的顺序是自顶向下的。

因此每次都需要查询子问题是否已经被计算过，如果该子问题已经被计算过，则直接返回备忘录中的记录。也就是说，在带备忘录的递归解法中，无论如何都要多处理一个分支逻辑，只不过这个分支的子分支是不需要进行处理的。

这样的话，我们就可以预想到，如果遇到子问题分支非常多，那么肉眼可见的额外时间开销在所难免。我们不希望把时间浪费在递归本身带来的性能损耗上。

那么，有什么好的办法来规避这个问题呢？我们需要设计一种新的缓存方式，并考虑使用迭代来替换递归。接下来，让我们来一起看看该如何改造我们的算法。

#### 状态缓存与循环

在带备忘录的递归算法中，每次都需要查询子问题是否已经被计算过。针对这一问题，我们可以思考一下，是否有方法可以不去检查子问题的处理情况呢？在执行A问题的时候，确保A的所有子问题一定已经计算完毕了。

仔细想一想，这不就是把处理方向倒过来用自底向上嘛！那么我们具体要怎么做呢？

回顾一下自顶向下的方法，我们的思路是从目标问题开始，不断将大问题拆解成子问题，然后再继续不断拆解子问题，直到子问题不可拆解为止。通过备忘录就可以知道哪些子问题已经被计算过了，从而提升求解速度。

那么如果要自底向上，我们是不是可以首先求出所有的子问题，然后通过底层的子问题向上求解更大的问题。

如果从解路径的角度看动态规划的自底向上处理方式，那么它的形式可以用一个数组来进行表示，而这个数组事实上就是实际的备忘录存储结构。

这样有一个好处，当求解大问题的时候，我们已经可以确保该问题依赖的所有子问题都已经计算过了，那么我们就无需检查子问题是否已经求解，而是直接从缓存中取出子问题的解。

通过自底向上，我们完美地解决掉了递归中由于“试探”带来的性能损耗。有了思路之后，让我们把上一课中的递归代码做些修改，变成新的迭代实现：

```javascript
int getMinCounts(int k, int[] values) {
   int[] memo = new int[k + 1];
   Arrays.fill(memo, -1);
   memo[0] = 0; // 初始化状态

   for (int v = 1; v <= k; v++) {
       int minCount = k + 1; // 模拟无穷大
       for (int i = 0; i < values.length; ++i) {
           int currentValue = values[i];

           // 如果当前面值大于硬币总额，那么跳过
           if (currentValue > v) { continue; }

           // 使用当前面值，得到剩余硬币总额
           int rest = v - currentValue;
           int restCount = memo[rest];
           
           // 如果返回-1，说明组合不可信，跳过
           if (restCount == -1) { continue; }

           // 保留最小总额
           int kCount = 1 + restCount;
           if (kCount < minCount) { minCount = kCount; }
       }

       // 如果是可用组合，记录结果
       if (minCount != k + 1) { memo[v] = minCount; }
   }

   return memo[k];
}

int getMinCountsDPSol() {
   int[] values = { 3, 5 }; // 硬币面值
   int total = 22; // 总值

   // 求得最小的硬币数量
   return getMinCounts(total, values); // 输出答案
}
```


```c++
int GetMinCounts(int k, const std::vector& values) {
    std::vector memo(k + 1, -1); // 创建备忘录
    memo[0] = 0; // 初始化状态

    for (int v = 1; v <= k; v++) {
        int minCount = k + 1; // 模拟无穷大
        for (int i = 0; i < values.size(); ++i) {
            int currentValue = values[i];

            // 如果当前面值大于硬币总额，那么跳过
            if (currentValue > v) { continue; }

            // 使用当前面值，得到剩余硬币总额
            int rest = v - currentValue;
            int restCount = memo[rest];
            
            // 如果返回-1，说明组合不可信，跳过
            if (restCount == -1) { continue; }

            // 保留最小总额
            int kCount = 1 + restCount;
            if (kCount < minCount) { minCount = kCount; }
        }

        // 如果是可用组合，记录结果
        if (minCount != k + 1) { memo[v] = minCount; }
    }

    return memo[k];
}

int GetMinCountsDPSol() {
    std::vector values = { 3, 5 }; // 硬币面值
    int total = 11; // 总值

    // 求得最小的硬币数量
    return GetMinCounts(total, values); // 输出答案
}
```

我们的关注点在GetMinCounts函数上，该函数先定义了一个“新款”状态备忘录，用数组memo来表示（通常将其称之为 DP 数组，DP 是 Dynamic Programming 的缩写即动态规划。你看，是不是高级起来了）。

这个备忘录由数组构成，其定义是：当目标兑换金额为 i 时，至少需要 memo[i] 枚硬币才能凑出。

有了备忘录的定义后，我们接下来再依据状态转移方程的指导来**初始化状态**：

1. 将 F(0) 初始化成 0，即 memo[0]=0；
2. 把备忘录中剩余的位置初始化成 k + 1。凑成金额 k 的硬币数至多只可能等于 k （如果硬币的最低面值是 1），因此初始化为 k + 1 就相当于将这些位置初始化成正无穷大，便于后续**决策**时取最小值。


接着，我们从1开始遍历，求解 F(1) 的结果，直到求解 F(k) 的结果为止。循环结束后我们想要的结果就存储在 memo[k] 中，也就是 F(k) 的解。

在这个基于原来递归代码上改进得到的代码中，我们来看一下每次循环中做了什么。每一次循环都包含一个小循环，这个小循环会遍历所有的面值。

1. 先看当前面额总值是否小于当前硬币面额。如果是，说明组合不存在，直接进入下一轮循环。
 
2. 否则，我们就可以认为已经使用了这一枚硬币，那么就求得使用完硬币后的余额 rest，并从备忘录中获取 F(rest) 的结果：
a. 如果 F(rest) 为 -1，说明 F(rest) 组合不存在，子问题不成立那么当前问题也就无解，直接进入下一轮循环；
b.如果返回的值不是 -1，说明组合存在，那么求 F(rest) + 1，并和当前最小硬币总数比较，取最小值。

3. 内部循环结束后，我们看一下 minCount 的值：
a. 如果是 -1，说明 F(v) 不存在，那么不做任何处理，保留 F(v)=-1 即可；
b. 否则将最小值存入 memo[v]，表示已经求得f(v)的值，准备为后续的问题使用。

这样我们就通过这种自下而上的方法将递归转换成了循环。但是，这段代码还是跟我们常见的动态规划代码有些出入，不过没有关系，经过简单的调整就可以把它变漂亮。我先给出代码

```java
int getMinCounts(int k, int[] values) {
   int[] memo = new int[k + 1]; // 创建备忘录
   memo[0] = 0; // 初始化状态
   for (int i = 1; i < k + 1; i++) { memo[i] = k + 1; }
   
   for (int i = 1; i < k + 1; i++) {
       for (int coin : values) {
           if (i - coin < 0) { continue; }
           memo[i] = Math.min(memo[i], memo[i - coin] + 1); // 作出决策
       }
   }

   return memo[k] == k + 1 ? -1 : memo[k];
}

int getMinCountsDPSolAdvance() {
   int[] values = { 3, 5 }; // 硬币面值
   int total = 22; // 总值

   return getMinCounts(total, values); // 输出答案
}
```

```c++
int GetMinCounts(int k, const std::vector& values) {
    int memo[k + 1]; // 创建备忘录
    memo[0] = 0; // 初始化状态
    for (int i = 1; i < k + 1; i++) { memo[i] = k + 1; }
    
    for (int i = 1; i < k + 1; i++) {
        for (auto coin : values) {
            if (i - coin < 0) { continue; }
            memo[i] = min(memo[i], memo[i - coin] + 1); // 作出决策
        }
    }

    return memo[k] == k + 1 ? -1 : memo[k];
}

int GetMinCountsDPSolAdvance() {
    std::vector values = { 3, 5 }; // 硬币面值
    int total = 11; // 总值

    return GetMinCounts(total, values); // 输出答案
}
```

现在我们看一下，每一次循环中是如何做决策的。每一次循环都包含一个小循环，这个小循环会遍历所有的面值。

1. 跟之前一样，我们先看当前面额总值是否小于当前硬币面额。如果是，则说明组合不存在，直接进入下一轮循环。
 
2. 否则，就可以认为已经使用了这一枚硬币，这时我们要作出决策：
a. 如果采纳了这枚硬币，则凑的硬币数量需要 +1，这时“状态A”是 memo[i - coin] + 1；
b. 如果不采纳这枚硬币，则凑的硬币数量不变，这时“状态B”是 memo[i]；
c. 显然，硬币找零问题是求最值问题（即最少需要几枚硬币凑出总额k）。因此，我们在这里作出决策，在状态A与状态B中谁的硬币数量更少，即取最小值 min(状态A, 状态B)。

1. 当循环结束后，我们看一下备忘录中位置为 k 的值是多少，即 memo[k]：
a. 如果是 k + 1，就意味着在初始化状态时的值没有被更新过，是“正无穷大”。这时按照题目要求，返回 -1；
b. 否则，我们就找到了最少凑出硬币的数量，返回它，就是我们的答案。

这样一来，借助于自底向上的方法，我们成功的将递归转换成了迭代。

这段代码的时间复杂度是非常标准的 O(m*n)。它不会有任何额外的性能开销，我们通过动态规划完美地解决了硬币找零问题。

#### 通用的动态规划

在掌握了如何使用标准的动态规划来解决硬币找零问题后，我们有必要将其推而广之，来看看解决动态规划面试问题的通用框架，或者说套路。

在这里，我会给出一个经验总结，而非严格的数学推导。

动态规划问题的核心是写出正确的状态转移方程，为了写出它，我们要先确定以下几点：

1. 初始化状态：由于动态规划是根据已经计算好的子问题推广到更大问题上去的，因此我们需要一个“原点”作为计算的开端。在硬币找零问题中，这个初始化状态是 memo[0]=0；
2. 状态：找出子问题与原问题之间会发生变化的变量。在硬币找零问题中，这个状态只有一个，就是剩余的目标兑换金额 k；
3. 决策：改变状态，让状态不断逼近初始化状态的行为。在硬币找零问题中，挑一枚硬币，用来凑零钱，就会改变状态。
一般来说，状态转移方程的核心参数就是状态。

接着，我们需要自底向上地使用备忘录来消除重叠子问题，构造一个备忘录（在硬币找零问题中，它叫 memo。为了通用，我们以后都将其称之为 DP table）。

最后，我们需要实现决策。在硬币找零问题中，决策是指挑出需要硬币最少的那个结果。通过这样几个简单步骤，我们就能写出状态转移方程：

$$
DP(n)=left{begin{array}{c}
0,n=0
-1,n<0
min(DP(n), 1+DP(n-c)), c in values
end{array}right.
$$

由于是经验，因此它在90%以上的情况下都是有效的，而且易于理解。


#### 从贪心算法到动态规划

我们从最开始的贪心算法，到暴力递归、带备忘录的递归，通过分析问题最终推导出了动态规划解法。这么做的目的在于，当我们在后续课程中扩展到复杂面试问题时，你仍然能够拥有清晰的核心思路。

到这儿，我们已经完美地解决了硬币找零问题，是时候做个小小的总结了（基于第1～4课）。

首先，贪心算法是根据当前阶段得到局部最优解，然后再看下一个阶段，逐个求解。这样导致的问题就是，我们可能永远无法得到真正的最优解：整体最优解。

为了解决这个问题，我们在贪心算法中加入了回溯的过程。如果无法求解的时候，就会返回，然后重新尝试当前阶段的“局部次优方案”，重新计算这种情况下的解。这样一来，我们至少保证了所有问题都能求得一个解。

但是如果遇到一些局部最优解前提条件不一定满足全局最优解的情况，这种方法也不一定能让我们找到整体最优解，因为贪心算法里我们找到一个解就结束了，如果约束不足，那么返回可能不一定是整体最优解。

为了解决贪心算法的问题，真正求得整体最优解，我们就必须得到问题解的所有可能组合。这个时候我们就要利用递归来解决问题。

递归就是自顶向下求得满足问题条件的所有组合，并计算这些组合的解，最后从这些组合的解中取出最优解，这样暴力计算出来的结果必定是整体最优解。

但是这样就又出现了效率问题，暴力递归在计算量巨大的情况下，时间复杂度实在太高了，几乎会呈现指数爆炸形式。那么我们就得考虑是否有些问题可以进行剪枝优化。

我提出了一些剪枝优化的方法，重点介绍的就是利用重叠子问题进行优化。在递归求解过程中我们会把一个大问题分解成多个子问题，那些在求解计算分支中可能被反复求解的子问题就是所谓的重叠子问题。

如果这些重叠子问题无后效性，那么我们就可以利用缓存的方法，在求得每个子问题的解之后将求解结果存入缓存数组中。如果在后续的计算分支中遇到相同的子问题，就直接从备忘录中取出我们已经计算过的结果。

这样一来，我们就不需要浪费时间重复求解已经求解的问题，在这种情况下可以将时间复杂度约束在多项式级别。