## The Problem
We want to put a given amount of rolls for specific substats to a build of 5 artifacts. An example input could be:
substat | # of rolls
--------|------------
CRIT_RATE |15
CRIT_DMG |13
ELEMENTAL_MASTERY |8
HP_PERCENT |3
HP_FLAT |3
ATK_PERCENT| 2
DEF_FLAT| 1

Let $n$ the number of substats, and $m_i$ the number of rolls for the _i-th_ substat, where $0\leq i < n$.

In the example input, $n=7$, $m_0=15$, $m_1=13$ and so on.

So, the question is: how can those rolls be distributed in 5 artifacts?

## 1. Initial approach
An initial approach to the problem will be using the following integer linear programming model:

### Decision variables
We want to find how many rolls of each stat to put in each artifact. There are 5 artifacts, and each one of them can have different rolls.

So, for each artifact, we will have $n$ variables representing the number of rolls of each substat **in that artifact**:

Let $S_{i,j}$ the number of rolls of the stat $i$ that will be put in the artifact $j$.

In total, we will have $5i$ decision variables.

### Constraints
C1. Each substat in an artifact can have 6 rolls at most:

$$
\begin{equation}
\text{For each i,j: }S_{i,j} \leq 6
\end{equation}
$$

C2. The sum of all rolls in an artifact can be 9 at most:

$$
\begin{equation}
\text{For each j: }\sum_{i=0}^{n-1} S_{i,j} \leq 9
\end{equation}
$$

C3. The sum of all rolls of each stat, in all artifacts, should be at least the required value:

$$
\begin{equation}
\text{For each i: }\sum_{j=0}^{4} S_{i,j} \geq m_i
\end{equation}
$$

Based on the example input, the constraints for the first artifact would look like this:

$$
\begin{equation}
\begin{split}
S_{0,0} & \leq 6 \\
S_{1,0} & \leq 6 \\
S_{2,0} & \leq 6 \\
S_{3,0} & \leq 6 \\
S_{4,0} & \leq 6 \\
S_{5,0} & \leq 6 \\
S_{6,0} & \leq 6 \\
\end{split}
\end{equation}
$$

$$
\begin{equation}
S_{0,0} + S_{1,0} + S_{2,0} + S_{3,0} + S_{4,0} + S_{5,0} + S_{6,0} \leq 9
\end{equation}
$$

And the constraints for the required number of rolls, like this:

$$
\begin{equation}
\begin{split}
S_{0,0} + S_{0,1} + S_{0,2} + S_{0,3} + S_{0,4} & \geq 15 \\ 
S_{1,0} + S_{1,1} + S_{1,2} + S_{1,3} + S_{1,4} & \geq 13 \\ 
S_{2,0} + S_{2,1} + S_{2,2} + S_{2,3} + S_{2,4} & \geq 8 \\ 
\text{and so on...}
\end{split}
\end{equation}
$$

Additional constraints are required when an artifact has as mainstat one of the required substats, in which case $S_{i,j} = 0$ where $i$ is that repeated stat.

### Objective
This can be just: $\min{z}=\sum_{i=0}^{n-1} S_{i,j}$

