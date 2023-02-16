# Rotations: mathematical model

Here i'll describe the maths behind aura uptime and reaction uptime in the `rotation hit` calculation.

- Let $a$ the **aura uptime**.
- Let $r$ the **reaction uptime**.

## Aura uptime

$$
\text{damage} = 
a(\text{damage with aura}) + 
(1-a)(\text{damage without aura})
$$

## Reaction uptime

Combining aura and reaction uptime lets us with 3 different possible states:
 - Not affected by the aura, cannot trigger reaction ($X_1$).
 - Affected by the aura, can trigger reaction ($X_2$).
 - Affected by the aura, cannot trigger reaction ($X_3$).

Once the damage of each state is calculated, we have to get an expected value, and for this, it's neccesary to assign a _weight_ to each damage, lets call it $P(X_i)$.

The weight of the first state is: $P(X_1)=1-a$, because it's the complement of being affected by an elemental aura.

For the second state, the weight should be a subset of "having an elemental aura applied", which means it has to be in the form $P(X_2)=a*y$, where $y$ is the weight of "triggering a reaction **given that** the elemental aura is applied".

Using the conditional probability formula:

$$
P\left(A|B\right) = \frac{P\left(A\cap B\right)}{P\left(B\right)}
$$

 - $P\left(A|B\right)$ is "the probability of A given B".
 - $P\left(A\cap B\right)$ is "the probability of A **and** B".
 
Let's say that, in our case, $A$ is the event "can trigger a reaction" and $B$ is the event "having an elemental aura applied". This implies two things:
 - The value of $P(B)$ is the aura uptime, so $P(B)=a$.
 - the value of reaction uptime is equivalent to $P\left(A\cap B\right)$, because triggering a reaction requires both events, so $P\left(A\cap B\right)=r$.

Replacing in the conditional probability formula, we now have the weight of the second state:
 
$$
P(X_2) = a\frac{r}{a} = r
$$

The third state is complement to the second: "NOT triggering a reaction **given that** the elemental aura is applied":

$$
P(X_3) = a\left(1-\frac{r}{a}\right)
$$

Finally, the expected value of the damage is:
 
$$
\text{damage} = (1-a)X_1 + rX_2 + aX_{3}\left( {1 - \frac{r}{a}} \right)
$$
