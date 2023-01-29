import { CSSProperties } from "react"

/** Gets CSS properties for text and background color with a visually distinct color */
export function differentColor() {
    let index = 0
    return {
        Next(): CSSProperties {
            const col = differentCssColors[index]
            index = (index + 1) % differentCssColors.length
            return col
        }
    }
}

const differentCssColors: CSSProperties[] = [
    {
        color: "rgb(10, 10, 10)",
        backgroundColor: "rgb(169, 169, 169)"
    },
    {
        color: "rgb(255, 255, 255)",
        backgroundColor: "rgb(47, 79, 79)"
    },
    {
        color: "rgb(255, 255, 255)",
        backgroundColor: "rgb(127, 0, 0)"
    },
    {
        color: "rgb(255, 255, 255)",
        backgroundColor: "rgb(128, 128, 0)"
    },
    {
        color: "rgb(10, 10, 10)",
        backgroundColor: "rgb(60, 179, 113)"
    },
    {
        color: "rgb(255, 255, 255)",
        backgroundColor: "rgb(128, 0, 128)"
    },
    {
        color: "rgb(255, 255, 255)",
        backgroundColor: "rgb(255, 0, 0)"
    },
    {
        color: "rgb(10, 10, 10)",
        backgroundColor: "rgb(255, 140, 0)"
    },
    {
        color: "rgb(10, 10, 10)",
        backgroundColor: "rgb(255, 215, 0)"
    },
    {
        color: "rgb(255, 255, 255)",
        backgroundColor: "rgb(0, 0, 205)"
    },
    {
        color: "rgb(10, 10, 10)",
        backgroundColor: "rgb(127, 255, 0)"
    },
    {
        color: "rgb(10, 10, 10)",
        backgroundColor: "rgb(0, 255, 127)"
    },
    {
        color: "rgb(255, 255, 255)",
        backgroundColor: "rgb(65, 105, 225)"
    },
    {
        color: "rgb(10, 10, 10)",
        backgroundColor: "rgb(0, 255, 255)"
    },
    {
        color: "rgb(10, 10, 10)",
        backgroundColor: "rgb(0, 191, 255)"
    },
    {
        color: "rgb(255, 255, 255)",
        backgroundColor: "rgb(255, 0, 255)"
    },
    {
        color: "rgb(10, 10, 10)",
        backgroundColor: "rgb(240, 230, 140)"
    },
    {
        color: "rgb(255, 255, 255)",
        backgroundColor: "rgb(255, 20, 147)"
    },
    {
        color: "rgb(10, 10, 10)",
        backgroundColor: "rgb(255, 160, 122)"
    },
    {
        color: "rgb(10, 10, 10)",
        backgroundColor: "rgb(238, 130, 238)"
    }
]