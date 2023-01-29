/** join multiple multi-line strings horizontally */
export function Horizontal(...args: string[]): string {
    const linearr: string[][] = []
    const lengths: number[] = []
    let maxlines = 0

    args.forEach((arg, i) => {
        linearr[i] = arg.split("\n")
        linearr[i].forEach(line => {
            if (line.length > (lengths[i] || 0)) {
                lengths[i] = line.length
            }
        })
        if (linearr[i].length > maxlines) {
            maxlines = linearr[i].length
        }
    })

    const result: string[] = []

    linearr.forEach((lines, i) => {
        for (let j = 0; j < maxlines; j++) {
            let line: string
            if (j < lines.length) {
                line = lines[j]
            } else {
                line = ""
            }
            while (line.length < lengths[i]) {
                line += " "
            }
            if (result[j] === undefined) result[j] = ""
            result[j] += line
        }
    })
    return result.join("\n")
}