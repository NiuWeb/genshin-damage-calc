import { foods } from "@src/resources"
import { strings } from "@src/strings"
import { toNumber } from "@src/utils/conversions"
import { RunnerCmd } from "../cmd"

export const cmd_food = RunnerCmd(() => ({
    "list": {
        name: "list",
        description: "Lists all the registered foods",
        compile(_, { logger }) {
            const list = foods.GetList()
            const str = strings.Food(...list)

            return function food_list() {
                logger.log("\n" + str)
            }
        }
    },
    "add": {
        name: "add",
        arguments: "name rank",
        description: "Adds a food to the party. Rank is the food quality (1 = suspicious, 2 = normal, 3 = delicious)",
        example: "food add adeptustemptation 3",
        compile({ values: [name, _rank] }, { context, logger }) {
            const gen = foods.FindByName(name)
            const rank = Math.floor(toNumber(_rank))
            if (!gen) {
                throw new Error("Cannot find food: " + name)
            }
            return function food_add() {
                const foods = context.Party.GetFoods()
                const food = foods.Add(gen)
                food.SetRank(rank)
                logger.logf("Food %s added", gen.Name)
            }
        }
    },
    "remove": {
        name: "remove",
        description: "Removes a food from the party",
        arguments: "name",
        example: "food remove adeptustemptation",
        compile({ values: [name] }, { context, logger }) {
            return function food_remove() {
                const foods = context.Party.GetFoods()
                foods.Remove(name)
                logger.logf("Food %s removed", name)
            }
        }
    },
    "show": {
        name: "show",
        description: "Shows the currently added foods",
        compile(_, { context, logger }) {
            return function food_show() {
                const foods = context.Party.GetFoods().GetAll()
                logger.log("\n" + strings.Food(...foods))
            }
        }
    },
    "clear": {
        name: "clear",
        description: "Clears all the foods from the party",
        compile(_, { context, logger }) {
            return function food_clear() {
                const foods = context.Party.GetFoods()
                foods.Clear()
                logger.log("Cleared all foods")
            }
        }
    }
}))