## The Problem
We want to know how many rolls, of what tiers, are required to form each substat of a given artifact.

We will call **roll** to a single upgrade of a substat. When a substat is upgraded, a new roll is added to its current value. However, the value of that roll is not always the same; instead, it is randomly picked from a pool _pool_ of 4 possible values, which we'll call **tiers**.

Based on this description, the substats of an artifact can be described as follows:

$$
\begin{equation}
\begin{split}
S_{0} & = R_{0,0}T_{0,0} + R_{0,1} T_{0,1} + R_{0,2}T_{0,2} + R_{0,3} T_{0,3} \\
S_{1} & = R_{1,0}T_{1,0} + R_{1,1} T_{1,1} + R_{1,2}T_{1,2} + R_{1,3} T_{1,3} \\
S_{2} & = R_{2,0}T_{2,0} + R_{2,1} T_{2,1} + R_{2,2}T_{2,2} + R_{2,3} T_{2,3} \\
S_{3} & = R_{3,0}T_{3,0} + R_{3,1} T_{3,1} + R_{3,2}T_{3,2} + R_{3,3} T_{3,3} \\
\end{split}
\end{equation}
$$

Let $S_i$ the _i-th_ substat of the artifact.

Let $R_{ij}$ the amount of rolls of the _i-th_ substat that belongs to the _j-th tier_.

Let $T_{ij}$ the value of a single roll of the _i-th_ substat that belongs to the _j-th tier_.

Therefore, we know the value of all $S_i$ variable, and we want to find the 16 variables of $R_{ij}$. Note that $T_{ij}$ are actually **constants**, provided by the game itself.

## Approach \#1

We can solve this problem by using an integer linear programming model as follows:

### Decision variables

We need to find how many rolls, of what tiers, are being combined (or _could_ be combined) to generate the substats of a given artifacts. So, our decision variables are all the $R_{ij}$ and $T_{ij}$.

### Constraints
We know some things about the artifact substats:

Let $L$ the artifact level.

C1. A single substat can have, at most, $M_L$ rolls, depending on the artifact level and rarity. At level 0 for example, it can have only 1 roll, while at level 20 the maximum is 6. So:

$$
\begin{equation}
\text{For each i: } R_{i,0} + R_{i,1} + R_{i,2} + R_{i,3}  \leq M_L
\end{equation}
$$

C2. An artifact can have, at least, $N_{L}$ rolls, and at most, $N_{L}+1$ rolls **in total**, depending on the artifact level and rarity. For instance, at level 20 an artifact can only have 8 or 9 rolls in total. So:

$$
\begin{equation}
\begin{split}
\sum{R_{ij}}  & \leq N_L+1 \\
\sum{R_{ij}} & \geq N_L
\end{split}
\end{equation}
$$

Note that $L$, $N_L$ and $M_L$ can be considered as constants for this model, since we're not going to be changing the artifact level at all.

C3. The next constraints should be those equalities at $\left(1\right)$, but since visible values in an artifact are rounded it's a good ide to give it an error margin $\epsilon$. So:

$$
\begin{equation}
\begin{split}
\text{For each i: }& \sum(R_{ij}T_{ij}) \leq S_i + \epsilon \\
& \sum(R_{ij}T_{ij}) \geq S_i - \epsilon
\end{split}
\end{equation}
$$

Again, note that $S_i$ and $\epsilon$ are constants.

### Objective
This is likely to be kind of an arbitrary decision, but I decided to **minimize** the total number of rolls:

$$\min{z=\sum{R_{ij}}}$$

Which means that the solver will prioritize solutions matching with artifacts that have 3 initial subs. The "pesimistic" solution.

This method, however, presents a problem: in the calculator, substats are not constraint to be an integer linear combination of rolls, they can actually be any positive value less or equal than the maximun possible value $\left(6T_{i,3}\right)$. So, what about the other values? Specifically, I want this counter to work decently along with the "equip rolls" functionality, which can equip **average** rolls to the artifacts, resulting in substats like `CRIT_RATE = 3.3%` which is not an integer linear combination of any rolls and thus, cannot be solved by the LP solver.

### Approach \#2
We know that, in theory, a single substat should be obtained by the linear combination:

$$S_i = \sum(R_{ij}T_{ij})$$

But as said before, this is not always the case. For those (theoretical and unrealistic, but still important for me) cases in which the LP solver fails, I thought in a simpler solution: a brute-force approach that finds, from all the possible combination, the one that is **closest** to the input value.

For the combinations needed to be evaluated, we know that:

- A combination must have exactly 4 integers, representing the number of rolls of each tier $(R_{ij})$.
- A combination must meet the same constraints described in the LP approach, so:

$$
\text{For each i: } \sum{R_{ij}} \leq M_L
$$

And, in order to make this method "all terrain", let's say that $M_L=6$, the maximum value. This might sound slow but there're actually only 210 combinations that meets the constraints, so evaluating all of them will be _fast enough_.

Now, for each combination, we have to calculate its value $S_i$, and then evaluate:

$$
\epsilon = \frac{\left|S_i-S_i'\right|}{S_i}
$$

Where $S_i'$ is the actual input value of the substat.

Finally, the result will be the combination that **minimizes** $\epsilon$.
