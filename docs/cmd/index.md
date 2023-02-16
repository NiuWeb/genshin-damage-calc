# Use of commands
Some of the most important functions of the calculator, like the rotations and the optimizers, can be configured textually by using a simple commands language. You can also use commands to configure everything about the characters and the team.

The commands can be executed in several locations across the application: 
- in the bottom section you can find a console AND editor.
- In the rotations editor.
- In the configuration section of some optimizers.

Some of these elements have specific functions that will be discussed later. For now, we will focus on the main CLI/editor located in the bottom section.

## 1. Basics
A command does an specific function, like adding or removing a character, changing talent or weapon levels, displaying the stats in the screen, etc.

The basic structure of a command is the following:
```
command argument1 argument2 ...
```

A simple command you can execute would be the following:
```
character add HuTao
```
This will add a new level 1 Hu Tao to the current party, if there isn't one already. In this case, `character` is a command, `add` a subcommand and `HuTao` an argument.

Note that commands and arguments are case-insensitive, which means that `character add HuTao` is the same as `CHARACTER add hutao`.

If you want to know what characters can be added, you can run:
```
character list
```
Or, if you want to get more information about all the subcommands of the `character` command, you could type:
```
help character
```

## 2. Comments
You can include some additional text or notes to a command in the console or the editor by adding the symbols `#` or `//` to the left, like this:
```js
# a comment about what i'm doing
character list // character add Raiden
```
You can also include multi-line comments with the following format:
```js
character list /* this is
a multiline comment
and will not be executed
*/
character add Raiden // here, Raiden WILL be added
```

All the content inside those symbols **will not be executed**, so feel free to be as descriptive as you want.

## 3. Current character
You can edit previously added characters by using different commands like `character level` or `character talent`, but you can only edit **one character at once**. This means that, for a character to be edited, it has to be **selected as current**.

When a character is added, it will be automatically selected as current, for example:
```js
// initially, there is no character selected as current
character add HuTao
// here, the current character is HuTao
character level 90 // change Hu Tao level

character add Raiden
// now, the current character is Raiden
character level 70+ // change Raiden level to 70 (ascended)

character add Zhongli
// and now, it is Zhongli
character level 80 // change Zhongli level
```
If you need to change to any character in the party, use the command `character set` as follows:
```js
// the current character here is Zhongli
character set Raiden
// and now, it is Raiden
character level 1 // change Raiden level, again
```
If you try to select as current a character that is not added, you will get an error as response. However, when an error occurs, the code execution **will not be stopped**. Instead, the details about that error will be written in the console and the execution of the next lines will continue.

Once a character is selected as current, you can start editing it. You could, for example, change its levels and configure a weapon:
```js
character level 90
character talent 6 9 7
weapon set TheCatch
weapon level 90
weapon rank 5
```

When you no longer need to edit, you can "unset" the current character via `character unset` command. By doing this, later modifications won't affect the character unexpectedly. For example, imagine that I try to set and edit a character that is not currently in the party:
```js
character set Venti // throws an error because Venti is not in the party
character level 35  // this will work
```
The first line will throw an error (and the current character won't change), but the second line is being executed anyways, changing the level of **Raiden**.

To avoid this, you can just unset before changing to another character:
```js
// in replace of the previous code block
character unset // unset Raiden, now there is no current character

character set Venti // throws an error because Venti is not in the party
character level 35  // throws an error because there is no current character selected.
```

## 4. Current effect
The logic of configuring effects is about the same as with characters: only one can be editted at once, and you have to set an effect as current in order to modify it.

The only difference is that you can only set as current effects accesible from the current character. 

An effect is accesible from a character only if it's owned by that character, or if is an elemental resonance (which can be accessed from **any character**).

For example, if Hu Tao is the current character, you can access her own skill, burst, passive talent, constellation, weapon or artifact set effects; none of those are accesible if the current character is Raiden.

You can see what effects are accesible by typing `effect list`.

## 5. Constants
You can define constant values and give them a name. This is useful to avoid repeating the same code multiple times. A constant is declared as follows:
```cs
const $constant_name value
```
Constant names must start with a letter, and can contain letters, numbers or underscores.

To use a constant in the code, just type its name including the `$` symbol, for example:
```js
const $char_lvl 90
character level $char_lvl // equivalent to `character level 90`
```
Please note that the constant values are **replaced** in the code **before it's executed**.

You could even define a command as constant value:
```js
const $my_cmd add xiangling
character $my_cmd // equivalent to `character add xiangling`
```

## 6. More reading
- Documentation about writting rotations in code [here](./rotations.md).
- You can find some code examples [here](./examples/index.md).
