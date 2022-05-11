---
date: 2021-12-29
category: Research
title: 译：Overlap Classification Mechanism for Skeletal Bone Age Assessment
tags:
  - 科研

---

> 骨骼骨龄评估的重叠分类机制

<!-- more -->



## Abstract

The bone development is a continuous process, however, discrete labels are usually used to represent bone ages. This inevitably causes a semantic gap between actual situation and label representation scope. In this paper, we present a novel method named as overlap classification network to narrow the semantic gap in bone age assessment. In the proposed network, discrete bone age labels (such as 0-228 month) are considered as a sequence that is used to generate a series of subsequences. Then the proposed network makes use of the overlapping information between adjacent subsequences and output several bone age ranges at the same time for one case. The overlapping part of these age ranges is considered as the final predicted bone age. The proposed method without any preprocessing can achieve a much smaller mean absolute error compared with state-of-the-art methods on a public dataset.

骨骼发育是一个连续的过程，然而，通常使用离散的标签来表示骨骼年龄。这不可避免地造成实际情况和标签表示范围之间的语义鸿沟。在本文中，我们提出了一种称为重叠分类网络的新方法，以缩小骨龄评估中的语义差距。在提议的网络中，离散骨龄标签（例如 0-228 个月）被视为用于生成一系列子序列的序列。然后，所提出的网络利用相邻子序列之间的重叠信息，针对一个案例同时输出多个骨龄范围。这些年龄范围的重叠部分被认为是最终预测的骨龄。与公共数据集上的最新方法相比，所提出的方法无需任何预处理即可实现更小的平均绝对误差。



## Introduction

Skeletal bone age assessment (BAA) is often used by radiologistsand pediatric physicians to assess children’s skeletal maturity. By analysis the discrepancy of bone age and chronological age of children, pediatricians can get necessary information to diagnose growth disorders of children. Usually, left hand-wrist radiographs which can show biological maturation of the growing human are used in skeletal bone age assessment [4]. And Figure 1 gives some examples of these radiographs. Conventionally, two main assessment methods are put into clinical use, one is the Greulich and Pyle (GP) method [5] and another one is the Tanner and White house (TW) method [22]. In the GP method, radiologists compare a patient’s radiograph with a standard atlas with representative ages to determine the bone age. As for the TW method, radiologists focus on regions of interests and each region will be assigned to a score which contributes to an overall bone maturity score. And the overall score can be coverted to be a certain bone age according to a standard sheet. Both methods cost a considered time, for details, an experienced radiologist may take 7.9 min or 1.4 min to perform BAA on a patient using TW and GP respectively [2]. Besides, the two manual methods suffer from intra- and inter- observer variability.

放射科医师和儿科医师经常使用骨骼骨年龄评估 (BAA) 来评估儿童的骨骼成熟度。通过分析儿童骨龄和实足年龄的差异，儿科医生可以获得诊断儿童生长障碍的必要信息。通常，可以显示成长中的人类生物成熟度的左手手腕射线照片用于骨骼骨年龄评估 [4]。图 1 给出了这些射线照片的一些示例。传统上，临床使用的主要评估方法有两种，一种是Greulich and Pyle（GP）方法[5]，另一种是Tanner and White house（TW）方法[22]。在 GP 方法中，放射科医生将患者的 X 光片与具有代表性年龄的标准图谱进行比较，以确定骨龄。至于 TW 方法，放射科医生专注于感兴趣的区域，每个区域都会被分配一个分数，这有助于整体骨成熟度评分。并且总分可以按照标准表转化为一定的骨龄。这两种方法都需要花费一定的时间，详细而言，经验丰富的放射科医生可能需要 7.9 分钟或 1.4 分钟才能分别使用 TW 和 GP 对患者进行 BAA [2]。此外，这两种手动方法都存在观察者内部和观察者间的可变性。

In the early years, automatic BAA techniques relied on image processing [14] and conventional machine learning methods [7]. Recently, convolution neural network (CNN) methods have been introduced to BAA [6]. These methods often encode visual features directly, instead of extracting features from certain regions according to clinical experience [15]. In these methods, a bone age label usually represents the bone age of hand radiography. The label
usually is for a certain year or a certain month. However, discrete bone age labels cannot represent the complex and continuous development of bone well. It inevitably causes a semantic gap between actual situation and labels, which limits CNN to learn better.

早些年，自动 BAA 技术依赖于图像处理 [14] 和传统的机器学习方法 [7]。 最近，BAA [6] 中引入了卷积神经网络 (CNN) 方法。 这些方法通常直接编码视觉特征，而不是根据临床经验从某些区域提取特征[15]。 在这些方法中，骨龄标签通常代表手部射线照相的骨龄。 标签通常是某年或某月。 然而，离散的骨龄标签并不能很好地代表骨骼的复杂和持续发展。 它不可避免地造成实际情况和标签之间的语义差距，这限制了 CNN 更好地学习。

In this paper, we categorize bone ages by month (0-228 months), but we do not use these discrete bone age labels directly. Instead, we define bone age ranges and use the overlapping part of these ranges to replace original labels. For example, 10 months can be represented by three bone age ranges (8-10 months, 9-11 months, 10-12 months). Then a CNN is trained to output three different bone age ranges at the same time. Finally bone age is calculated according to the overlapping part of these outputs of age ranges. Compared with regular regression and classification methods, the proposed method has two significant advantages. (1) It can reduce the semantic gap, because it not only can indicate a specific bone age like common bone age labels, but also is able to indicate the continuity of bone development. (2) It is robust to wrong labels. When radiologists manually give bone age labels of radiographs, wrong labels are inevitable, but these wrong labels always fluctuate around in a certain range. So using several bone age ranges is more reasonable than using a specific bone age label directly.

