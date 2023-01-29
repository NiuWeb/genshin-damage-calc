import { PriorityQueue } from "./queue"


describe("Priority queue", () => {
    test("Items are popped from higher to lower priority", () => {
        const queue = new PriorityQueue<number>()
        queue.Push(35, 11)
        queue.Push(1777, 0.11)
        queue.Push(3, 21)

        expect(queue.Pop()[0]).toBe(3)
        expect(queue.Pop()[0]).toBe(35)
        expect(queue.Pop()[0]).toBe(1777)
    })

    test("queue with limited size discards lower priorities", () => {
        const queue = new PriorityQueue<string>(3)
        queue.Push("A", 11)
        queue.Push("B", 0.11)
        queue.Push("C", 21)
        queue.Push("D", 15)
        queue.Push("E", 6)
        queue.Push("F", 29)
        queue.Push("G", 1)

        expect(queue.Length()).toBe(3)
        expect(queue.Pop()[0]).toBe("F")
        expect(queue.Pop()[0]).toBe("C")
        expect(queue.Pop()[0]).toBe("D")
        expect(queue.Length()).toBe(0)

    })

})