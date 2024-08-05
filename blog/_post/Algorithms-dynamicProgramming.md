---
date: 2021-09-20
category: Algorithms
title: 动态规划
cover: /images/fib-dp.png
tags:
  - 代码之美

---

> 将大问题分解为小问题。

<!-- more -->

![](/images/dp-mindmap.png)

### 贪心算法

#### 硬币找零问题
给定n种不同面值的硬币，分别记为c[0], c[1], c[2], … c[n]，同时还有一个总金额k，编写一个函数计算出最少需要几枚硬币凑出这个金额k？每种硬币的个数不限，且如果没有任何一种硬币组合能组成总金额时，返回 -1。

```
示例 1：

输入：c[0]=1, c[1]=2, c[2]=5, k=12
输出：3 
解释：12 = 5 + 5 + 2

示例 2：

输入：c[0]=5, k=7
输出：-1
解释：只有一种面值为5的硬币，怎么都无法凑出总价值为7的零钱。
```

题目中有一个醒目的提示词，那就是“最少”。

举个简单的例子，按照示例1的题设，有三种不同面值的硬币，分别为c1=1, c2=2, c3=5，在没有“最少”这一前提条件下你能罗列出几种不同的答案？我在这里随意列出几个：

解1：输出：5，因为 5 + 2 + 2 + 2 + 1 = 12。
解2：输出：6，因为 2 + 2 + 2 + 2 + 2 + 2 = 12。
解3：输出：12，因为 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 = 12。
所以，这是一个求最值的问题。那么求最值的核心问题是什么呢？嗯，无非就是穷举，显然，就是把所有可能的凑硬币方法都穷举出来，然后找找看最少需要多少枚硬币，那么最少的凑法，就是这道题目的答案。

在面试中，一般来说穷举从来都不是一个好方法。除非你要的结果就是所有的不同组合，而不是一个最值。但即便是求所有的不同组合，在计算的过程中也仍然会出现重复计算的问题，我们将这种现象称之为重叠子问题。

> 重叠子问题：我们在罗列所有可能答案的过程中，可能存在重复计算的情况。

#### 贪心算法

贪心算法是指它的每一步计算作出的都是在当前看起来最好的选择，也就是说它所作出的选择只是在某种意义上的局部最优选择，并不从整体最优考虑。在这里，我把这两种选择的思路称作局部最优解和整体最优解。

因此，我们可以得到贪心算法的基本思路：

1. 根据问题来建立数学模型，一般面试题会定义一个简单模型；
2. 把待求解问题划分成若干个子问题，对每个子问题进行求解，得到子问题的局部最优解；
3. 把子问题的局部最优解进行合并，得到最后基于局部最优解的一个解，即原问题的答案。


#### 解题思路

既然这道题问的是最少需要几枚硬币凑出金额k，那么是否可以尝试使用贪心的思想来解这个问题呢？从面值最大的硬币开始兑换，最后得出的硬币总数很有可能就是最少的。

我们从 c[0]=5, c[1]=3 且k=11 的情况下寻求最少硬币数。按照“贪心原则”，我们先挑选面值最大的，即为5的硬币放入钱包。接着，还有6元待解（即11-5 = 6）。这时，我们再次“贪心”，放入5元面值的硬币。

![greedy1](/images/greedy.png)

结合代码再理解一下算法的执行步骤：

```java
int getMinCoinCountHelper(int total, int[] values, int valueCount) {
    int rest = total;
    int count = 0;

    // 从大到小遍历所有面值
    for (int i = 0; i < valueCount; ++ i) {
        int currentCount = rest / values[i]; // 计算当前面值最多能用多少个
        rest -= currentCount * values[i]; // 计算使用完当前面值后的余额
        count += currentCount; // 增加当前面额用量

        if (rest == 0) {
            return count;
        }
    }

    return -1; // 如果到这里说明无法凑出总价，返回-1
}

int getMinCoinCount() {
    int[] values = { 5, 3 }; // 硬币面值
    int total = 11; // 总价
    return getMinCoinCountHelper(total, values, 2); // 输出结果
}
```

