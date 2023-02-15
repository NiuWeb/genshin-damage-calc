import { foods } from "@src/resources"
import { strings } from "@src/strings"
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
        description: "Adds a food to the party",
        arguments: ["name"],
        example: "food add adeptustemptation",
        compile({ Value, Log }, [name]) {
            const gen = foods.FindByName(name)
            if (!gen) {
                throw Log.Throwf("Cannot find food %s", name)
            }
            return function food_add() {
                const foods = Value.Party.GetFoods()
                foods.Add(gen)
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
                const foods = Value.Party.GetFoods()
                    .GetAll()
                    .map(food => food.Options)
                Log.Log("\n" + strings.Food(...foods))
            }
        }
    }
}))