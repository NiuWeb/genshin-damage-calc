type Point = [x: number, y: number]
type Rect = [x1: number, y1: number, x2: number, y2: number]
function distance(...[x1, y1, x2, y2]: Rect) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
}

export function domRect(rect: DOMRect): Rect {
    return [rect.left, rect.top, rect.right, rect.bottom]
}
/**
 * Finds the nearest corner from the inner rect (first one) to the outer rect (second rect).
 * The corner is expressed as a normalised vector, where `[0,0]` is the top-left corner,
 * and `[1,1]` is the bottom-right corner.
 * @param param0 inner rect
 * @param param1 outer rect
 * @returns The nearest corner
 */
export function nearestCorner([ax1, ay1, ax2, ay2]: Rect, [bx1, by1, bx2, by2]: Rect) {
    const topLeft = distance(ax1, ay1, bx1, by1)
    const topRight = distance(ax2, ay1, bx2, by1)
    const botLeft = distance(ax1, ay2, bx1, by2)
    const botRight = distance(ax2, ay2, bx2, by2)

    const list = [topLeft, topRight, botLeft, botRight]
    let min = Infinity
    let pos = -1
    list.forEach((v, i) => {
        if (v < min) {
            min = v
            pos = i
        }
    })
    const coords: Point[] = [[0, 0], [1, 0], [0, 1], [1, 1]]
    return coords[pos]
}

/**
 * Moves a destination rect to connect one of its corners with a origin rect.
 * The corner is expressed as a normalised vector, where `[0,0]` is the top-left corner,
 * and `[1,1]` is the bottom-right corner.
 * @param param0 The origin (fixed) rect
 * @param param1 The destination (mobile) rect
 * @param corner The corner of the ORIGIN rect to connect with.
 * @returns The new top-left coordinates of the destination rect.
 */
export function connectRects([ax1, ay1, ax2, ay2]: Rect, [bx1, by1, bx2, by2]: Rect, [x, y]: Point): Point {
    // corner position of the origin rect
    const ax = [ax1, ax2][x]
    const ay = [ay1, ay2][y]

    // destination dimensions
    const bw = bx2 - bx1
    const bh = by2 - by1

    const bx = ax - bw * (1 - x)
    const by = ay - bh * (1 - y)
    return [bx, by]
}