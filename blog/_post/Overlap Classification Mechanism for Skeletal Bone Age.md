---
date: 2021-12-29
category: Research
title: Overlap_Classification_BAA
tags:
  - 科研

---


### Introduction

The bone development is a continuous process, however, discrete labels are usually used to represent bone ages. This inevitably causes a semantic gap between actual situation and label representation scope. In this paper, we present a novel method named as overlap classification network to narrow the semantic gap in bone age assessment. In the proposed network, discrete bone age labels (such as 0-228 month) are considered as a sequence that is used to generate a series of subsequences. Then the proposed network makes use of the overlapping information between adjacent subsequences and output several bone age ranges at the same time for one case. The overlapping part of these age ranges is considered as the final predicted bone age. The proposed method without any preprocessing can achieve a much smaller mean absolute error compared with state-of-the-art methods on a public dataset.

骨骼发育是一个连续的过程，然而，通常使用离散的标签来表示骨骼年龄。这不可避免地造成实际情况和标签表示范围之间的语义鸿沟。在本文中，我们提出了一种称为重叠分类网络的新方法，以缩小骨龄评估中的语义差距。在提议的网络中，离散骨龄标签（例如 0-228 个月）被视为用于生成一系列子序列的序列。然后，所提出的网络利用相邻子序列之间的重叠信息，针对一个案例同时输出多个骨龄范围。这些年龄范围的重叠部分被认为是最终预测的骨龄。与公共数据集上的最新方法相比，所提出的方法无需任何预处理即可实现更小的平均绝对误差。



Skeletal bone age assessment (BAA) is often used by radiologistsand pediatric physicians to assess children’s skeletal maturity. By analysis the discrepancy of bone age and chronological age of children, pediatricians can get necessary information to diagnose growth disorders of children. Usually, left hand-wrist radiographs which can show biological maturation of the growing human are used in skeletal bone age assessment [4]. And Figure 1 gives some examples of these radiographs. Conventionally, two main assessment methods are put into clinical use, one is the Greulich and Pyle (GP) method [5] and another one is the Tanner and White house (TW) method [22]. In the GP method, radiologists compare a patient’s radiograph with a standard atlas with representative ages to determine the bone age. As for the TW method, radiologists focus on regions of interests and each region will be assigned to a score which contributes to an overall bone maturity score. And the overall score can be coverted to be a certain bone age according to a standard sheet. Both methods cost a considered time, for details, an experienced radiologist may take 7.9 min or 1.4 min to perform BAA on a patient using TW and GP respectively [2]. Besides, the two manual methods suffer from intra- and inter- observer variability.

放射科医师和儿科医师经常使用骨骼骨年龄评估 (BAA) 来评估儿童的骨骼成熟度。通过分析儿童骨龄和实足年龄的差异，儿科医生可以获得诊断儿童生长障碍的必要信息。通常，可以显示成长中的人类生物成熟度的左手手腕射线照片用于骨骼骨年龄评估 [4]。图 1 给出了这些射线照片的一些示例。传统上，临床使用的主要评估方法有两种，一种是Greulich and Pyle（GP）方法[5]，另一种是Tanner and White house（TW）方法[22]。在 GP 方法中，放射科医生将患者的 X 光片与具有代表性年龄的标准图谱进行比较，以确定骨龄。至于 TW 方法，放射科医生专注于感兴趣的区域，每个区域都会被分配一个分数，这有助于整体骨成熟度评分。并且总分可以按照标准表转化为一定的骨龄。这两种方法都需要花费一定的时间，详细而言，经验丰富的放射科医生可能需要 7.9 分钟或 1.4 分钟才能分别使用 TW 和 GP 对患者进行 BAA [2]。此外，这两种手动方法都存在观察者内部和观察者间的可变性。