在本文中，我们按月（0-228 个月）对骨龄进行分类，但我们不直接使用这些离散的骨龄标签。相反，我们定义骨龄范围并使用这些范围的重叠部分来替换原始标签。例如，10 个月可以用三个骨龄范围表示（8-10 个月、9-11 个月、10-12 个月）。然后训练 CNN 同时输出三个不同的骨龄范围。最后根据这些年龄范围输出的重叠部分计算骨龄。与正则回归和分类方法相比，所提出的方法有两个显着的优点。 (1)可以减少语义鸿沟，因为它不仅可以像常见的骨龄标签一样表示特定的骨龄，还可以表示骨骼发育的连续性。 (2)对错误标签具有鲁棒性。放射科医师在人工给X线片的骨龄标注时，不可避免会出现错误标注，但这些错误标注总是在一定范围内波动。所以使用多个骨龄范围比直接使用特定的骨龄标签更合理。

Figure 1: Examples: left hand-wrist radiographs with corresponding bone ages

## RELATED WORK

Recent popular CNN methods for BAA can be roughly classified into two categories, regression method or classification method. And these methods usually use discrete bone age labels. Regression methods make CNNs output continuous numbers that are considered as predicted results of bone ages. Spampinatowe et al. [19] applied deep learning to bone age assessment and tested their work on a private dataset with labels of years (0-18 years). They finetuned CNNs of OxfordNet [10] and used the way of regression for BA. Ren et al. [15] adopted an attention module and trained regression CNNs. They tested their model in a dataset that divided samples by months. Liu et al. [13] gave a multiple output convolution network which modeled the age estimation as a ordinal regression or ranking learning problem. These regression methods try to output continuous bone age results to match the actual situation of bone development, but discrete bone age labels limit the performance of these regression models. Actually, semantic gap has already arisen when using such discrete labels directly. The semantic gap makes it hard for regression CNNs to fit actual bone age development.

最近流行的用于BAA的CNN方法可以大致分为两类，回归方法或分类方法。而这些方法通常使用离散的骨龄标签。回归方法使 CNN 输出连续的数字，这些数字被认为是骨龄的预测结果。 Spampinatowe 等。 [19] 将深度学习应用于骨龄评估，并在带有年份（0-18 岁）标签的私有数据集上测试了他们的工作。他们对 OxfordNet [10] 的 CNN 进行了微调，并对 BA 使用了回归的方式。任等人。 [15] 采用了一个注意力模块并训练了回归 CNN。他们在按月划分样本的数据集中测试了他们的模型。刘等人。 [13] 给出了一个多输出卷积网络，该网络将年龄估计建模为序数回归或排序学习问题。这些回归方法试图输出连续的骨龄结果以匹配骨骼发育的实际情况，但离散的骨龄标签限制了这些回归模型的性能。实际上，直接使用这种离散标签时，语义鸿沟已经出现。语义鸿沟使得回归 CNN 难以适应实际的骨龄发展。

Classification methods are also widely used in BAA. They treat BAA as a multiclass classification problem. Hyunkwang et al. [12] categorized bone ages ranging from 5 to 18 years and made fully automated deep learning pipeline to segment a region of interest for BAA. Larson et al. [11] used Resnet-50 [8] to assess bone age, where the output of the classifier was a probability distribution over bone ages from 0 to 19 years in the increment of 1 month. Steenkiste et al. [20] enhanced one radiograph to be 38 images, then VGG16 [17] was used to get 38 predictions or one radiograph, after that, Gaussian regression was used to estimate bone age based on these 38 predictions. Wu et al. [23] designed a unified network for simultaneous hand segmentation and bone age assessment. Bone ages were assessed by their classification model with residual attention. Souza et al. [18] gave a method using residual learning and provided the gender as input to the dense part of their neural network. Iglovikov et al. [9] used both classification and regression methods to evaluate bone ages. They categorized bone ages by month (0-228 months) in both methods. In classification methods, the discrete labels might not be a big problem because these methods themselves treat bone age labels as independent classes. But, the problem comes to the decisions of critical section between bone age categories. And also because classification methods treat every class as a complete different class without any association between the two bone age classes, they are not suitable for the continuous problem like BAA.

BAA中也广泛使用了分类方法。他们将 BAA 视为多类分类问题。 Hyunkwang 等。 [12] 对 5 到 18 岁的骨龄进行分类，并制作全自动深度学习管道来分割 BAA 感兴趣的区域。拉森等人。 [11] 使用 Resnet-50 [8] 来评估骨龄，其中分类器的输出是以 1 个月为增量从 0 到 19 岁的骨龄的概率分布。斯滕基斯特等人。 [20]将一张X光片增强为38张图像，然后使用VGG16 [17]得到38张预测或一张X光片，然后根据这38张预测使用高斯回归估计骨龄。吴等人。 [23] 设计了一个统一的网络，用于同时进行手部分割和骨龄评估。骨龄通过他们的分类模型进行评估，并带有剩余注意力。苏扎等人。 [18] 给出了一种使用残差学习的方法，并将性别作为其神经网络密集部分的输入。伊格洛维科夫等人。 [9] 使用分类和回归方法来评估骨龄。他们在两种方法中按月（0-228 个月）对骨龄进行分类。在分类方法中，离散标签可能不是大问题，因为这些方法本身将骨龄标签视为独立的类别。但是，问题在于骨龄类别之间关键部分的决定。并且由于分类方法将每个类都视为一个完全不同的类，两个骨龄类之间没有任何关联，因此它们不适合像 BAA 这样的连续问题。

