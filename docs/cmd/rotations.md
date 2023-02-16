# Writting rotations

Rotations have to be **declared explicitly**. This means that no consequences 
or side-effects will be automatically assumed by the calculator. If using 
a normal attack with a character triggers Xingqiu elemental burst, you will
have to declare the hit of the normal attack **and** the hit of Xingqiu's
elemental burst.

This also means that the rotations are **static**. Buffs involving changes in
the rotation such as attack speed or an increase in the number of attacks
will not be automatically considered.

## 1. Casting attacks
To declare any character attack, use the command `rotation hit` as follows:
```js
rotation hit Xingqiu Q *60
//              ^    ^   ^
//              1    2   3
// 1: Character name
// 2: Instance (attack) name
// 3: Multiplier
```
The multipliers are optional, you can insert the amount you want, separated by spaces
but always with the `*` symbol at the left, for example:
```js
rotation hit Xingqiu Q *37 *1.21 *1.33 // three multipliers
```

You can find the name of all instances by running the command `character damage` in the console, or in the application by clicking in the lens icon of a damage instance:

![hit name](./media/hit_name.png)

You **don't** have to include the `HIT_` prefix in the command.

So you could write something like this:
```js
// a rotation for albedo
rotation hit Albedo E // Skill cast damage
rotation hit Albedo E_DOT *7 // 7 instances of transient blossom
rotation hit Albedo Q // burst cast damage
rotation hit Albedo Q_DOT *3 // 3 instances of fatal blossom
```