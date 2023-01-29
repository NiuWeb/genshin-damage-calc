import type { Infusion } from "@core/character/infusion"
import type { Charbox } from "@core/charbox"
import type { Effect } from "../effect"
import type { Register } from "../register/register"
import { BuilderPart } from "./part"
import { stat } from "@core/stats"

export class InfusionBuilder extends BuilderPart {
    private infusions = new Map<Charbox, Infusion>()
    private element = stat.NONE
    private max = false

    Set(element: number, max: boolean) {
        this.element = element
        this.max = max
        return this
    }

    onBuild(target: Charbox, _: Effect, reg: Register): void {
        if (this.element !== stat.NONE) {
            const infusion = reg.Infusion(target.GetCharacter().AddInfusion(this.element, this.max))
            this.infusions.set(target, infusion)
        }
    }
    onEnable(target: Charbox, ef: Effect): void {
        const infusion = this.infusions.get(target)
        if (infusion) {
            infusion.Enabled = ef.Enabled()
        }
    }
    onDisable(target: Charbox): void {
        const infusion = this.infusions.get(target)
        if (infusion) {
            infusion.Enabled = false
        }
    }

}