Furthermore, label distribution learning [3] is also an important related work. A CNN with distribution-based loss functions has been proposed [24] for apparent age estimation, which used distributions as the training tasks to exploit the uncertainty introduced by manual labeling.

此外，标签分布学习 [3] 也是一项重要的相关工作。 已经提出了具有基于分布的损失函数的 CNN [24] 用于表观年龄估计，它使用分布作为训练任务来利用手动标记引入的不确定性。

Our method is to combine the advantages of the regression methods and classification methods. It does not involve changes to the CNN architecture, which makes it have a better generalization capability and lower computational cost compare with other methods.

我们的方法是结合回归方法和分类方法的优点。 它不涉及对 CNN 架构的改变，这使得它与其他方法相比具有更好的泛化能力和更低的计算成本。



## METHOD

BAA is considered as a multiclass classification problem here. Before introducing the new method to solve multiclass classification problem, it is necessary to mention a general solution. In deep learning, to solve the n-classification problem P, a neural network is often adopted to output a series of non-normalized scores which correspond to the classes to be predicted. These raw scores can be denoted as z1, ..., zn. Then, an activation function, usually softmax is adopted to map these scores to a probability distribution over predicted output classes. After mapping, a certain raw score can be denoted as yi.

BAA 在这里被认为是一个多类分类问题。 在介绍解决多类分类问题的新方法之前，有必要提一个通用的解决方案。 在深度学习中，为了解决n分类问题P，通常采用神经网络输出一系列与待预测类别对应的非归一化分数。 这些原始分数可以表示为 z1, ..., zn。 然后，采用激活函数（通常是 softmax）将这些分数映射到预测输出类的概率分布。 映射后，某个原始分数可以表示为 yi。
$$
y_i=\frac{e^{z_i}}{\sum_{j=1}^{n}{e^{z_j}}}
$$
For a certain yi, the ground truth label can be denoted as yi′. A loss function is chosen to calculate the predicted class loss. One of the most common loss functions is the negative log likelihood loss. So, for a n-classification problem P, a common neural network loss function can be easily denoted as CrossEntropyLoss(P).

对于某个 yi，ground truth 标签可以表示为 yi′. 选择损失函数来计算预测的类损失。 最常见的损失函数之一是负对数似然损失。 因此，对于 n 分类问题 P，常见的神经网络损失函数可以很容易地表示为 CrossEntropyLoss(P)。
$$
CrossEntropyLoss(P)=-\sum_{i=1}^n{y_i^{’}log(y_i)}
$$
This loss function used in multiclass classification problem is called as the softmax cross entropy loss, which fit the classification problem where every class is completely mutually exclusive. But for many multiclass classification problems with tightly relations between classes, such as skeleton bone age assessment problem, this common classification method may not work well.

这种用于多类分类问题的损失函数称为 softmax 交叉熵损失，它适合每个类完全互斥的分类问题。 但是对于许多类之间关系紧密的多类分类问题，例如骨骼骨龄评估问题，这种常见的分类方法可能效果不佳。

### 3.1 Overlap Classification Concept

In common regression methods for BAA, semantic gap and discrete labels make CNNs difficult to fit the complex and continuous development of bones. And common classification methods often ignore the continuous features of BAA. To break through these difficulties, a feasible solution is to make the classification network intentionally learn the relations between classes. The proposed method is to artificially display the associations between classes and make CNNs to learn them controllably. Instead of using a single bone age label to represent a certain bone age, overlapping part of several bone age ranges is used. This way solves the classes boundary division problems in the common classification method and forces the network to learn the relations between classes. Base on this concept, overlap classification method is proposed. In this method, a CNN is used to output several series of scores to predict the ground truths of bone age ranges. And an overview of the proposed method with a CNN is shown in Figure 2.

在 BAA 的常见回归方法中，语义间隙和离散标签使得 CNN 难以适应骨骼的复杂和持续发展。而常见的分类方法往往忽略了BAA的连续特征。为了突破这些困难，一个可行的解决方案是让分类网络有意识地学习类之间的关系。所提出的方法是人为地显示类之间的关联，并使CNNs可控地学习它们。不是使用单个骨龄标签来表示某个骨龄，而是使用多个骨龄范围的重叠部分。这种方式解决了常见分类方法中的类边界划分问题，迫使网络学习类之间的关系。基于这个概念，提出了重叠分类方法。在这种方法中，CNN 用于输出多个系列的分数来预测骨龄范围的基本事实。图 2 显示了使用 CNN 提出的方法的概述。



Figure 2: The overview of overlap classification network. The network accepts images and outputs several bone age ranges for one case. Then it calculates the bone age based on the overlapping part of these bone age ranges



### 3.2 Overlap Classification Mechanism

The n-classification problem P contains n original classes which can be denoted as P(1), P(2), ..., P(n). The set of these original classes can be denoted as Class(P).

n 分类问题 P 包含 n 个原始类，可以表示为 P(1), P(2), ..., P(n)。 这些原始类的集合可以表示为 Class(P)。
$$
Class(P)=\lbrace P(1),P2, ..., P(n) \rbrace
$$


The classes in P can be considered as an ordered sequence. The ordered sequence can be divided into a series of subsequences while every subsequence contains k classes (the first sequence and the last sequence are allowed to contain less number of classes). Obviously, there are k division ways for dividing P into k subsequences. These k divisions are denoted asC1,C2, ...,Ck. Now,Class(P) is transformed to be the classification of {Ci }.Ci,i ∈ [1, 2, ..., k], consists of several sets of original classes arrenged in order. If nk is an integer, there will be n k sets in C1,nk + 1 sets for C2, ..., and Ck. If nk is not integer, there will be ⌈nk⌉ sets in Ci. Let Ci(xi) denote the xi-th set in Ci.Ci(xi) includes no more than k original classes.