In the early years, automatic BAA techniques relied on image processing [14] and conventional machine learning methods [7]. Recently, convolution neural network (CNN) methods have been introduced to BAA [6]. These methods often encode visual features directly, instead of extracting features from certain regions according to clinical experience [15]. In these methods, a bone age label usually represents the bone age of hand radiography. The label
usually is for a certain year or a certain month. However, discrete bone age labels cannot represent the complex and continuous development of bone well. It inevitably causes a semantic gap between actual situation and labels, which limits CNN to learn better.

早些年，自动 BAA 技术依赖于图像处理 [14] 和传统的机器学习方法 [7]。 最近，BAA [6] 中引入了卷积神经网络 (CNN) 方法。 这些方法通常直接编码视觉特征，而不是根据临床经验从某些区域提取特征[15]。 在这些方法中，骨龄标签通常代表手部射线照相的骨龄。 标签
通常是某年或某月。 然而，离散的骨龄标签并不能很好地代表骨骼的复杂和持续发展。 它不可避免地造成实际情况和标签之间的语义差距，这限制了 CNN 更好地学习。

In this paper, we categorize bone ages by month (0-228 months), but we do not use these discrete bone age labels directly. Instead, we define bone age ranges and use the overlapping part of these ranges to replace original labels. For example, 10 months can be represented by three bone age ranges (8-10 months, 9-11 months, 10-12 months). Then a CNN is trained to output three different bone age ranges at the same time. Finally bone age is calculated according to the overlapping part of these outputs of age ranges. Compared with regular regression and classification methods, the proposed method has two significant advantages. (1) It can reduce the semantic gap, because it not only can indicate a specific bone age like common bone age labels, but also is able to indicate the continuity of bone development. (2) It is robust to wrong labels. When radiologists manually give bone age labels of radiographs, wrong labels are inevitable, but these wrong labels always fluctuate around in a certain range. So using several bone age ranges is more reasonable than using a specific bone age label directly.

在本文中，我们按月（0-228 个月）对骨龄进行分类，但我们不直接使用这些离散的骨龄标签。相反，我们定义骨龄范围并使用这些范围的重叠部分来替换原始标签。例如，10 个月可以用三个骨龄范围表示（8-10 个月、9-11 个月、10-12 个月）。然后训练 CNN 同时输出三个不同的骨龄范围。最后根据这些年龄范围输出的重叠部分计算骨龄。与正则回归和分类方法相比，所提出的方法有两个显着的优点。 (1)可以减少语义鸿沟，因为它不仅可以像常见的骨龄标签一样表示特定的骨龄，还可以表示骨骼发育的连续性。 (2)对错误标签具有鲁棒性。放射科医师在人工给X线片的骨龄标注时，不可避免会出现错误标注，但这些错误标注总是在一定范围内波动。所以使用多个骨龄范围比直接使用特定的骨龄标签更合理。



### RELATED WORK

Recent popular CNN methods for BAA can be roughly classified into two categories, regression method or classification method. And these methods usually use discrete bone age labels. Regression methods make CNNs output continuous numbers that are considered as predicted results of bone ages. Spampinatowe et al. [19] applied deep learning to bone age assessment and tested their work on a private dataset with labels of years (0-18 years). They finetuned CNNs of OxfordNet [10] and used the way of regression for BA. Ren et al. [15] adopted an attention module and trained regression CNNs. They tested their model in a dataset that divided samples by months. Liu et al. [13] gave a multiple output convolution network which modeled the age estimation as a ordinal regression or ranking learning problem. These regression methods try to output continuous bone age results to match the actual situation of bone development, but discrete bone age labels limit the performance of these regression models. Actually, semantic gap has already arisen when using such discrete labels directly. The semantic gap makes it hard for regression CNNs to fit actual bone age development.

