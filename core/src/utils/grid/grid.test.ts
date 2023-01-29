import { Grid } from "./grid"

describe("Grid operations", () => {

    test("Hash do and undo", () => {
        const hash = Grid.dohash(125, 334)
        const [x, y] = Grid.undohash(hash)

        expect(x).toEqual(125)
        expect(y).toEqual(334)
    })

    test("Get and set", () => {
        const grid = new Grid<number>(32)
        grid.Set(32, 15, 777)
        grid.Set(1, 1, 23)
        grid.Set(0, 14, 2)

        expect(grid.Get(1, 1)).toEqual(23)
        expect(grid.Get(0, 14)).toEqual(2)
        expect(grid.Get(32, 15)).toEqual(777)
    })

    test("Loop", () => {
        const grid = new Grid<number>(3)
        grid.Set(1, 1, 23)
        grid.Set(0, 14, 2)

        const test_grid: number[][] = []
        grid.ForEach((v, x, y) => {
            test_grid.push([x, y, v])
        })
        expect(new Set(test_grid[0])).toEqual(new Set([1, 1, 23]))
        expect(new Set(test_grid[1])).toEqual(new Set([0, 14, 2]))
    })
})