P 中的类可以被认为是一个有序的序列。 有序序列可以分为一系列子序列，每个子序列包含k个类（允许第一个序列和最后一个序列包含较少数量的类）。 显然，将P划分为k个子序列有k种划分方式。 这 k 个分区表示为 C1,C2,...,Ck。 现在，Class(P) 转化为{Ci }.Ci,i ∈ [1, 2, ..., k] 的分类，由几组按顺序排列的原始类组成。 如果n/k 是整数，则C1 中将有n k 个集合，n/k + 1 个用于C2、...和Ck 的集合。 如果n/k 不是整数，则Ci 中将有⌈n/k⌉ 个集合。 让 Ci(xi) 表示 Ci.Ci(xi) 中的第 xi 个集合，包括不超过 k 个原始类。

For clearly illustrate the new classification and how to automatically get new class labels, an example with k = 3 is shown in Figure 3. When k = 3, P will be divided in three ways as {C1,C2,C3}. Because there are 9 classes in P, so C1 has 3 sets of classes, C1(1) = {1, 2, 3},C1(2) = {4, 5, 6},C1(3) = {7, 8, 9}, and both C2 and C3 have 4 sets of classes, for example, C2(1) = {1, 2}, C2(2) = {3, 4, 5}, C2(3) = {6, 7, 8},C2(4) = {9}. Then, according to which sets in all the k divisions the original class of P belongs to, the new class label will be assigned for the original class. For example, the original class 1 is assigned as (C1(1),C2(1),C3(1)). The new class label for original class 2 is (C1(1),C2(1),C3(2)), because C1(1), C2(1) and C3(2) include the original class 2.

为了清楚地说明新的分类以及如何自动获取新的类标签，图 3 显示了 k = 3 的示例。当 k = 3 时，P 将分为 {C1,C2,C3} 三种方式。 因为P中有9个类，所以C1有3组类，C1(1) = {1, 2, 3},C1(2) = {4, 5, 6},C1(3) = {7, 8, 9}，并且C2和C3都有4组类，例如C2(1) = {1, 2}, C2(2) = {3, 4, 5}, C2(3) = {6 , 7, 8},C2(4) = {9}。 然后，根据P的原始类在所有k个分区中属于哪个集合，为原始类分配新的类标签。 例如，原始类 1 被分配为 (C1(1),C2(1),C3(1))。 原始类 2 的新类标签是 (C1(1),C2(1),C3(2))，因为 C1(1)、C2(1) 和 C3(2) 包括原始类 2。

After transforming the original n-classification to be Ci-classification, the original class P(j), j ∈ [1, 2, ..., n] in P has k new classes. P(j) can be uniquely represented by the indexes of k new classes as follows.

将原来的n-classification转化为Ci-classification后，原来的类P(j),j∈[1,2,...,n]在P中有k个新类。 P(j) 可以由 k 个新类的索引来唯一表示，如下所示。
$$
P(j)=C_1(x_1)\cap C_2(x_2)... \cap C_k(x_k)=P(x_1+x_2+...+x_k-2)
$$

### 3.3 Overlap Loss Function

After transforming the original n-classification to be Ci-classification, the original classification problem P can be solved by dealing with the k new classification problems. In order to make use of the overlap and make the neural network learn the association between classes, only one network will be adopted, instead of using k networks to solve the k classification problems respectively. In the common solution, a network is used to output one series of scores to make bone age predict which can be denoted as j′. And overlap model allows the neural network to output k series of raw scores to make k predict results(x1', ..., xk') for these k classification problems. Then, the final predict of bone age is x1'+ ... + xk' − 2, according to the equation 4.

将原来的n-classification转化为Ci-classification后，处理k个新的分类问题就可以解决原来的分类问题P了。 为了利用重叠，使神经网络学习类之间的关联，将只采用一个网络，而不是使用k个网络分别解决k个分类问题。 在常见的解决方案中，网络用于输出一系列分数来预测骨龄，可以表示为 j'。 重叠模型允许神经网络输出k个原始分数序列，使k个预测结果 (x1', ..., xk') 为这k个分类问题。 然后，根据等式 4，骨龄的最终预测值为 x1'+ ... + xk' − 2。

As for a certain classification problem Ci , it can be treated as a common multiclass classification problem. So the softmax cross entropy loss can also be adopted to solve Ci . Then, the total classification loss called overlap classification loss can be denoted as OCL.

对于某个分类问题 Ci ，可以将其视为一个常见的多类分类问题。 所以也可以采用softmax交叉熵损失来求解Ci。 然后，称为重叠分类损失的总分类损失可以表示为 OCL。
$$
OCL(P)=\sum_{i=1}^k{CrossEntropyLoss(C_i)}
$$


What’ more, in order to make sure the outputs (predict results) of a used CNN is overlap, ErrorLoss is designed. As it is shown in equation (4), any P(j), j ∈ [1, 2, ..., n] can be represented by k new classes. In fact, due to the deliberate design of overlap mechanism, any two adjacent classes Ci(xi),Ci+1(xi+1),i = [1, 2, ..., k − 1], in the k new classes satisfied a rule of that xi+1−xi <= 1. In some way, this feature indicates the continuity between classes of the overlap model. In order to make the neural network conform to this feature, ErrorLoss gives a penalty when its predict results (x ′ 1 , ..., x ′ k ) break this rule.

