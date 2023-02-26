import { foods } from "@src/resources"
import { strings } from "@src/strings"
import { toNumber } from "@src/utils/conversions"
import { RunnerCmd } from "../cmd"

export const cmd_food = RunnerCmd(() => ({
    "list": {
        description: "Lists all the registered foods",
        arguments: [],
        compile({ Log }) {
            const list = foods.GetList()
            const str = strings.Food(...list)

            return function food_list() {
                Log.Log("\n" + str)
            }
        }
    },
    "add": {
        description: "Adds a food to the party. Rank is the food quality (1 = suspicious, 2 = normal, 3 = delicious)",
        arguments: ["name", "rank"],
        example: "food add adeptustemptation 3",
        compile({ Value, Log }, [name, _rank]) {
            const gen = foods.FindByName(name)
            const rank = Math.floor(toNumber(_rank))
            if (!gen) {
                throw Log.Throwf("Cannot find food %s", name)
            }
            return function food_add() {
                const foods = Value.Party.GetFoods()
                const food = foods.Add(gen)
                food.SetRank(rank)
                Log.Logf("Food %s added", gen.Name)
            }
        }
    },
    "remove": {
        description: "Removes a food from the party",
        arguments: ["name"],
        example: "food remove adeptustemptation",
        compile({ Value, Log }, [name]) {
            return function food_remove() {
                const foods = Value.Party.GetFoods()
                foods.Remove(name)
                Log.Logf("Food %s removed", name)
            }
        }
    },
    "show": {
        description: "Shows the currently added foods",
        arguments: [],
        compile({ Value, Log }) {
            return function food_show() {
                const foods = Value.Party.GetFoods().GetAll()
                Log.Log("\n" + strings.Food(...foods))
            }
        }
    }
}))