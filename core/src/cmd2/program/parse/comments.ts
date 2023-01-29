import { CRLF_EXP, MULT_COMMENT_EXP, INLINE_COMMENT_EXP } from "./expr"

/** Remove all comments from the code */
export function RemoveComments(input: string): string {
    return input
        // change CRLF to LF
        .replace(CRLF_EXP, "\n")
        // remove multiline comments
        .replace(MULT_COMMENT_EXP, (match) => (
            match.replace(/[^\n]/g, " ")
        ))
        // remove inline comments
        .replace(INLINE_COMMENT_EXP, "")
}