This approach has a problem: it could let not enough space in an artifact to include 4 substats (even if they're not in the input). For example, look at this artifact:

Substat|# of rolls
--------|--------
Substat 0|6
Substat 1|3
Substat 2|0
Substat 3|0

The above result meets all the proposed constraints, but is still an impossible artifact: there is no space for substats 3 and 4 to exists.

## 2. Constraints for possible artifacts

To solve this problem, I propose to **select**, at most, 4 substats from the required ones, using binary decision variables as follows:

Let the decision variable $A_{i,j} = 1$ if the substat $i$ will be selected for the artifact $j$, and  $A_{i,j} = 0$ otherwise.

C4. First, we need to constraint these variables to be 0 or 1:

$$
\begin{equation}
\text{For each i,j: }A_{i,j} \leq 1
\end{equation}
$$

Again, if a substat is repeated with a mainstat, then it cannot be selected, being that case $A_{i,j} \leq 0$.

C5. Now we have to select 4 substats for a single artifact, so:

$$
\begin{equation}
\begin{split}
\text{For each j: }\sum_{i=0}^{n-1} A_{i,j} & \geq 4 \\
\sum_{i=0}^{n-1} A_{i,j} & \leq 4 \\
\end{split}
\end{equation}
$$

> Note that for this method to work, there must be enough substats to pick from. If that's not the case, then you can just fill the pool with "empty" stats with 0 required rolls, and after solving the problem removing them. For my implementation, i'll always fill a pool of 5 substats, the required ones + some empty ones to fill the remaining.

C6. Once the 4 substats are selected, we're gonna change the constraints proposed in $\left(\text{C1}\right)$ by the following ones: 

$$
\begin{equation}
\begin{split}
\text{For each i,j: }
 S_{i,j} & \leq 6 A_{i,j} \\
  S_{i,j} & \geq A_{i,j}
\end{split}
\end{equation}
$$
Equivalent to:
$$
\begin{equation}
\begin{split}
\text{For each i,j: }
 S_{i,j} - 6 A_{i,j} & \leq 0 \\
  -S_{i,j} +A_{i,j} & \leq  0
\end{split}
\end{equation}
$$

Which means that, if a substat is selected, it must have 1 roll at least and 6 rolls at most; otherwise it will be zero.

Those extra variables $A_{i,j}$ can just be added to the objective the same way as $S_{i,j}$.

With this approach, we'll have a total of $10i$ decision variables.


### Solving the model
I'll make an example for the first 4 substats of the example input, and only one artifact. Count starts from zero:

Variable  | S_0_0 | S_1_0 | S_2_0 | S_3_0 | A_0_0 | A_1_0 | A_2_0 | A_3_0 | v
----------|-------|-------|-------|-------|-------|-------|-------|-------|-
C2        |   1   |   1   |   1   |   1   |       |       |       |       | 9
C4 (0)    |       |       |       |       |   1   |       |       |       | 1
C4 (1)    |       |       |       |       |       |   1   |       |       | 1
C4 (2)    |       |       |       |       |       |       |   1   |       | 1
C4 (3)    |       |       |       |       |       |       |       |   1   | 1
C5        |       |       |       |       |   -1  |  -1   |  -1   |  -1   | -4
C6 (1.0)  |   1   |       |       |       |  -6   |       |       |       | 0
C6 (1.1)  |       |   1   |       |       |       |  -6   |       |       | 0
C6 (1.2)  |       |       |   1   |       |       |       |  -6   |       | 0
C6 (1.3)  |       |       |       |   1   |       |       |       |  -6   | 0
C6 (2.0)  |  -1   |       |       |       |  1    |       |       |       | 0
C6 (2.1)  |       |  -1   |       |       |       |  1    |       |       | 0
C6 (2.2)  |       |       |  -1   |       |       |       |  1    |       | 0
C6 (2.3)  |       |       |       |  -1   |       |       |       |  1    | 0


The same format of variables and constraints applies for the rest of artifacts, and then the constraints $\left(\text{C3}\right)$ for the required rolls, in the form:

$$
S_{0,0} + S_{0,1} + S_{0,2} + S_{0,3} + S_{0,4} \geq m_0 
$$

When a solution is feasible, this method does work. The generated artifacts meet all the constraints required to be _technically_ possible. However, there're still two problems:

1. Note that the constraint $\left(\text{C5}\right)$ forces the solver to pick 4 substats, which lets open the possibility to generate **more** rolls than required when the input is small.

2. The generated artifacts tend to be "unbalanced", and stack many rolls in a single substat. For example, this is how a solution for the example input looks like:
```
Piece 0           | # rolls |  Piece 1           | # rolls |  Piece 2     | # rolls |  Piece 3     | # rolls |  Piece 4           | # rolls |  
-----------------------------------------------------------------------------------------------------------------------------------------------
CRIT_RATE         | 2.00    |  CRIT_RATE         | 6.00    |  CRIT_RATE   | 1.00    |  CRIT_RATE   | 6.00    |  CRIT_DMG          | 1.00    |  
CRIT_DMG          | 5.00    |  CRIT_DMG          | 1.00    |  CRIT_DMG    | 6.00    |  HP_PERCENT  | 1.00    |  ELEMENTAL_MASTERY | 6.00    |  
ELEMENTAL_MASTERY | 1.00    |  ELEMENTAL_MASTERY | 1.00    |  HP_FLAT     | 1.00    |  HP_FLAT     | 1.00    |  HP_PERCENT        | 1.00    |  
DEF_FLAT          | 1.00    |  HP_PERCENT        | 1.00    |  ATK_PERCENT | 1.00    |  ATK_PERCENT | 1.00    |  HP_FLAT           | 1.00    |
```
Note that, despite being "correct", it's very unrealistic to have 5 artifacts with 5+ rolls to the same substat.

To solve the first problem, i changed the objective function: penalizing the selection of the required substats by using higher coefficients. In this way, the selection of "empty" substats will be preferred whenever possible. This, however, does not guarantee that it will be generated **only** the required number of rolls when the input is small, so an additional run over the generated result would be neccesary to remove the exceeding rolls.

## 3. Balancing artifacts

### First approach: constraints in the LP model
Solving the second problem adds a bit more of complexity. Concretely, what we want to do is to **minimize the difference** between the number of rolls o each stat on all artifacts. That can be done by adding another group of decision variables expressed as, literally, the absolute difference between the number of rolls of a given substat in two artifacts:

$$
\begin{equation}
\begin{split}
\text{For each i,j: } ~~ D_{i,j} & \geq \left|S_{i,j} - S_{i,r(j)}\right| \\
\text{where } r(j) & =
    \begin{cases}
        j+1 & \text{if } 0\leq j \leq 3\\
        0 & \text{if } j = 4
    \end{cases}
\end{split}
\end{equation}
$$

This will evaluate the absolute diference between the stats of artifacts 0 and 1, artifacts 1 and 2, 2 and 3, 3 and 4, and finally 4 and 0. The pairing could actually be any other, but this is the simplest way.

Linearizing the absolute value, we have that:

$$
\begin{equation}
\begin{split}
D_{i,j} & \geq S_{i,j} - S_{i,r(j)} \\
D_{i,j} & \geq S_{i,r(j)} - S_{i,j}
\end{split}
\end{equation}
$$

C7. Equivalent to:

$$
\begin{equation}
\begin{split}
-D_{i,j} + S_{i,j} - S_{i,r(j)} & \leq 0  \\
-D_{i,j} - S_{i,j} + S_{i,r(j)}& \leq 0
\end{split}
\end{equation}
$$

Now we have to modify the objective function again, adding the variables $D_{ij}$ with a higher coefficient to minimize them. 

Unfortunately, the huge amount of new constraints makes the model extremely slow, non-viable for execution in a web browser. This means that we need a different method, one that doesn't rely on adding constraints to the model, using the "unbalanced" result (which is solved _fast enough_) as starting point.
