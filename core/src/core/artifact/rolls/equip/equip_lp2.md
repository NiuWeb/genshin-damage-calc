## Approach with balanced results

A different model is proposed in this document, in the attempt to generate more balanced results as explained [here](./equip_lp.md).

Using the same input as example:

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

In this new model, the decision variables won't be "number of rolls per substat per artifact", but instead, "number of roll per substat per artifact **per upgrade**". This means that decision variables will be binary since an upgrade can increase only one roll.

Using this idea, each decision variable can be given a higher weight depending on the upgrade, so the solver will try to avoid the high levels of upgrades.

### Decision variables

Let's say that $S_{ijk}$ is the number of rolls of substat $i$ in artifact $j$ in upgrade $k$, where:

- $i$ is the substat index. In the example input, 0 is crit rate,  2 is elemental mastery and so on.

- $j$ is the artifact index. In the example input, 0 is flower, 1 is plume and so on.

- $k$ is the upgrade index. In the example input, 0 is the initial state, 1 is the first upgrade and so on, until 5, which is the maximum upgrade.

### Objective function

The objective function would be:

$$
\min {Z} = \sum_{i=0}^{n-1} \sum_{j=0}^{4} \sum_{k=0}^{5} \left( w_{k} S_{ijk} \right)
$$

Where $w_{k}$ is the weight of the upgrade $k$. As an arbitrary configuration, let's say that:

$$
w_k = k + 1
$$

Which means that the upgrade 0 has a weight of 1, the upgrade 1 has a weight of 2, and so on. Each upgrade being weighted more than the previous one will make the solver try to avoid the high levels.

### Constraints

C1. Decision variables are binary.

$$
S_{ijk} \leq 1
$$

C2. The total number of rolls per substat on a single artifact must be less than or equal to 6.

$$
\text{For each i, j:} \sum_{k=0}^{5} S_{ijk} \leq 6
$$

C3. There must be at most 4 substats selected at any upgrade.

$$
\text{For each j, k:} \sum_{i=0}^{n-1} S_{ijk} \leq 4
$$

C4. The total number of rolls per artifact must be less than or equal to 9.

$$
\text{For each j:} \sum_{i=0}^{n-1} \sum_{k=0}^{5} S_{ijk} \leq 9
$$

Also note that, if artifact $j$ has as mainstat the stat $i$, then the same stat can't be selected as a substat, which means $S_{ijk} = 0$.

C5. The total rolls sum per stat must be greater than or equal to the input.

$$
\text{For each i:} \sum_{j=0}^{4} \sum_{k=0}^{5} S_{ijk} \geq m_i
$$

C6. If a roll was not selected at upgrade 0, it can't be selected at any other upgrade. This can be modeled as:

$$
\begin{split}
\text{For each i, j:}
\sum_{k=1}^{5} S_{ijk} & \leq 5 S_{ij0}\\
\left(\sum_{k=1}^{5} S_{ijk}\right) - 5 S_{ij0} & \leq 0
\end{split}
$$

### Results
For the same input as example, an optimal solution is:
```
Piece 0     | # rolls |  Piece 1           | # rolls |  Piece 2           | # rolls |  Piece 3           | # rolls |  Piece 4           | # rolls |  
-----------------------------------------------------------------------------------------------------------------------------------------------------
CRIT_RATE   | 4.00    |  CRIT_RATE         | 4.00    |  CRIT_RATE         | 4.00    |  CRIT_RATE         | 3.00    |  CRIT_DMG          | 3.00    |  
CRIT_DMG    | 3.00    |  CRIT_DMG          | 2.00    |  CRIT_DMG          | 2.00    |  CRIT_DMG          | 3.00    |  ELEMENTAL_MASTERY | 2.00    |  
ATK_PERCENT | 1.00    |  ELEMENTAL_MASTERY | 2.00    |  ELEMENTAL_MASTERY | 2.00    |  ELEMENTAL_MASTERY | 2.00    |  HP_PERCENT        | 2.00    |  
DEF_FLAT    | 1.00    |  ATK_PERCENT       | 1.00    |  HP_FLAT           | 1.00    |  HP_PERCENT        | 1.00    |  HP_FLAT           | 2.00    |
```