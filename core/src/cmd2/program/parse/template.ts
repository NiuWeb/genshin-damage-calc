import { Logger } from "@src/cmd2"
import { Line } from "./type"

/*const s: Templates = {
    effect: {
        description:
            "Template to configure an effect. " +
            "Equivalent to running `character set ...` + `effet set ...` before, and " +
            "`character unset` + `effet unset` after",
        example: "@effect(Yelan, YelanA4) {\n\teffect apply HuTao\n\teffect stacks 5\n}",
        arguments: ["character", "effect"],
        before: [
            "effect unset",
            "character unset",
            "character set $character",
            "effect set $effect",
        ],
        after: [
            "effect unset",
            "character unset",
        ]
    }
}*/

type Coord = [row: number, col: number]
type Block = [open: Coord, close: Coord, header: string]
export function FindTemplates(lines: Line[], log = Logger.Global): Line[] {
    const open: Coord[] = []
    const blocks: Block[] = []

    lines.forEach(({ text, line }, i) => {
        log.Line = line + 1
        for (let j = 0; j < text.length; j++) {
            if (text[j] === "{") { // open a new block
                open.push([i, j])
            } else if (text[j] === "}") {
                const last = open.pop() // get the last open block
                if (!last) { // error if no open block
                    const { msg } = log.Error(`Unexpected block close at line ${line + 1} position ${j + 1}`)
                    throw new Error(msg)
                }
                // gets the block header: content before block open
                const start = lines[last[0]].text
                let k = last[1] - 1
                for (; k > 0 && start[k - 1] !== "{"; k--) {
                    void 0
                }
                // inserts the block
                blocks.push([last, [i, j], start.slice(k, last[1])])
            }
        }
    })
    // there should be no open blocks
    if (open.length) {
        const { msg } = log.Error(`Block not closed at line ${lines[open[0][0]].line + 1} position ${open[0][1] + 1}`)
        throw new Error(msg)
    }

    console.log(blocks)
    return []
}
