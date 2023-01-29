import type { InstanceLocation, Charbox } from "@core/charbox"
import { Instance, InstanceOptions, NormalTalent } from "@core/instance"
import { Observer } from "@core/subject"
import { TalentScaling } from "@src/core/scaling"
import { stat } from "@src/core/stats"
import { Effect } from "../effect"
import { Register } from "../register/register"
import { BuilderPart } from "./part"

export class InstanceBuilder extends BuilderPart {
    private store = new Map<Charbox, [Instance, Observer[]]>()
    private options?: InstanceOptions

    private location: InstanceLocation = "Extra"

    Location(loc: InstanceLocation) {
        this.location = loc
        return this
    }
    Options(opts: InstanceOptions) {
        this.options = opts
        return this
    }

    /** Builds an effect with a simple damage instance */
    Basic(props: {
        Name: string
        Element: number
        Talent?: number
        Stat: number
        Values: number[]
    }) {
        this.builder
            .instance
            .Options({
                Name: props.Name,
                Element: props.Element,
                Talent: props.Talent || stat.NONE,
                Scaling: [{
                    Initial: 0,
                    Stat: stat.NONE,
                    Talent: stat.NONE,
                    Scaling: TalentScaling.NONE,
                }]
            })
            .Next()

            .mv
            .Mv(props.Stat, props.Values[0], props.Name)
            .Map((_, __, ef) => {
                const index = Math.max(1, Math.min(props.Values.length, ef.GetRank())) - 1
                return props.Values[index]
            })

        return this
    }

    onBuild(target: Charbox, _: Effect, register: Register): void {
        if (!this.options) {
            return
        }
        const created = NormalTalent(target.GetCharacter(), this.options)
        created[1].forEach(obs => register.Observer(obs))
        register.Instance(target, this.location, created[0])
        this.store.set(target, created)
    }
    onEnable(target: Charbox): void {
        const created = this.store.get(target)
        if (!created) { return }
        created[1].forEach(obs => obs.Notify())

        target.AddInstance(this.location, created[0])
    }
    onDisable(target: Charbox): void {
        const created = this.store.get(target)
        if (!created) { return }

        target.RemoveInstance(this.location, created[0])
    }

}