更重要的是，为了确保使用的 CNN 的输出（预测结果）是重叠的，设计了 ErrorLoss。 如等式（4）所示，任何 P(j), j ∈ [1, 2, ..., n] 都可以用 k 个新类表示。 实际上，由于重叠机制的刻意设计，任意两个相邻的类 Ci(xi),Ci+1(xi+1),i = [1, 2, ..., k − 1], 在 k 个新 类满足 xi+1−xi <= 1 的规则。在某种程度上，这个特征表明了重叠模型的类之间的连续性。 为了让神经网络符合这个特征，ErrorLoss 在它的预测结果（x ′ 1 , ..., x ′ k ）违反这个规则时给予惩罚。
$$
ErrorLoss(P)=\frac{1}{k-1}\sum_{i=1}^{k-1}[\frac{x'_{i+1}-x'_i}{2}]
$$


At last, the final loss functionOverlapLoss is the sum of theOCL andw ∗ErrorLoss whilew denotes the relative weight of ErrorLoss. In particular, if the original problem P is solved by the overlap model, its loss function can be denoted as OverlapLoss(P).

最后，最终的损失函数OverlapLoss是OCL和w*ErrorLoss之和，w表示ErrorLoss的相对权重。 特别地，如果原始问题 P 由重叠模型解决，则其损失函数可以表示为 OverlapLoss(P)。
$$
OverlapLoss(P)=OCL(P)+w*ErrorLoss(P)
$$




#### 3.4 Details of Classifier

In the proposed method, the CNN can be any Classic CNN such as Inception [21], Resnet [8]. It is expected to output k series of raw outputs in the proposed method. Then k classifiers are used to make k predict results according to these raw outputs. The total number of the output raw scores can be roughly calculated as k ∗(224/k) = 224, which is equal to the numbers of common solution. This means that the proposed method, comparing with common solutions, does not increase neural network units. In the training stage, the CNN is made to treat k tasks independently with the k classifiers while the overlapping feature of labels can fully express the relations among the k tasks. The relation information can be controlled so that we can make adjust intentionally.

在所提出的方法中，CNN 可以是任何经典 CNN，例如 Inception [21]、Resnet [8]。 预计在所提出的方法中输出 k 系列的原始输出。 然后使用 k 个分类器根据这些原始输出做出 k 个预测结果。 输出原始分数的总数可以粗略计算为 k ∗(224/k) = 224，这等于公共解的数量。 这意味着所提出的方法与常见的解决方案相比，不会增加神经网络单元。 在训练阶段，使CNN与k个分类器独立处理k个任务，而标签的重叠特征可以充分表达k个任务之间的关系。 可以控制关系信息，以便我们可以有意识地进行调整。

Although the proposed loss function guides the network to output overlap predicts, a trained network is possible to give out predicts that are not overlap. In this case, the final bone age also can be figured out by the equation 4. And the bad effects caused by one coincident wrong predict can be reduced by other k − 1 predicts. This shows the robustness of the proposed method. To implement the proposed method, the most important parameter is the value of k. We offer an implementation based on Python language and Pytorch frame. More details of the overlap classification mechanism can be found in the project website1.

虽然提议的损失函数引导网络输出重叠预测，但经过训练的网络有可能给出不重叠的预测。 在这种情况下，最终的骨龄也可以通过等式 4 来计算。并且可以通过其他 k-1 次预测来减少由一个巧合错误预测造成的不良影响。 这表明了所提出方法的鲁棒性。 为了实现所提出的方法，最重要的参数是 k 的值。 我们提供基于 Python 语言和 Pytorch 框架的实现。 有关重叠分类机制的更多详细信息，请参见项目网站1。

## EXPERIMENTS

### 4.1 Dataset and Implementation details

A public dataset came from RSNA Pediatric Bone Age Machine Learning Challenge 2 is used. It contains 12,611 x-ray images, of which there are 6,833 images for men and 5,788 images for women. Most of the samples are labeled between 96 to 168 months, while the samples of other age groups are relatively small. And the age distribution of the dataset is shown at Figure 5. We adopt the assessment approach of five-fold cross validation. The dataset are divided into five equal groups randomly for training and testing. One group is taken out each time as a test set, and the rest as the training set.

使用来自 RSNA Pediatric Bone Age Machine Learning Challenge 2 的公共数据集。 它包含 12,611 张 X 射线图像，其中男性图像 6,833 张，女性图像 5,788 张。 大部分样本标注在 96 至 168 个月之间，而其他年龄段的样本相对较少。 数据集的年龄分布如图5所示。我们采用五重交叉验证的评估方法。 将数据集随机分为五个相等的组进行训练和测试。 每次取出一组作为测试集，其余作为训练集。

Data augmentation is also applied for train sets. In detail, the radiographs in the training dataset were randomly rotated at degrees from −15 to 15. What’s more, the brightness, contrast and hue are randomly changed by a coefficient in range between 0.85 and 1.15. When training CNNs, a recommended tips for overlap classification method is setting the initial learning rate is to 0.001 then decreasing it by 3 with every 14 steps with Adam optimization. What’s more, as for the weight w of ErrorLoss, a recommended tip is to setting the initial weight as 10, then decreasing it by 10 with every 10 steps.

数据增强也适用于训练集。具体来说，训练数据集中的射线照片随机旋转了 -15 到 15 度。此外，亮度、对比度和色调随机改变了一个介于 0.85 和 1.15 之间的系数。 在训练 CNN 时，重叠分类方法的推荐提示是将初始学习率设置为 0.001，然后使用 Adam 优化每 14 步将其减少 3。 更重要的是，对于ErrorLoss的权重w，一个推荐的技巧是将初始权重设置为10，然后每10步减少10。



### 4.2 Evaluation criteria

There has two ways to evaluate the performance of a certain model in bone age assessment. One is to compute the accuracy within a period of time [12], such as a half year (±0.5 years), a year (±1 years). Another way [9] is to compute the mean absolute error (MAE) of months. For m test radiographs, the calculation of MAE is shown in the equation (8), where labeli denotes the true bone age (month) of i-th radiograph, and predicti denotes the bone age (month) of i-th radiograph predicted by the model.

