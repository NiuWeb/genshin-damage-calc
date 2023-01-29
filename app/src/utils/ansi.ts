import Convert from "ansi-to-html"

const convert = new Convert({
    colors: {
        1: "#ff7777",
        2: "#77ff77",
        3: "#ffff77",
        4: "#77ff77",
    }
})

/** converts an ANSI colorized string to HTML */
export function AnsiToHtml(ansi: string): string {
    return convert.toHtml(ansi)
}