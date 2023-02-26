import { MapList } from "@src/utils/lists/list"
import type { Charbox } from "../charbox"
import type { Food } from "./food"
import type { Generator } from "./type"
import { FoodType } from "./type"

/**
 * Stores multiple foods, allowing only one food of each type.
 */
export class Foodbox {
    constructor(private target: Charbox) { }

    private byName = new MapList<Food>(food => food.Name)
    private byType = new Map<FoodType, Food>()

    /** 
     * Adds a food to the target using its generator.
     * A previous food of the same type will be removed.
     */
    Add(gen: Generator) {
        // find previous food of the same type
        const prev = this.byType.get(gen.Type)
        if (prev) { // remove it
            prev.Unapply()
            this.Remove(prev.Name)
        }
        const food = gen(this.target)
        this.byName.Add(food)
        this.byType.set(gen.Type, food)
        return food
    }

    /** Removes a food from the target. */
    Remove(name: string) {
        const food = this.byName.Find(name)
        if (!food) {
            return
        }
        this.byName.Remove(food)
        this.byType.delete(food.Type)
        food.Unapply()
    }

    /** Removes all foods from the target. */
    Clear() {
        for (const food of this.byName.Get()) {
            food.Unapply()
        }
        this.byName.Clear()
        this.byType.clear()
    }

    /** Gets the food with the given name. */
    Get(name: string): Food | undefined {
        return this.byName.Find(name)
    }

    /** Gets the food of the given type. */
    GetByType(type: FoodType): Food | undefined {
        return this.byType.get(type)
    }

    /** Gets all foods. */
    GetAll(): readonly Food[] {
        return this.byName.Get()
    }
}