有两种方法可以评估某个模型在骨龄评估中的性能。 一种是计算一段时间内的准确率[12]，比如半年（±0.5年）、一年（±1年）。 另一种方法 [9] 是计算月份的平均绝对误差 (MAE)。 对于m张试片，MAE的计算如式（8）所示，其中labeli表示第i张X光片的真实骨龄（月），predicti表示第i张X光片预测的骨龄（月） 该模型。
$$
MAE=\frac{1}{m}\sum_{i=1}^{m}|label_i-predict_i|
$$
In our experiment, MAE upon the test sets and their standard deviation are used as the main evaluation method. We also conduct paired t-tests for the errors of the test sets between individual experimental configurations. The statistical significance is attained at p = 0.05. In addition, it must be mentioned that experiments treat male and female data sets separately because that male and female have different developmental levels of bone age.

在我们的实验中，测试集上的 MAE 及其标准差被用作主要的评估方法。 我们还对各个实验配置之间的测试集的误差进行配对 t 检验。 在 p = 0.05 时达到统计显着性。 此外，必须提到的是，实验将男性和女性数据集分开处理，因为男性和女性的骨龄发育水平不同。



### 4.3 Finding the optimal k value

To find the optimal value of k, we chose k = 2, 3, 4 and trained the ResNet-50 [8] in male data set. The evaluation results of different values of k are shown in the Tabel 1. This model performs best with k = 3, where the MAE with it’s standard deviation is 6.7±6.7 months. The accuracy within half year of the ground truth is 64.62%, and the accuracy within one year of the ground truth is 88.01%. Then, We did the similar experiment on another classical CNN model Inception-v3 [21]. The best result also occurs when k = 3 and the MAE is 5.7±5.9 months. The accuracy within half year of the ground truth is 68.90%, and the accuracy within one year of the ground truth is 92.15%. In the following experiments, we set k = 3. Some outputs is shown at Figure 5.

为了找到 k 的最佳值，我们选择了 k = 2、3、4，并在男性数据集中训练了 ResNet-50 [8]。 不同k值的评估结果见表1。该模型在k = 3时表现最好，其标准差为6.7±6.7个月的MAE。 ground truth半年内准确率为64.62%，ground truth一年内准确率为88.01%。 然后，我们在另一个经典的 CNN 模型 Inception-v3 [21] 上做了类似的实验。 当 k = 3 且 MAE 为 5.7±5.9 个月时，也会出现最佳结果。 ground truth半年内准确率为68.90%，ground truth一年内准确率为92.15%。 在以下实验中，我们设置 k = 3。一些输出如图 5 所示。



### 4.4 Comparisons with different methods

In this experiment we only use MAE and their standard deviation for evaluation because it is enough to reflect the performance of different models. We trained Resnet-50 [8] and Inception-v3 [21] both in regression model and classification model. The results are shown in Table 2. In overlap classification method, if using Resnet50 as the baseline, it reaches a MAE of 6.7±6.7 months in male, which is lower than the common classification method and the regression method. If using inception-v3 as the baseline, it gets a MAE of 5.7±5.7 months in male, which is also lower than the common classification method and the regression method. For the female images, the overlap classification method also performs best both by using Resnet-50 and Inception-v3. To show the results more directly, some results are shown in Figure 6.

在这个实验中，我们只使用 MAE 及其标准差进行评估，因为它足以反映不同模型的性能。我们在回归模型和分类模型中训练了 Resnet-50 [8] 和 Inception-v3 [21]。结果如表2所示。在重叠分类法中，如果以Resnet50为baseline，男性的MAE为6.7±6.7个月，低于普通分类法和回归法。如果使用inception-v3作为baseline，男性的MAE为5.7±5.7个月，也低于常用的分类方法和回归方法。对于女性图像，重叠分类方法在使用 Resnet-50 和 Inception-v3 时也表现最好。为了更直接地显示结果，一些结果如图 6 所示。

The above experiments have shown that Inception-v3 performs better. Now we further compare the overlap classification model with the common classification and the regression using Inceptionv3. Here, the paired t-test on same test dataset is used for further evaluation. The result is shown at Table 3. On male test set, the regression method gets a p-value of 3.63×10−8 , and the classification method gets a p-value of 1.25 × 10−3 . On female test set, the results are p = 5.62×10−7 for the classification and p = 1.77×10−3 for the regression. All the p values is significantly lower than p = 0.05. This experiment provides an additional evidence that the overlap classification method outperforms the common classification method and regression method.

上述实验表明，Inception-v3 表现更好。现在我们进一步将重叠分类模型与普通分类和使用 Inceptionv3 的回归进行比较。在这里，相同测试数据集上的配对 t 检验用于进一步评估。结果如表3所示。在男性测试集上，回归方法得到的p值为3.63×10-8，分类方法得到的p值为1.25×10-3。在女性测试集上，分类结果为 p = 5.62×10-7，回归结果为 p = 1.77×10-3。所有 p 值均显着低于 p = 0.05。该实验提供了一个额外的证据，表明重叠分类方法优于普通分类方法和回归方法。

For comparing the overlap classification method with other stateof-the-art methods on the whole dataset, the MAEs of different methods are listed in Table 4. And since standard deviation is not used in these works, this table does not show this criteria. A fully automated commercial system for BAA named as BoneXpert3 has been declared for clinical use in Europe. Van Rijn et al. [16] evaluated the accuracy of the model with a MAE of approximately 0.68 years that is 8.16 months. All of other methods used deep learning models on the RSNA Pediatric Bone Age dataset. We give the MAEs of these methods from their reports. It can be seen that the proposed overlap classification model reduces the MAE from 0.21 to 2.32 months compared with these models. It verifies that the proposed overlap classification network is much more suitable for the task of bone age assessment.

