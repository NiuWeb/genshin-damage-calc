# genshin-damage-calc
Advanced damage calculator for genshin impact. Core library.

Application at:
[https://niuweb.github.io/genshin-damage-calc/v4](https://niuweb.github.io/genshin-damage-calc/v4)

Github repo at:
[https://github.com/NiuWeb/genshin-damage-calc](https://github.com/NiuWeb/genshin-damage-calc)

This is the core library of the calculator, it contains all the maths and logic, characters, weapons, etc. If you want to use the entire calculator webapp, you should clone the main repo.

Instead, if you only need the core library to use the calculator in your own project, you can install the core library as a npm package:

```shell
npm install @bygdle/genshin-damage-calc-core
```

It exports both CommonJS and ES modules, so you can import it in your project like this:

```javascript
import { genshin } from '@bygdle/genshin-damage-calc-core'
```
or
```javascript
const { genshin } = require('@bygdle/genshin-damage-calc-core')
```