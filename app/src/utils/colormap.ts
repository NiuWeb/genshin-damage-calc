/**
 * Calculates linear interpolation between two values.
 * @param a Initial value
 * @param b Final value
 * @param t Interpolation factor
 * @returns Interpolated value
 */
export function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t
}
/**
 * Converts a hex color #RRGGBB to an array of [r, g, b]
 */
export function hexToRgb(hex: string): number[] {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : [0, 0, 0]
}

/**
 * Converts an array of [r, g, b] to a hex color #RRGGBB
 */
export function rgbToHex(rgb: number[]): string {

    const hex = (x: number) => Math.floor(Math.min(Math.max(0, x), 255)).toString(16)

    const r = hex(rgb[0])
    const g = hex(rgb[1])
    const b = hex(rgb[2])
    return "#" + (r.length === 1 ? "0" + r : r) + (g.length === 1 ? "0" + g : g) + (b.length === 1 ? "0" + b : b)
}

/**
 * Interpolates between two colors by a given factor.
 */
export function interpolateColor(color1: string, color2: string, factor: number): string {
    const [r1, g1, b1] = hexToRgb(color1)
    const [r2, g2, b2] = hexToRgb(color2)
    return rgbToHex([
        lerp(r1, r2, factor),
        lerp(g1, g2, factor),
        lerp(b1, b2, factor)
    ])
}

export interface IColormapColor {
    /**
     * A number between 0 and 1 representing
     * where this color starts applying
     */
    factor: number,
    /**
     * Color to apply
     */
    color: string
}
export interface ICreateColormap {
    /**
     * Minimun value of the colormap
     */
    min: number,
    /**
     * Maximun value of the colormap
     */
    max: number,
    /**
     * Colormap steps of color
     */
    map: IColormapColor[]
}

/**
 * Colormap between two values represented by a color.
 */
export function createColormap(props: ICreateColormap) {
    if (props.map.length <= 1) {
        throw new Error("Colormap must have at least two colors")
    }
    if (props.map[0].factor > 0) {
        props.map.unshift({
            factor: 0,
            color: props.map[0].color
        })
    }
    return (value: number) => {
        const { min, max, map } = props
        if (value <= min) return rgbToHex(hexToRgb(map[0].color))
        if (value >= max) return rgbToHex(hexToRgb(map[map.length - 1].color))

        const factor = (value - min) / (max - min)
        const index = map.findIndex(m => m.factor >= factor)
        if (index === 0) return map[0].color

        let previous: IColormapColor, current: IColormapColor

        if (index === -1) {
            previous = map[map.length - 2]
            current = map[map.length - 1]
        }
        else {
            previous = map[index - 1]
            current = map[index]
        }

        const previousFactor = previous.factor
        const currentFactor = current.factor
        const subfactor = (factor - previousFactor) / (currentFactor - previousFactor)

        return interpolateColor(previous.color, current.color, subfactor)
    }
}

export function createDefaultColormap(min: number, max: number) {
    return createColormap({
        min,
        max,
        map: [
            {
                factor: 0,
                color: "ff6400"
            },
            {
                factor: 0.5,
                color: "fff000"
            },
            {
                factor: 1,
                color: "1aff00"
            }
        ]
    })
}