为了在整个数据集上将重叠分类方法与其他最先进的方法进行比较，表 4 中列出了不同方法的 MAE。由于这些工作中没有使用标准差，因此该表未显示此标准.一个名为 BoneXpert3 的 BAA 全自动商业系统已在欧洲宣布用于临床。范 Rijn 等人。 [16] 评估了模型的准确性，MAE 约为 0.68 年，即 8.16 个月。所有其他方法都在 RSNA 儿科骨龄数据集上使用深度学习模型。我们从他们的报告中给出了这些方法的 MAE。可以看出，与这些模型相比，所提出的重叠分类模型将 MAE 从 0.21 个月降低到 2.32 个月。它验证了所提出的重叠分类网络更适合骨龄评估的任务。



### 4.5 Model performances in different age stages 

According to [4], there are six major skeletal development stages totally in children and adolescents (Infancy, Toddlers, Pre-puberty, Early and Mid-puberty, Late Puberty, Post-puberty). Table 5 shows how the proposed overlap classification with inception-v3 performs in different age ranges. Because there is only a few data in Infancy and Toddlers, especially in Infancy data, we combine these two stages together. Besides, most test subjects are in Early and Midpuberty. It can be found that our model performs better with the increase of bone age in the male dataset. More specifically, in the male dataset, the model performs not well before pre-puberty stage. In Early and Mid-puberty stages, the proposed method achieves a MAE of 5.2 months which is 1.1 months lower than the result reported by Vladimir et al. [9] at the similar conditions. One interesting thing is that the proposed model has really excellent performance in Late Puberty and Post-puberty stage of male with the MAE of 4.1 months and 4.2 months respectively. When analyzing the female, it can be found that the proposed model also get good results in the most frequent stage with MAE of 5.8 months, which is almost 1.2 months lower than the result reported in [9]. Compared with the male dataset, the female dataset has a serious data shortage problem. There are only 122 subjects of Post-puberty in the whole female dataset. Because of data shortage in Infancy, Toddlers and Post-puberty, the results of these sets may be unreliable.

根据[4]，儿童和青少年共有六个主要的骨骼发育阶段（婴儿期、幼儿期、青春期前、青春期早期和中期、青春期后期、青春期后）。表 5 显示了使用 inception-v3 提出的重叠分类在不同年龄范围内的表现。因为 Infancy 和 Toddlers 的数据很少，尤其是 Infancy 数据，我们把这两个阶段结合在一起。此外，大多数测试对象处于青春期早期和中期。可以发现，随着男性数据集中骨龄的增加，我们的模型表现更好。更具体地说，在男性数据集中，该模型在青春期前阶段表现不佳。在青春期早期和中期，该方法的 MAE 为 5.2 个月，比 Vladimir 等人报告的结果低 1.1 个月。 [9] 在类似的条件下。一个有趣的事情是，所提出的模型在男性青春期后期和青春期后阶段的表现非常出色，MAE 分别为 4.1 个月和 4.2 个月。在对女性进行分析时，可以发现所提出的模型在最频繁的阶段也取得了很好的结果，MAE 为 5.8 个月，比 [9] 中报道的结果几乎低了 1.2 个月。与男性数据集相比，女性数据集存在严重的数据短缺问题。整个女性数据集中只有 122 个青春期后的受试者。由于婴儿期、幼儿期和青春期后的数据短缺，这些集合的结果可能不可靠。

## DISCUSSIONS

There are two points need to be mentioned. (1) Even experiments have shown that the proposed overlap classification network has better performance in bone age assessment than other classification methods and regression methods, it is not limited to this problem. In fact, the proposed overlap classification method can be used to solve some regression problems or multiclass classification problems where some associations exit between classes. Due to the overlapping classification mechanism, it is more suitable for the problems that contain enough classes. (2) Obviously, the best value of k can be different when solving different classification problems. But, whether the type of CNN used in overlap classification network will affect the optimal value of k is still a question, which needs to be explored in the future. In the experiment, we have not found that there is a strong relation between them according to the evidences where both the Resnet-50 and inception-v3 show the best performance when k = 3 in BAA. But, in order to improve the efficiency of finding the optimal k value, it is necessary to study the influence factors of it in the future.

有两点需要说明。 (1) 甚至实验表明，所提出的重叠分类网络在骨龄评估方面比其他分类方法和回归方法具有更好的性能，但不仅限于这个问题。事实上，所提出的重叠分类方法可用于解决一些回归问题或多类分类问题，其中类之间存在一些关联。由于重叠分类机制，它更适合包含足够类的问题。 (2) 显然，在解决不同的分类问题时，k的最佳值可以不同。但是，重叠分类网络中使用的CNN类型是否会影响k的最优值仍然是一个问题，需要在未来进行探索。在实验中，我们没有发现它们之间存在很强的关系，根据证据表明当 BAA 中的 k = 3 时，Resnet-50 和 inception-v3 都表现出最好的性能。但是，为了提高寻找最优k值的效率，未来有必要对其影响因素进行研究。

## CONCLUSIONS

A novel network named as overlap classification network has been proposed for skeleton bone age assessment in this paper. It adds regression characteristics to the concept of classification network, and obtains a new classification mechanism. Experiments on a public dataset and comparisons with different methods have shown the advantages and the potential of the proposed approach.

