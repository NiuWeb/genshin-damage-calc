/** 
 * Stores objects in a list (for loops) and a map (for search)
 */
export class MapList<T> {
    private list: T[] = []
    private map = new Map<string, T>()

    /** creates a map-list
     * @param getName function to convert an item to a string, for search
     */
    constructor(private getName: (item: T) => string) { }

    /** adds multiple items to the list */
    AddList(items: T[]) {
        for (const ins of items) {
            this.Add(ins)
        }
    }

    /** Adds an item to the list */
    Add(item: T): boolean {
        const name = this.getName(item).toLowerCase()
        if (this.map.has(name)) {
            return false
        }
        this.list.push(item)
        this.map.set(name, item)
        return true
    }

    /** checks if an item exists */
    Has(item: T): boolean {
        return this.map.has(this.getName(item).toLowerCase())
    }

    /** Removes an item from the list */
    Remove(item: T): boolean {
        const name = this.getName(item).toLowerCase()
        const index = this.list.indexOf(item)
        if (index >= 0) {
            this.list.splice(index, 1)
        }
        return this.map.delete(name)
    }
    /** removes all items */
    Clear(): void {
        this.list.splice(0, this.list.length)
        this.map.clear()
    }
    /** finds an item by its name, case insensitive */
    Find(name: string): T | undefined {
        return this.map.get(name.toLowerCase())
    }

    /** Gets the items in the list */
    Get(): readonly T[] {
        return this.list
    }
}