import { MapList } from "./list"

const createList = () => new MapList<{ a: number }>(({ a }) => "id:" + a)
describe("MapList operations", () => {

    test("Search items", () => {
        const list = createList()
        list.AddList([
            { a: 34 },
            { a: 999 },
            { a: -1 }
        ])

        const found = list.Find("id:" + 999)
        expect(found).toBeDefined()
        expect(found?.a).toBe(999)
    })
    test("Delete items", () => {
        const list = createList()
        list.AddList([
            { a: 34 },
            { a: 999 },
            { a: -1 }
        ])
        list.Remove(list.Find("id:" + 999)!)

        const found = list.Find("id:" + 999)
        expect(found).not.toBeDefined()
        expect(found?.a).not.toBe(999)
    })

})