最近流行的用于BAA的CNN方法可以大致分为两类，回归方法或分类方法。而这些方法通常使用离散的骨龄标签。回归方法使 CNN 输出连续的数字，这些数字被认为是骨龄的预测结果。 Spampinatowe 等。 [19] 将深度学习应用于骨龄评估，并在带有年份（0-18 岁）标签的私有数据集上测试了他们的工作。他们对 OxfordNet [10] 的 CNN 进行了微调，并对 BA 使用了回归的方式。任等人。 [15] 采用了一个注意力模块并训练了回归 CNN。他们在按月划分样本的数据集中测试了他们的模型。刘等人。 [13] 给出了一个多输出卷积网络，该网络将年龄估计建模为序数回归或排序学习问题。这些回归方法试图输出连续的骨龄结果以匹配骨骼发育的实际情况，但离散的骨龄标签限制了这些回归模型的性能。实际上，直接使用这种离散标签时，语义鸿沟已经出现。语义鸿沟使得回归 CNN 难以适应实际的骨龄发展。

Classification methods are also widely used in BAA. They treat BAA as a multiclass classification problem. Hyunkwang et al. [12] categorized bone ages ranging from 5 to 18 years and made fully automated deep learning pipeline to segment a region of interest for BAA. Larson et al. [11] used Resnet-50 [8] to assess bone age, where the output of the classifier was a probability distribution over bone ages from 0 to 19 years in the increment of 1 month. Steenkiste et al. [20] enhanced one radiograph to be 38 images, then VGG16 [17] was used to get 38 predictions or one radiograph, after that, Gaussian regression was used to estimate bone age based on these 38 predictions. Wu et al. [23] designed a unified network for simultaneous hand segmentation and bone age assessment. Bone ages were assessed by their classification model with residual attention. Souza et al. [18] gave a method using residual learning and provided the gender as input to the dense part of their neural network. Iglovikov et al. [9] used both classification and regression methods to evaluate bone ages. They categorized bone ages by month (0-228 months) in both methods. In classification methods, the discrete labels might not be a big problem because these methods themselves treat bone age labels as independent classes. But, the problem comes to the decisions of critical section between bone age categories. And also because classification methods treat every class as a complete different class without any association between the two bone age classes, they are not suitable for the continuous problem like BAA.

BAA中也广泛使用了分类方法。他们将 BAA 视为多类分类问题。 Hyunkwang 等。 [12] 对 5 到 18 岁的骨龄进行分类，并制作全自动深度学习管道来分割 BAA 感兴趣的区域。拉森等人。 [11] 使用 Resnet-50 [8] 来评估骨龄，其中分类器的输出是以 1 个月为增量从 0 到 19 岁的骨龄的概率分布。斯滕基斯特等人。 [20]将一张X光片增强为38张图像，然后使用VGG16 [17]得到38张预测或一张X光片，然后根据这38张预测使用高斯回归估计骨龄。吴等人。 [23] 设计了一个统一的网络，用于同时进行手部分割和骨龄评估。骨龄通过他们的分类模型进行评估，并带有剩余注意力。苏扎等人。 [18] 给出了一种使用残差学习的方法，并将性别作为其神经网络密集部分的输入。伊格洛维科夫等人。 [9] 使用分类和回归方法来评估骨龄。他们在两种方法中按月（0-228 个月）对骨龄进行分类。在分类方法中，离散标签可能不是大问题，因为这些方法本身将骨龄标签视为独立的类别。但是，问题在于骨龄类别之间关键部分的决定。并且由于分类方法将每个类都视为一个完全不同的类，两个骨龄类之间没有任何关联，因此它们不适合像 BAA 这样的连续问题。

Furthermore, label distribution learning [3] is also an important related work. A CNN with distribution-based loss functions has been proposed [24] for apparent age estimation, which used distributions as the training tasks to exploit the uncertainty introduced by manual labeling.

此外，标签分布学习 [3] 也是一项重要的相关工作。 已经提出了具有基于分布的损失函数的 CNN [24] 用于表观年龄估计，它使用分布作为训练任务来利用手动标记引入的不确定性。

