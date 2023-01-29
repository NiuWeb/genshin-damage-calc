import { Constants } from "@src/cmd2/type"
import { DEFINE_CONST_EXP, INLINE_COMMENT_EXP, REPLACE_CONST_EXP } from "./expr"

/**
 * Find constat definitions in a command string.
 * Remove the definitions from the string and store the values in an object.
 * @param input code to find and replace in
 * @param constants predefined constants to replace in the code.
 * @returns Array with:
 * - [0]: code removing the constant definitions and replacing the constant values.
 * - [1]: List of constants with their final value.
 */
export function FindConstants(text: string, constants: Constants = {}): [string, Constants] {
    // find constants
    text = text.replace(DEFINE_CONST_EXP, (_, name, value) => {
        value = value.replace(INLINE_COMMENT_EXP, "") // remove inline comments
        constants[String(name).valueOf().toLowerCase()] = value
        return ""
    })
    return [text, constants]
}

/** 
 * Replace constants into a command string.
 * Constants are used in the form `$name` in any part of the code.
 * @param input the code to replace in
 * @param constants predefined constants to replace in the code. Defaults an empty object.
 * Throws an error when trying to replace an undefined constant.
 * @returns Array with:
 * - [0]: code removing the constant definitions and replacing the constant values.
 * - [1]: List of constants with their final value.
 */
export function ReplaceConstants(text: string, constants: Constants = {}): string {
    // replace constants
    text = text.replace(REPLACE_CONST_EXP, (_, name) => {
        const value = constants[String(name).valueOf().toLowerCase()]
        if (!value) {
            throw new Error("Cannot find constant: $" + name)
        }
        return value
    })
    return text
}