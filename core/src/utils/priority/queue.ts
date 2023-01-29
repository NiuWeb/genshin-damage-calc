import { PriorityQueue as _PriorityQueue } from "@js-sdsl/priority-queue"

/**
 * Priority Queue item
 * @template T The data type of the objects to store
 */
export interface Item<T> {
    item: T,
    priority: number
}
/**
 * Priority Queue
 * @template T The data type of the objects to store
 */
export class PriorityQueue<T> {
    private queue: _PriorityQueue<Item<T>>
    private mirror?: _PriorityQueue<Item<T>>
    private readonly maxSize: number

    /**
     * Creates a priority queue.
     * If `maxSize` is defined, a "mirror" queue will be created
     * with the elements stored in inverse order so that,
     * when the queue size exceeds the maximum, the lowest
     * value will be removed.
     * @param maxSize Maximum items to store in the queue
     */
    constructor(maxSize?: number) {
        this.queue = new _PriorityQueue<Item<T>>([], (a, b) => b.priority - a.priority, false)

        if (maxSize) {
            this.mirror = new _PriorityQueue<Item<T>>([], (a, b) => a.priority - b.priority, false)
            this.maxSize = maxSize
        } else {
            this.maxSize = Infinity
        }
    }
    /** Queue length */
    public Length() {
        return this.queue.length
    }

    /**
     * Adds an element to the queue
     * @param object The object to add
     * @param priority The priority of the object
     */
    public Push(object: T, priority: number) {
        const item: Item<T> = {
            item: object,
            priority: priority
        }
        this.queue.push(item)

        if (this.mirror) {
            this.mirror.push(item)
            if (this.queue.length > this.maxSize) {
                const last = this.mirror.pop()
                if (last) {
                    this.queue.remove(last)
                }
            }
        }
    }
    /**
     * Dequeues an element
     * @returns [item, priority]
     */
    public Pop(): [T, number] {
        const pop = this.queue.pop()
        if (!pop) {
            throw new Error("Priority queue is empty")
        }
        return [pop.item, pop.priority]
    }
    /**
     * Pops all the elements in the queue
     */
    public Extract() {
        const list: T[] = []
        while (this.queue.length > 0) {
            list.push(this.Pop()[0])
        }
        return list
    }
}