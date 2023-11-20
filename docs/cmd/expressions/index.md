# Embedded expressions

In a command, you can include expressions to facilitate mathematic or logical calculations. The basic syntax for running an expression is the following:

```
echo {
    5 + 1/2
}
```

The command `echo` will print the result of the expression to the console. In this case, it will print `5.5`. If you want to run an expression without printing the result, you can use the command `void` instead:

```
void {
    5 + 1/2
}
```

You can include expressions in numerical arguments, like this:

```js
const $some_number 5
character level { 25 + 5*$some_number }
effect stack { 3 * $some_number + 1 }
```

## Variables
Inside an expression, you can declare and use variables as follows:

```js
echo {
    var(variableName, value),
    variableName + 1 // the last expression will be printed
}
```

There are some reserved variables related to the characters in the party, read more about them in the [variables](./variables.md) section.

## Functions
There are two functions to facilitate operations with variables:

```js
echo {
    var(variableName, value),
    add(variableName, 1), // add 1 to the variable
    multiply(variableName, 2), // multiply the variable by 2
    variableName // the last expression will be printed
}
```

A list of functions can be found in the [functions](./functions.md) section.

You can also declare and use your own functions:

```js
void {
    // Function declaration
    func(myFunctionName, (arg1, arg2), arg1 + arg2*2),

    // Function call
    call(myFunctionName, 1, 2), // 5

    // If your function has no arguments, declare it like this:
    func(myFunctionName, 0, 5),
}
```

## Run-time expressions
All expressions open with normal brackets `{...}` will be pre-processed and replaced in the code **before** the command is executed. So, this code:

```js
character level { char_level + 1 }
character level { char_level + 1 }
character level { char_level + 1 }
```

Won't increase the character level by 3, but by 1, because all the expressions will be replaced with the same character level: the one set in the editor before running the command.

If you want to re-evaluate the expression every time the command is executed, you can use the `@` symbol before the expression:

```js
character level 50
character level {@ char_level + 1 } // set level to 51
character level {@ char_level + 1 } // set level to 52
character level {@ char_level + 1 } // set level to 53
```