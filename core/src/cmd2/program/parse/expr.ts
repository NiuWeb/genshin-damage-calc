/** 
 * search expressions in the form:
 * ```
 * const $constant_name value
 * ```
 */
export const DEFINE_CONST_EXP = /^ *const +\$([a-z_](?:\w|\.)*) *(.*)$/img
/**
 * Search expressions in the form:
 * ```
 * $constant_name
 * ```
 */
export const REPLACE_CONST_EXP = /\$([a-z_](?:\w|\.)*)/ig
/** search CRLF line breaks */
export const CRLF_EXP = /(\r\n|\n\r)/g
/**
 * Search expressions in the form:
 * ```
 * ... // comments...
 * ```
 * or 
 * ```
 * ... # comments...
 * ```
 */
export const INLINE_COMMENT_EXP = /(#|\/\/).*$/gm

/**
 * Search expressions in the form:
 * ```
 * /* comments...
 * comments...
 * *\/
 * ```
 */
export const MULT_COMMENT_EXP = /\/\*((?:.|\n|\r)*?)\*\//gm

/** find cases in the form:
 * ```
 * case v1, v2, ...:
 *  code
 * ```
 */
export const DEFINE_CASE_EXP = /case([^:]*):/g