```c++
int GetMinCoinCountHelper(int total, int* values, int valueCount) {
    int rest = total;
    int count = 0;

    // 从大到小遍历所有面值
    for (int i = 0; i < valueCount; ++ i) {
        int currentCount = rest / values[i]; // 计算当前面值最多能用多少个
        rest -= currentCount * values[i]; // 计算使用完当前面值后的余额
        count += currentCount; // 增加当前面额用量

        if (rest == 0) {
            return count;
        }
    }

    return -1; // 如果到这里说明无法凑出总价，返回-1
}

int GetMinCoinCount() {
    int values[] = { 5, 3 }; // 硬币面值
    int total = 11; // 总价
    return GetMinCoinCountHelper(total, values, 2); // 输出结果
}
```

这段代码就是简单地从最大的面值开始尝试，每次都会把当前面值的硬币尽量用光，然后才会尝试下一种面值的货币。

嗯。。。你有没有发现问题？那就是还剩1元零钱待找，但是我们只有c[0]=5, c[1]=3两种面值的硬币，怎么办？这个问题无解了，该返回-1了吗？显然不是。

我们把第2步放入的5元硬币取出，放入面值为3元的硬币试试看。这时，你就会发现，我们还剩3元零钱待找。

![greedy2](/images/greedy2.png)

正好我们还有c[1]=3的硬币可以使用，因此解是c[0]=5, c[1]=3, c[1]=3，即最少使用三枚硬币凑出了k=11这个金额。

我们对贪心算法做了改进，引入了回溯来解决前面碰到的“过于贪心”的问题。同样地，我把改进后的代码贴在这，你可以再看看跟之前算法实现的区别。

```java
int getMinCoinCountOfValue(int total, int[] values, int valueIndex) {
    int valueCount = values.length;
    if (valueIndex == valueCount) { return Integer.MAX_VALUE; }

    int minResult = Integer.MAX_VALUE;
    int currentValue = values[valueIndex];
    int maxCount = total / currentValue;

    for (int count = maxCount; count >= 0; count --) {
        int rest = total - count * currentValue;

        // 如果rest为0，表示余额已除尽，组合完成
        if (rest == 0) {
            minResult = Math.min(minResult, count);
            break;
        }

        // 否则尝试用剩余面值求当前余额的硬币总数
        int restCount = getMinCoinCountOfValue(rest, values, valueIndex + 1);

        // 如果后续没有可用组合
        if (restCount == Integer.MAX_VALUE) {
            // 如果当前面值已经为0，返回-1表示尝试失败
            if (count == 0) { break; }
            // 否则尝试把当前面值-1
            continue;
        }

        minResult = Math.min(minResult, count + restCount);
    }

    return minResult;
}

int getMinCoinCountLoop(int total, int[] values, int k) {
    int minCount = Integer.MAX_VALUE;
    int valueCount = values.length;
    
    if (k == valueCount) {
        return Math.min(minCount, getMinCoinCountOfValue(total, values, 0));
    }

    for (int i = k; i <= valueCount - 1; i++) {
        // k位置已经排列好
        int t = values[k];
        values[k] = values[i];
        values[i]=t;
        minCount = Math.min(minCount, getMinCoinCountLoop(total, values, k + 1)); // 考虑后一位

        // 回溯
        t = values[k];
        values[k] = values[i];
        values[i]=t;
    }

    return minCount;
}

int getMinCoinCountOfValue() {
    int[] values = { 5, 3 }; // 硬币面值
    int total = 11; // 总价
    int minCoin = getMinCoinCountLoop(total, values, 0);
    
    return (minCoin == Integer.MAX_VALUE) ? -1 : minCoin;  // 输出答案
}

```