Our method is to combine the advantages of the regression methods and classification methods. It does not involve changes to the CNN architecture, which makes it have a better generalization capability and lower computational cost compare with other methods.

我们的方法是结合回归方法和分类方法的优点。 它不涉及对 CNN 架构的改变，这使得它与其他方法相比具有更好的泛化能力和更低的计算成本。





###  METHOD

BAA is considered as a multiclass classification problem here. Before introducing the new method to solve multiclass classification problem, it is necessary to mention a general solution. In deep learning, to solve the n-classification problem P, a neural network is often adopted to output a series of non-normalized scores which correspond to the classes to be predicted. These raw scores can be denoted as z1, ..., zn. Then, an activation function, usually softmax is adopted to map these scores to a probability distribution over predicted output classes. After mapping, a certain raw score can be denoted as yi.

BAA 在这里被认为是一个多类分类问题。 在介绍解决多类分类问题的新方法之前，有必要提一个通用的解决方案。 在深度学习中，为了解决n分类问题P，通常采用神经网络输出一系列与待预测类别对应的非归一化分数。 这些原始分数可以表示为 z1, ..., zn。 然后，采用激活函数（通常是 softmax）将这些分数映射到预测输出类的概率分布。 映射后，某个原始分数可以表示为 yi。

For a certain yi, the ground truth label can be denoted as yi′. A loss function is chosen to calculate the predicted class loss. One of the most common loss functions is the negative log likelihood loss. So, for a n-classification problem P, a common neural network loss function can be easily denoted as CrossEntropyLoss(P).

对于某个 yi，ground truth 标签可以表示为 yi′. 选择损失函数来计算预测的类损失。 最常见的损失函数之一是负对数似然损失。 因此，对于 n 分类问题 P，常见的神经网络损失函数可以很容易地表示为 CrossEntropyLoss(P)。

This loss function used in multiclass classification problem is called as the softmax cross entropy loss, which fit the classification problem where every class is completely mutually exclusive. But for many multiclass classification problems with tightly relations between classes, such as skeleton bone age assessment problem, this common classification method may not work well.这种用于多类分类问题的损失函数称为 softmax 交叉熵损失，它适合每个类完全互斥的分类问题。 但是对于许多类之间关系紧密的多类分类问题，例如骨骼骨龄评估问题，这种常见的分类方法可能效果不佳。



#### 3.1 Overlap Classification Concept

In common regression methods for BAA, semantic gap and discrete labels make CNNs difficult to fit the complex and continuous development of bones. And common classification methods often ignore the continuous features of BAA. To break through these difficulties, a feasible solution is to make the classification network intentionally learn the relations between classes. The proposed method is to artificially display the associations between classes and make CNNs to learn them controllably. Instead of using a single bone age label to represent a certain bone age, overlapping part of several bone age ranges is used. This way solves the classes boundary division problems in the common classification method and forces the network to learn the relations between classes. Base on this concept, overlap classification method is proposed. In this method, a CNN is used to output several series of scores to predict the ground truths of bone age ranges. And an overview of the proposed method with a CNN is shown in Figure 2.

在 BAA 的常见回归方法中，语义间隙和离散标签使得 CNN 难以适应骨骼的复杂和持续发展。而常见的分类方法往往忽略了BAA的连续特征。为了突破这些困难，一个可行的解决方案是让分类网络有意识地学习类之间的关系。所提出的方法是人为地显示类之间的关联，并使CNNs可控地学习它们。不是使用单个骨龄标签来表示某个骨龄，而是使用多个骨龄范围的重叠部分。这种方式解决了常见分类方法中的类边界划分问题，迫使网络学习类之间的关系。基于这个概念，提出了重叠分类方法。在这种方法中，CNN 用于输出多个系列的分数来预测骨龄范围的基本事实。图 2 显示了使用 CNN 提出的方法的概述。



#### 3.2 Overlap Classification Mechanism

