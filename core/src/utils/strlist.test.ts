import { SplitString2D } from "./strlist"

test("Split string into list", () => {
    const list = SplitString2D("A,B,C;X,Z,Y;U,V,W", cell => cell)
    expect(list).toEqual([
        ["A", "B", "C"],
        ["X", "Z", "Y"],
        ["U", "V", "W"]
    ])
})


test("split empty string should be 1x1", () => {
    const list = SplitString2D("", cell => cell)
    expect(list.length).toBe(1)
    expect(list[0].length).toBe(1)
})


test("list with numeric ranges", () => {
    const list = SplitString2D("1:3,5:7,9:11;0,1,2;0:10:5", cell => parseInt(cell))
    expect(list).toEqual([
        [1, 2, 3, 5, 6, 7, 9, 10, 11],
        [0, 1, 2],
        [0, 5, 10]
    ])
})

test("list with non-numeric ranges should throw", () => {
    expect(() => SplitString2D("1:z:5,7,a:11", cell => parseInt(cell))).toThrow()
})