```c++
int GetMinCoinCountOfValue(int total, int* values, int valueIndex, int valueCount) {
    if (valueIndex == valueCount) { return INT_MAX; }

    int minResult = INT_MAX;
    int currentValue = values[valueIndex];
    int maxCount = total / currentValue;

    for (int count = maxCount; count >= 0; count --) {
        int rest = total - count * currentValue;

        // 如果rest为0，表示余额已除尽，组合完成
        if (rest == 0) {
            minResult = min(minResult, count);
            break;
        }

        // 否则尝试用剩余面值求当前余额的硬币总数
        int restCount = GetMinCoinCountOfValue(rest, values, valueIndex + 1, valueCount);

        // 如果后续没有可用组合
        if (restCount == INT_MAX) {
            // 如果当前面值已经为0，返回-1表示尝试失败
            if (count == 0) { break; }
            // 否则尝试把当前面值-1
            continue;
        }

        minResult = min(minResult, count + restCount);
    }

    return minResult;
}

int GetMinCoinCountLoop(int total, int* values, int valueCount, int k) {
    int minCount = INT_MAX;
    if (k == valueCount) {
        return min(minCount, GetMinCoinCountOfValue(total, values, 0, valueCount));
    }

    for (int i = k; i <= valueCount - 1; i++) {
        // k位置已经排列好
        int t = values[k];
        values[k] = values[i];
        values[i]=t;
        minCount = min(minCount, GetMinCoinCountOfValue(total, values, 0, valueCount));
        minCount = min(minCount, GetMinCoinCountLoop(total, values, valueCount, k + 1)); // 考虑后一位

        // 回溯
        t = values[k];
        values[k] = values[i];
        values[i]=t;
    }

    return minCount;
}

int GetMinCoinCountOfValue() {
    int values[] = { 5, 3 }; // 硬币面值
    int total = 11; // 总价
    int minCoin = GetMinCoinCountLoop(total, values, 2, 0);
    
    return (minCoin == INT_MAX) ? -1 : minCoin;
}
```


改进后的算法实现在之前的基础上增加上了一个回溯过程。简单地说就是多了一个递归，不断尝试用更少的当前面值来拼凑。只要有一个组合成功，我们就返回总数，如果所有组合都尝试失败，就返回-1。

#### 贪心算法的局限性

从上面这个例子我们可以看出，如果只是简单采用贪心的思路，那么到用完2个5元硬币的时候我们就已经黔驴技穷了——因为剩下的1元无论如何都没法用现在的硬币凑出来。这是什么问题导致的呢？

这就是贪心算法所谓的局部最优导致的问题，因为我们每一步都尽量多地使用面值最大的硬币，因为这样数量肯定最小，但是有的时候我们就进入了死胡同，就好比上面这个例子。

所谓局部最优，就是只考虑“当前”的最大利益，既不向前多看一步，也不向后多看一步，导致每次都只用当前阶段的最优解。

那么如果纯粹采用这种策略我们就永远无法达到整体最优，也就无法求得题目的答案了。至于能得到答案的情况那就是我们走狗屎运了。

虽然纯粹的贪心算法作用有限，但是这种求解局部最优的思路在方向上肯定是对的，毕竟所谓的整体最优肯定是从很多个局部最优中选择出来的，因此所有最优化问题的基础都是贪心算法。

回到前面的例子，我只不过是在贪心的基础上加入了失败后的回溯，稍微牺牲一点当前利益，仅仅是希望通过下一个硬币面值的局部最优达到最终可行的整体最优。

所有贪心的思路就是我们最优化求解的根本思想，所有的方法只不过是针对贪心思路的改进和优化而已。回溯解决的是正确性问题，而动态规划则是解决时间复杂度的问题。


### 贪心算法失效了怎么办

#### 从最优化问题到递归

贪心算法失效的很大一个原因在于它明显的局限性：它几乎只考虑局部最优解。所谓局部最优，就是只考虑当前的最大利益，既不向前多看一步，也不向后多看一步，导致每次都只用当前阶段的最优解。

因此在绝大多数情况下，贪心算法不能得到整体最优解，但它的解是最优解的一个很好近似。同时，也是所有讨论最优化问题的核心基础。