The n-classification problem P contains n original classes which can be denoted as P(1), P(2), ..., P(n). The set of these original classes can be denoted as Class(P).

n 分类问题 P 包含 n 个原始类，可以表示为 P(1), P(2), ..., P(n)。 这些原始类的集合可以表示为 Class(P)。

The classes in P can be considered as an ordered sequence. The ordered sequence can be divided into a series of subsequences while every subsequence contains k classes (the first sequence and the last sequence are allowed to contain less number of classes). Obviously, there are k division ways for dividing P into k subsequences. These k divisions are denoted asC1,C2, ...,Ck. Now,Class(P) is transformed to be the classification of {Ci }.Ci,i ∈ [1, 2, ..., k], consists of several sets of original classes arrenged in order. If nk is an integer, there will be n k sets in C1,nk + 1 sets for C2, ..., and Ck. If nk is not integer, there will be ⌈nk⌉ sets in Ci. Let Ci(xi) denote the xi-th set in Ci.Ci(xi) includes no more than k original classes.

P 中的类可以被认为是一个有序的序列。 有序序列可以分为一系列子序列，每个子序列包含k个类（允许第一个序列和最后一个序列包含较少数量的类）。 显然，将P划分为k个子序列有k种划分方式。 这 k 个分区表示为 C1,C2,...,Ck。 现在，Class(P) 转化为{Ci }.Ci,i ∈ [1, 2, ..., k] 的分类，由几组按顺序排列的原始类组成。 如果n/k 是整数，则C1 中将有n k 个集合，n/k + 1 个用于C2、...和Ck 的集合。 如果n/k 不是整数，则Ci 中将有⌈n/k⌉ 个集合。 让 Ci(xi) 表示 Ci.Ci(xi) 中的第 xi 个集合，包括不超过 k 个原始类。

For clearly illustrate the new classification and how to automatically get new class labels, an example with k = 3 is shown in Figure 3. When k = 3, P will be divided in three ways as {C1,C2,C3}. Because there are 9 classes in P, so C1 has 3 sets of classes, C1(1) = {1, 2, 3},C1(2) = {4, 5, 6},C1(3) = {7, 8, 9}, and both C2 and C3 have 4 sets of classes, for example, C2(1) = {1, 2}, C2(2) = {3, 4, 5}, C2(3) = {6, 7, 8},C2(4) = {9}. Then, according to which sets in all the k divisions the original class of P belongs to, the new class label will be assigned for the original class. For example, the original class 1 is assigned as (C1(1),C2(1),C3(1)). The new class label for original class 2 is (C1(1),C2(1),C3(2)), because C1(1), C2(1) and C3(2) include the original class 2.

为了清楚地说明新的分类以及如何自动获取新的类标签，图 3 显示了 k = 3 的示例。当 k = 3 时，P 将分为 {C1,C2,C3} 三种方式。 因为P中有9个类，所以C1有3组类，C1(1) = {1, 2, 3},C1(2) = {4, 5, 6},C1(3) = {7, 8, 9}，并且C2和C3都有4组类，例如C2(1) = {1, 2}, C2(2) = {3, 4, 5}, C2(3) = {6 , 7, 8},C2(4) = {9}。 然后，根据P的原始类在所有k个分区中属于哪个集合，为原始类分配新的类标签。 例如，原始类 1 被分配为 (C1(1),C2(1),C3(1))。 原始类 2 的新类标签是 (C1(1),C2(1),C3(2))，因为 C1(1)、C2(1) 和 C3(2) 包括原始类 2。

After transforming the original n-classification to be Ci-classification, the original class P(j), j ∈ [1, 2, ..., n] in P has k new classes. P(j) can be uniquely represented by the indexes of k new classes as follows.

将原来的n-classification转化为Ci-classification后，原来的类P(j),j∈[1,2,...,n]在P中有k个新类。 P(j) 可以由 k 个新类的索引来唯一表示，如下所示。