本文提出了一种称为重叠分类网络的新型网络用于骨骼骨年龄评估。它在分类网络的概念中加入了回归特征，得到了一种新的分类机制。在公共数据集上进行的实验以及与不同方法的比较表明了所提出方法的优势和潜力。



## ACKNOWLEDGEMENTS

This work is supported by National Natural Science Foundation of China under grants No. U1908210 and 61801428, and Natural Science Foundation of Zhejiang Province of China under grants No. LR21F020002. 

这项工作得到了中国国家自然科学基金项目号 U1908210 和 61801428 和中国浙江省自然科学基金项目号 LR21F020002 的资助。



## REFERENCE

[1] A. Albanese and R. Stanhope. 1995. Investigation of delayed puberty. Clinical endocrinology 43, 1 (1995), 105–110. 

[2] A. Christoforidis, M. Badouraki, G. Katzos, and M. Athanassiou-Metaxa. 2007. Bone age estimation and prediction of final height in patients with β-thalassaemia major: a comparison between the two most common methods. Pediatric radiology 37, 12 (2007), 1241–1246. 

[3] Xin Geng. 2016. Label distribution learning. IEEE Transactions on Knowledge and Data Engineering 28, 7 (2016), 1734–1748.

[4] V. Gilsanz and O. Ratib. 2005. Hand bone age: a digital atlas of skeletal maturity. Springer Science. 

[5] W.W. Greulich and S.I. Pyle. 1959. Radiographic atlas of skeletal development of the hand and wrist. The American Journal of the Medical Sciences 238, 3 (1959). 

[6] P. Hao, S. Chokuwa, X. Xie, F. Wu, J. Wu, and C. Bai. 2019. Skeletal Bone Age Assessments for Young Children based on Regression Convolutional Neural Networks. Mathematical Biosciences and Engineering 16, 6 (2019), 6454–6466. 

[7] M. Harmsen, B. Fischer, H. Schramm, T. Seidl, and T. M. Deserno. 2012. Support vector machine classification based on correlation prototypes applied to bone age assessment. IEEE journal of biomedical and health informatics 17, 1 (2012), 190–197. 

[8] K. He, X. Zhang, S. Ren, and J. Sun. 2016. Deep residual learning for image recognition. In CVPR. 770–778. 

[9] V. Iglovikov, A. Rakhlin, A. Kalinin, and A. Shvets. 2018. Paediatric Bone age assessment using deep convolutional neural networks. In DLMIA. 300–308. [10] R. Kiros, R. Salakhutdinov, and R. S. Zemel. 2014. Unifying visual-semantic embeddings with multimodal neural language models. In NIPS workshop. 

[11] D. B. Larson, M. C. Chen, M. P. Lungren, S. S. Halabi, N. V. Stence, and C. P. Lamglotz. 2018. Performance of a Deep-learning Neural Network Model in Assessing Skeletal Maturity on Pediatric Hand Radiographs. Radiology 287, 1 (2018), 313–322. 

[12] H. Lee, S. Tajmir, and J. Lee et.al. 2017. Fully automated deep learning system for bone age assessment. Journal of digital imaging 30, 4 (2017), 427–441. 

[13] B. Liu, Y. Zhang, M. Chu, X. Bai, and F. Zhou. 2019. Bone Age Assessment Based on Rank-Monotonicity Enhanced Ranking CNN. Ieee Access 7 (2019), 120976–120983. 

[14] E. Pietka, A. Gertych, S. Pospiech, F. Cao, H.K. Huang, and V. Gilsanz. 2001. Computer-assisted bone age assessment: Image preprocessing and epiphyseal/metaphyseal ROI extraction. IEEE transactions on medical imaging 20, 8 (2001), 715–729.

[15] X. Ren, T. Li, X. Yang, and S. Wang et.al. 2018. Regression convolutional neural network for automated pediatric bone age assessment from hand radiograph. IEEE journal of biomedical and health informatics 23, 5 (2018), 2030–2038. 

[16] R.R. Van Rijn and H. H. Thodberg. 2013. Bone age assessment: automated techniques coming of age? Acta Radiologica 54 (2013), 1024–9. 

[17] K. Simonyan and A. Zisserman. 2015. Very deep convolutional networks for large-scale image recognition. In ICLR. 

[18] D. Souza and M. M. Oliveira. 2018. End-to-end Bone Age Assessment with Residual Learning. In SIBGRAPI. 197–203. 

[19] C. Spampinato, S. Palazzo, D. Giordano, M. Aldinucci, and R. Leonardi. 2017. Deep learning for automated skeletal bone age assessment in X-ray images. Medical image analysis 36 (2017), 41–51. 

[20] T. V. Steenkiste, J. Ruyssinck, O. V. Janssens, and V. F. Vandersmissen et.al. 2018. Automated Assessment of Bone Age Using Deep Learning and Gaussian Process Regression. In EMBC. 674–677. 

[21] C. Szegedy, V. Vanhoucke, S. Ioffe, J. Shlens, and Z. Wojna. 2016. Rethinking the inception architecture for computer vision. In CVPR. 2818–2826. 

[22] J. M. Tanner and R. H. Whitehouse et.al. 1975. Assessment of skeletal maturity and prediction of adult height (TW2 method). Vol. 16. Academic Press London. 

[23] E. Wu, B. Kong, J. Bai, Y. Lu, F. Gao, and S. Zhang et.al. 2019. Residual Attention Based Network for hand Bone Age assessment. In ISBI. 1158–1161. 

[24] Xu Yang, Bin-Bin Gao, Chao Xing, Zeng-Wei Huo, Xiu-Shen Wei, Ying Zhou, Jianxin Wu, and Xin Geng. 2015. Deep label distribution learning for apparent age estimation. In Proceedings of the IEEE international conference on computer vision workshops. 102–108.

