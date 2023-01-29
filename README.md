# genshin-damage-calc
Advanced damage calculator for genshin impact.

## Notes
- The rotations system is static, which means that no effects able to change it
are taken into account, this includes Attack Speed buffs, cooldown reductions and similar.
If you want to consider that kind of effects, you will have to create modified rotations 
for that prupose.

- Energy Requeriments are not directly taken into account by the calculator. 
Some tools like the optimizers can be configured to apply filters, 
so you can use that to consider the ER%.

## Project structure
There are three projects in this repository:
- core: contains all the maths and logic of the calculator, also characters, weapons, etc., are configured here.
- app: The webapp built in react + vite.
- rotations: a directory containing different sample rotations for the characters, with a basic node server for developement mode.

## Installation
```shell
cd ./app
npm install
npm run dev
```
You should also start the rotations dev server in another shell instance:
```
cd ./rotations
npm install
node server.js
```