既然无法通过贪心算法达到整体最优，就得换一个思路了：我们得从整体最优的层面上解决这个难缠的算法问题。

##### 最优化问题的本质

所谓最优化问题，就是指在某些约束条件下，决定可选择的变量应该取何值，使所选定的目标函数达到最优的问题。

从数学意义上说，最优化方法是一种求极值的方法，即在一组约束为等式或不等式的条件下，使系统的目标函数达到极值，即最大值或最小值。

如果只是从概念上来看最优化问题真的是玄而又玄，所以在上一课中我用了硬币找零的例子，引出了最优化的概念，以便你理解。

在数学里一切都是函数，现在我们先把这个问题用函数形式来表示。为了易于理解，下面我们不会使用向量。

我们假定需要给出 $y$ 元硬币，硬币面额是5元和3元，求出需要的最少硬币数量。所谓的最少硬币数量就是5元硬币和3元硬币的总数，假定5元硬币数量为$x_{0}$，3元硬币数量为$x_{1}$，那么用函数表示就是：

$$
f(x_{0}, x_{1})=x_{0}+x_{1}
$$

这就是所谓的“目标函数”。

但是这个函数现在是没有任何限制的，我们希望对此进行约束，使得5元硬币和3元硬币的面值综合为$y$。为此我们需要给出一个约束：

$$5x_{0}+3x_{1}=y$$

这个时候我们的问题就变成了，当满足这个约束条件的时候，求解函数中的变量$x_{0}$和$x_{1}$，使得目标函数$f(x_{0}, x_{1})$的取值最小。如果用数学的描述方法来说的话，就是下面这样：

$${argmin}_{(x_0,x_1)in S} (x_0+x_1)$$

这个就是我们常见的$argmin$表示方式。它的意思是：当$(x_{0}, x_{1})$属于$S$这个集合的时候，希望知道$x_{0} + x_{1}$的最小值是多少。其中$S$集合的条件就是上面的约束。

所以最优化问题在我们生活中是非常普遍的，只不过大多数问题可能都像硬币找零问题这样看起来普普通通，概念其实是不难理解的。

回到硬币找零这个问题上。由于$(x_{0}, x_{1})$都是离散的值，因此所有满足上述约束的$(x_{0}, x_{1})$组合，就是我们最终所求的集合！而这个最优化问题的本质就是：从所有满足条件的组合$(x_{0},x_{1})$中找出一个组合，使得$x_{0}+x_{1}$的值最小。

所以，你会发现在这种离散型的最优化问题中，本质就是从所有满足条件的组合（能够凑出$y$元）中选择出使得我们的目标函数（所有硬币数量之和）最小的那个组合。而这个所谓满足条件的组合不就是$argmin$公式中的那个集合$S$吗？

因此，这种离散型的最优化问题就是去所有满足条件的组合里找出最优解的组合。我曾多次提到的局部最优就是在一定条件下的最优解，而整体最优就是我们真正希望得到的最优解。

那么我们的视角就转到另一边了：如何去找到这个最优解呢？


##### 枚举与递归：最优组合的求解策略

如果想得到最优组合，那么最简单直接的方法肯定就是枚举。枚举就是直接求出所有满足条件的组合，然后看看这些组合是否能得到最大值或者最小值。

在硬币找零问题中，假设现在需要给出25元的硬币，有两种组合，分别是(5, 0)和(2, 5)，也就是5个5元硬币，或者2个5元硬币加上5个3元硬币，那么硬币数量最小的组合肯定就是(5, 0)。

所以最简单的方法就是找出所有满足条件的组合，也就是上面两个组合，然后去看这些组合中的最优解。

枚举本身很简单，就是把所有组合都遍历一遍即可。可现在问题就是，如何得到这些组合呢？

这就需要我们通过一些策略来生成所有满足条件的组合。而递归正是得到这些组合的方法。在解决问题前，我们先回顾一下递归问题的本质。