#### 3.3 Overlap Loss Function

After transforming the original n-classification to be Ci-classification, the original classification problem P can be solved by dealing with the k new classification problems. In order to make use of the overlap and make the neural network learn the association between classes, only one network will be adopted, instead of using k networks to solve the k classification problems respectively. In the common solution, a network is used to output one series of scores to make bone age predict which can be denoted as j′. And overlap model allows the neural network to output k series of raw scores to make k predict results(x1', ..., xk') for these k classification problems. Then, the final predict of bone age is x1'+ ... + xk' − 2, according to the equation 4.

将原来的n-classification转化为Ci-classification后，处理k个新的分类问题就可以解决原来的分类问题P了。 为了利用重叠，使神经网络学习类之间的关联，将只采用一个网络，而不是使用k个网络分别解决k个分类问题。 在常见的解决方案中，网络用于输出一系列分数来预测骨龄，可以表示为 j'。 重叠模型允许神经网络输出k个原始分数序列，使k个预测结果 (x1', ..., xk') 为这k个分类问题。 然后，根据等式 4，骨龄的最终预测值为 x1'+ ... + xk' − 2。

As for a certain classification problem Ci , it can be treated as a common multiclass classification problem. So the softmax cross entropy loss can also be adopted to solve Ci . Then, the total classification loss called overlap classification loss can be denoted as OCL.

对于某个分类问题 Ci ，可以将其视为一个常见的多类分类问题。 所以也可以采用softmax交叉熵损失来求解Ci。 然后，称为重叠分类损失的总分类损失可以表示为 OCL。

What’ more, in order to make sure the outputs (predict results) of a used CNN is overlap, ErrorLoss is designed. As it is shown in equation (4), any P(j), j ∈ [1, 2, ..., n] can be represented by k new classes. In fact, due to the deliberate design of overlap mechanism, any two adjacent classes Ci(xi),Ci+1(xi+1),i = [1, 2, ..., k − 1], in the k new classes satisfied a rule of that xi+1−xi <= 1. In some way, this feature indicates the continuity between classes of the overlap model. In order to make the neural network conform to this feature, ErrorLoss gives a penalty when its predict results (x ′ 1 , ..., x ′ k ) break this rule.

更重要的是，为了确保使用的 CNN 的输出（预测结果）是重叠的，设计了 ErrorLoss。 如等式（4）所示，任何 P(j), j ∈ [1, 2, ..., n] 都可以用 k 个新类表示。 实际上，由于重叠机制的刻意设计，任意两个相邻的类 Ci(xi),Ci+1(xi+1),i = [1, 2, ..., k − 1], 在 k 个新 类满足 xi+1−xi <= 1 的规则。在某种程度上，这个特征表明了重叠模型的类之间的连续性。 为了让神经网络符合这个特征，ErrorLoss 在它的预测结果（x ′ 1 , ..., x ′ k ）违反这个规则时给予惩罚。

At last, the final loss functionOverlapLoss is the sum of theOCL andw ∗ErrorLoss whilew denotes the relative weight of ErrorLoss. In particular, if the original problem P is solved by the overlap model, its loss function can be denoted as OverlapLoss(P).

最后，最终的损失函数OverlapLoss是OCL和w*ErrorLoss之和，w表示ErrorLoss的相对权重。 特别地，如果原始问题 P 由重叠模型解决，则其损失函数可以表示为 OverlapLoss(P)。



#### 3.4 Details of Classifier

In the proposed method, the CNN can be any Classic CNN such as Inception [21], Resnet [8]. It is expected to output k series of raw outputs in the proposed method. Then k classifiers are used to make k predict results according to these raw outputs. The total number of the output raw scores can be roughly calculated as k ∗(224/k) = 224, which is equal to the numbers of common solution. This means that the proposed method, comparing with common solutions, does not increase neural network units. In the training stage, the CNN is made to treat k tasks independently with the k classifiers while the overlapping feature of labels can fully express the relations among the k tasks. The relation information can be controlled so that we can make adjust intentionally.