#### 递归与问题表达

我们可以看出，其实最优化问题使用递归来处理是非常清晰的，递归是搜索组合的一种非常直观的思路。

当我在稍后的课程里讨论动态规划时，你就会发现所有问题都需要被描述成递归的形式来讨论。

所以我们有必要先巩固一下递归的概念。首先是在数学中我们怎么去用递归描述一个问题，然后是如何用递归描述最优化问题的解法。

##### 从斐波那契数列说起

严格来说，斐波那契数列问题不是最优化问题，但它能很好地展示递归的概念。我们先来看一下斐波那契数列的问题描述。

问题：斐波那契数通常用 F(n) 表示，形成的序列称为斐波那契数列。该数列由 0 和 1 开始，后面的每一项数字都是前面两项数字的和：

$$F(n)=left{begin{array}{c}
0,n=0
1,n=1
F(n-1)+F(n-2),n>1
end{array}right.
$$

```
示例 1：

输入：2
输出：1
解释：F(2) = F(1) + F(0) = 1 + 0 = 1。
示例 2：

输入：3
输出：2
解释：F(3) = F(2) + F(1) = 1 + 1 = 2.
```

很多人在解算法面试问题的时候有一种倾向性，那就是使用迭代而非递归来求解问题。

```java
int fibonacci(int n) {
    int[] resolution = {0, 1}; // 解的数组
    if(n < 2) { return resolution[n]; }

    int i = 1;
    int fib1 = 0, fib2 = 1, fib = 0;
    while(i < n) {
        fib = fib1 + fib2;
        fib1 = fib2;
        fib2 = fib;
        i++;
    }

    return fib; // 输出答案
}
```

```c++
int Fibonacci(int n) {
    std::vector resolution = {0, 1}; // 解的数组
    if(n < 2) { return resolution[n]; }
    
    int i = 1;
    int fib1 = 0, fib2 = 1, fib = 0;
    while(i < n) {
    	fib = fib1 + fib2;
    	fib1 = fib2;
    	fib2 = fib;
    	i++;
    }
    
    return fib; // 输出答案
} 
```

这样的解法固然没错，但是它几乎脱离了题设的数学表达形式。在这道题目中，出题者“刻意”地写出了求解斐波那契数列的函数表达式，这其中有没有什么别的含义或原因呢？

当然有了，这个函数表达式很好地反应出了计算机科学中常见的算法形式：递归。下面，我们来看看斐波那契数列与递归之间的关系。

##### 使用递归求解斐波那契数列

事实上，斐波那契数列的数学形式就是递归的，我在这里直接贴出其递归形式的算法代码：

```java
int Fibonacci(int n) {
  if (0 == n || 1 == n) { return n; }
  if(n > 1) { return Fibonacci(n - 1) + Fibonacci(n - 2); }

  return 0; // 如果输入n有误，则返回默认值
}
```

递归形式的求解几乎就是简单的把题设中的函数表达式照搬过来，因此我们说从数学意义上讲，递归更直观，且易于理解。

##### 使用递归求解硬币问题

可以看出，理解递归并不难，现在把这种思路套用到求解硬币的问题上来。

贴出使用递归求解硬币问题的代码实现：

```java
void getMinCountsHelper(int total, int[] values, ArrayList currentCounts, ArrayList> combinations) {
    if (0 == total) { // 如果余额为0，说明当前组合成立，将组合加入到待选数组中
        combinations.add(new ArrayList(currentCounts));
        return;
    }

    int valueLength = values.length;
    for (int i = 0;  i < valueLength; i ++) { // 遍历所有面值
        int currentValue = values[i];
        if (currentValue > total) { // 如果面值大于当前总额，直接跳过
            continue;
        }

        // 否则在当前面值数量组合上的对应位置加1
        ArrayList newCounts = new ArrayList(currentCounts);
        newCounts.set(i, newCounts.get(i)+1);
        int rest = total - currentValue;

        getMinCountsHelper(rest, values, newCounts, combinations); // 求解剩余额度所需硬币数量
    }
}

int getMinimumHelper(ArrayList> combinations) {
    // 如果没有可用组合，返回-1
    if (0 == combinations.size()) { return -1; }

    int minCount = Integer.MAX_VALUE;
    for (ArrayList counts : combinations) {
        int total = 0; // 求当前组合的硬币总数
        for (int count : counts) { total += count; }

        // 保留最小的
        if (total < minCount) { minCount = total; }
    }

    return minCount;
}

int getMinCountOfCoins() {
    int[] values = { 5, 3 }; // 硬币面值的数组
    int total = 11; // 总值

    ArrayList initialCounts = new ArrayList<>(Collections.nCopies(values.length, 0)); // 初始值(0,0)

    ArrayList> coinCombinations = new ArrayList<>(); // 存储所有组合
    getMinCountsHelper(total, values, initialCounts, coinCombinations); // 求解所有组合（不去重）
    
    return getMinimumHelper(coinCombinations); // 输出答案
}

```


```c++ 
void GetMinCountsHelper(int total, const std::vector& values, std::vector currentCounts, std::vector>& combinations) {
    if (!total) { // 如果余额为0，说明当前组合成立，将组合加入到待选数组中
        combinations.push_back(currentCounts);
        return;
    }

    int valueLength = values.size();
    for (int i = 0;  i < valueLength; i ++) { // 遍历所有面值
        int currentValue = values[i];
        if (currentValue > total) { // 如果面值大于当前总额，直接跳过
            continue;
        }

        // 否则在当前面值数量组合上的对应位置加1
        std::vector newCounts = currentCounts;
        newCounts[i] ++;
        int rest = total - currentValue;
        
        GetMinCountsHelper(rest, values, newCounts, combinations); // 求解剩余额度所需硬币数量
    }
}

int GetMinimumHelper(const std::vector>& combinations) {
    // 如果没有可用组合，返回-1
    if (!combinations.size()) { return -1; }

    int minCount = INT_MAX;
    for (const std::vector& counts : combinations) {
        int total = 0; // 求当前组合的硬币总数
        for (int count : counts) { total += count; }

        // 保留最小的
        if (total < minCount) { minCount = total; }
    }

    return minCount;
}

int GetMinCountOfCoins() {
    std::vector values = { 5, 3 }; // 硬币面值的数组
    int total = 11; // 总值

    std::vector initialCounts(values.size(), 0); // 初始值(0,0)
    std::vector> coinCombinations; // 存储所有组合
    GetMinCountsHelper(total, values, initialCounts, coinCombinations); // 求解所有组合（不去重）

    return GetMinimumHelper(coinCombinations); // 输出答案
}
```



从代码里可以看出，这里的操作被明确分成了两步：

1. 求解所有满足条件的组合；
2. 从组合中选出总和最小的组合。如果找不到满足条件的组合那么就返回-1。



我们也可以将这两步合并成一步来解决，就像下面这段代码。

```java
int getMinCountsHelper(int total, int[] values) {
    // 如果余额为0，说明当前组合成立，将组合加入到待选数组中
    if (0 == total) { return 0; }

    int valueLength = values.length;
    int minCount = Integer.MAX_VALUE;
    for (int i = 0;  i < valueLength; i ++) { // 遍历所有面值
        int currentValue = values[i];

        // 如果当前面值大于硬币总额，那么跳过
        if (currentValue > total) { continue; }

        int rest = total - currentValue; // 使用当前面值，得到剩余硬币总额
        int restCount = getMinCountsHelper(rest, values);

        // 如果返回-1，说明组合不可信，跳过
        if (restCount == -1) { continue; }

        int totalCount = 1 + restCount; // 保留最小总额
        if (totalCount < minCount) { minCount = totalCount; }
    }

    // 如果没有可用组合，返回-1
    if (minCount == Integer.MAX_VALUE) { return -1; }

    return minCount; // 返回最小硬币数量
}

int getMinCountOfCoinsAdvance() {
    int[] values = { 3, 5 }; // 硬币面值的数组
    int total = 11; // 总值

    return getMinCountsHelper(total, values); // 输出答案
}
```

```c++
int GetMinCountsHelper(int total, const std::vector& values) {
    // 如果余额为0，说明当前组合成立，将组合加入到待选数组中
    if (!total) { return 0; }

    int valueLength = values.size();
    int minCount = INT_MAX;
    for (int i = 0;  i < valueLength; i ++) { // 遍历所有面值
        int currentValue = values[i];

        // 如果当前面值大于硬币总额，那么跳过
        if (currentValue > total) { continue; }

        int rest = total - currentValue; // 使用当前面值，得到剩余硬币总额
        int restCount = GetMinCountsHelper(rest, values);

        // 如果返回-1，说明组合不可信，跳过
        if (restCount == -1) { continue; }

        int totalCount = 1 + restCount; // 保留最小总额
        if (totalCount < minCount) { minCount = totalCount; }
    }

    // 如果没有可用组合，返回-1
    if (minCount == INT_MAX) { return -1; }

    return minCount; // 返回最小硬币数量
}

int GetMinCountOfCoinsAdvance() {
    std::vector values = { 5, 3 }; // 硬币面值的数组
    int total = 11; // 总值

    return GetMinCountsHelper(total, values); // 输出答案
}

```


在这段代码中，每一次递归返回的值，都是后续组合之和的最小值。它不再存储所有的组合，直到回退到递归的顶层。

这样可以极大节省存储空间，这是处理递归问题的通用方法。一般来说，你都应该用这种算法处理方式来解递归问题。

#### 深入理解递归

为什么递归能帮助我们解决最优化问题？

**堆栈与递归的状态存储**

在计算机中，实现递归必须建立在堆栈的基础上，这是因为每次递归调用的时候我们都需要把当前函数调用中的局部变量保存在某个特定的地方，等到函数返回的时候再把这些局部变量取出来。

而用于保存这些局部变量的地方也就是堆栈了。

因此，你可以看到递归可以不断保存当前求解状态并进入下一层次的求解，并在得到后续阶段的解之后，将当前求解状态恢复并与后续求解结果进行合并。

在硬币找零问题中，我们可以放心的在函数中用循环不断遍历，找出当前面值硬币的可能数量。而无需用其它方法来存储当前或之前的数据。

得益于递归，我们通过堆栈实现了状态存储，这样的代码看起来简单、清晰明了。在本节课稍后的内容中，在我讲到递归树的求解组合空间时，你会更清晰地认识到堆栈和状态存储带来的价值！

**递归与回溯**

在求解最优化问题的时候，我们经常会用到回溯这个策略。

上一课中，我们已经提到过回溯的思想。在硬币找零这个问题里，具体说就是如果遇到已经无法求解的组合，那么我们就往回退一步，修改上一个面值的硬币数量，然后再尝试新的组合。

递归这种形式，正是赋予了回溯这种可以回退一步的能力：它通过堆栈保存了上一步的当前状态。

因此，如果想要用回溯的策略来解决问题，那么递归应该是你的首选方法。所以说，回溯在最优化问题中有多么重要，递归也就有多么重要。

**树形结构与深度优先搜索**

为了理解递归，我在这里用合适的结构来描述递归的求解过程。这种结构正是计算机数据结构中的树。如下图所示：

![](/images/recursion1.png)

可以从中看到形象的递归求解过程，每个节点的 /（斜线）左边表示当前节点使用的硬币面值，右边表示使用面值后的余额。图中的蓝色节点就表示我们目前得到的解。

递归的过程的确就是一个树形结构，而递归也就是一个深度优先搜索的过程，先找到下一步的解，然后再回退，如此往复。

所以我们可以这样理解递归：作为一个算法解决方案，它采用了深度优先搜索的策略，去搜索所有可能的组合，并得到最优解的最优化问题。

如果在每个节点上加上当前这个节点求得的组合结果，就可以用递归树表示**求解的组合空间**：

![](/images/recursion2.png)

**通过穷举法从所有的解中得到最优解**

从上图中我们可以发现，每个节点都存储了一个当前求解过程中的组合，和后续节点的组合合并到一起形成完整的答案。

而真正的求解组合，就是把所有余额为0的组合拿出来，经过去重之后得到的结果。

所以，你可以看到求解的组合就蕴含在这个递归的树形结算的节点空间中，这也就是为什么递归策略是行之有效的：我们可以通过穷举法从所有的解中得到最优解。

#### 暴力递归的问题与优化

**性能问题**

暴力递归的最后一个特点就是穷举（都叫暴力，你说是不是）。如果我们只使用朴素的递归思路解题，就需要通过递归来暴力穷举出所有的组合，而且我们穷举的不只是组合，还是所有可能得到目标组合的组成路径！

这个在上面的图中我们可以看到，同样是求解(2, 5)这个组合，图中有多少种路径？这还只是25元和两种面值的情况。如果求解的金额和面值数量增加，那么我们可以看到这个树会以非常难以置信的方式增长，那么带来的性能问题就是灾难性的。

如果你仔细观察一下，就会发现这个树会随着总额的增加呈现指数形式的增长。对于这种事情，我们难以接受。

因此，递归只是让问题可以求解，但是如果数据规模过大的时候暴力递归会引发极大的性能问题。

**可读性与调试问题**

虽然递归在数学意义上非常直观，但是如果问题过于复杂，一般是无法直接画出上面我画的那棵求解树的。

有画求解树的时候，我们可以想出我们的求解过程是怎么进行的，但如果求解树的分支极多，那么很多人就很难继续在脑海中模拟出整个求解过程了。

因此，一旦程序出现bug，当你想尝试去调试的时候，就会发现这样的代码几乎没有调试的可能性。这种问题在数据规模很大的情况下尤为明显。

那么针对性能低下、代码可读性降低和调试问题，我们有什么办法去解决吗？

##### 优化暴力递归：剪枝与优化

你可以从前面的图中看到，这棵树中有很多分支是完全相同的：起码从理论上讲最终只有两个组合。但是这棵树到达同一种组合的路径却非常多，所以优化递归的思路其实就是如何减少搜索的分支数量。

分支数量减少了，递归效率也就高了。这就是所谓的剪枝优化。对于优化方法，这里我提供两种思路给你。

1. 参考贪心算法

第一种思路是仿照贪心算法，从整个搜索策略上来调整。也就是说，你要考虑这个问题的性质，即面值大的硬币用得足够多，那么这个组合的硬币总数肯定就最小。

所以在每一次递归时，我们不应该暴力地搜索所有的面值，而应该从面值最大的硬币着手，不断尝试大面值硬币的最大情况。

如果无法满足条件再减少一个，再递归搜索。最后的代码就跟我在上一课中写给你的回溯代码一样，即通过贪心这种思路结合递归实现一种组合搜索。

殊途同归啊！我们从递归的角度重新解释了这个算法问题，而且代码实现也是一样的。

2. 从解空间图解释

除了参考贪心算法的思想，我们还可以从解空间的角度来解释这个问题。

注意观察：在解空间的图中，只要是余额相同的情况下，后面的搜索路径是完全一致的。

![](/images/recursion3.png)

在图中圈出的两个部分就是重复的搜索路径。因为余额都是12元，所以后续的求解路径和结果完全相同。

这是一个重要线索，在这个硬币求解问题中，当余额相同的时候，最优解是确定的。那么如果能够避免相同余额下的重复搜索过程，算法执行速度是不是可以加快了？

这就是提到过的**重叠子问题**。可以把求解12元的硬币数量理解成求解25元的硬币数量的一个子问题。在求解25元硬币过程中，会有很多种情况都要求解12元硬币的最优解。我们把这类会出现重复求解的子问题称之为重叠子问题。