在所提出的方法中，CNN 可以是任何经典 CNN，例如 Inception [21]、Resnet [8]。 预计在所提出的方法中输出 k 系列的原始输出。 然后使用 k 个分类器根据这些原始输出做出 k 个预测结果。 输出原始分数的总数可以粗略计算为 k ∗(224/k) = 224，这等于公共解的数量。 这意味着所提出的方法与常见的解决方案相比，不会增加神经网络单元。 在训练阶段，使CNN与k个分类器独立处理k个任务，而标签的重叠特征可以充分表达k个任务之间的关系。 可以控制关系信息，以便我们可以有意识地进行调整。

Although the proposed loss function guides the network to output overlap predicts, a trained network is possible to give out predicts that are not overlap. In this case, the final bone age also can be figured out by the equation 4. And the bad effects caused by one coincident wrong predict can be reduced by other k − 1 predicts. This shows the robustness of the proposed method. To implement the proposed method, the most important parameter is the value of k. We offer an implementation based on Python language and Pytorch frame. More details of the overlap classification mechanism can be found in the project website1.

虽然提议的损失函数引导网络输出重叠预测，但经过训练的网络有可能给出不重叠的预测。 在这种情况下，最终的骨龄也可以通过等式 4 来计算。并且可以通过其他 k-1 次预测来减少由一个巧合错误预测造成的不良影响。 这表明了所提出方法的鲁棒性。 为了实现所提出的方法，最重要的参数是 k 的值。 我们提供基于 Python 语言和 Pytorch 框架的实现。 有关重叠分类机制的更多详细信息，请参见项目网站1。



### EXPERIMENTS

#### 4.1 Dataset and Implementation details

A public dataset came from RSNA Pediatric Bone Age Machine Learning Challenge 2 is used. It contains 12,611 x-ray images, of which there are 6,833 images for men and 5,788 images for women. Most of the samples are labeled between 96 to 168 months, while the samples of other age groups are relatively small. And the age distribution of the dataset is shown at Figure 5. We adopt the assessment approach of five-fold cross validation. The dataset are divided into five equal groups randomly for training and testing. One group is taken out each time as a test set, and the rest as the training set.

使用来自 RSNA Pediatric Bone Age Machine Learning Challenge 2 的公共数据集。 它包含 12,611 张 X 射线图像，其中男性图像 6,833 张，女性图像 5,788 张。 大部分样本标注在 96 至 168 个月之间，而其他年龄段的样本相对较少。 数据集的年龄分布如图5所示。我们采用五重交叉验证的评估方法。 将数据集随机分为五个相等的组进行训练和测试。 每次取出一组作为测试集，其余作为训练集。

Data augmentation is also applied for train sets. In detail, the radiographs in the training dataset were randomly rotated at degrees from −15 to 15. What’s more, the brightness, contrast and hue are randomly changed by a coefficient in range between 0.85 and 1.15. When training CNNs, a recommended tips for overlap classification method is setting the initial learning rate is to 0.001 then decreasing it by 3 with every 14 steps with Adam optimization. What’s more, as for the weight w of ErrorLoss, a recommended tip is to setting the initial weight as 10, then decreasing it by 10 with every 10 steps.

数据增强也适用于训练集。 具体来说，训练数据集中的射线照片随机旋转了 -15 到 15 度。此外，亮度、对比度和色调随机改变了一个介于 0.85 和 1.15 之间的系数。 在训练 CNN 时，重叠分类方法的推荐提示是将初始学习率设置为 0.001，然后使用 Adam 优化每 14 步将其减少 3。 更重要的是，对于ErrorLoss的权重w，一个推荐的技巧是将初始权重设置为10，然后每10步减少10。