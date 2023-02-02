import { CharboxEvent } from "@core/charbox/event"
import { EnemyEvent } from "@core/enemy"
import { stat } from "@core/stats"
import { Options } from "../type"
import { EffectEvent } from "../events"
import { BuilderQuery, RunQuery } from "./query"
import { BuilderObserve } from "./observe"
import { StatBuilder } from "./stat"
import type { BuilderPart, BuilderType } from "./part"
import { InfusionBuilder } from "./infusion"
import { MvBuilder } from "./mvs"
import { InstanceBuilder } from "./instance"

export class Builder implements BuilderType {
    private query: BuilderQuery = {}
    private container: Builder[] = [this]
    readonly observe = new BuilderObserve(this)

    readonly stat = new StatBuilder(this)
    readonly infusion = new InfusionBuilder(this)
    readonly mv = new MvBuilder(this)
    readonly instance = new InstanceBuilder(this)

    private parts: BuilderPart[] = [this.stat, this.infusion, this.mv, this.instance]

    /** builds a single effect builder */
    private innerBuild(...[target, ef, reg]: Parameters<Options["OnApply"]>): () => void {
        reg.StartQuery(this.query)
        const parts = this.parts
        parts.forEach(part => part.onBuild(target, ef, reg))
        const enable = () => parts.forEach(part => part.onEnable(target, ef, reg))
        const disable = () => parts.forEach(part => part.onDisable(target, ef, reg))
        const update = () => {
            if (ef.Enabled() && RunQuery(this.query, ef.Owner, target, ef)) {
                enable()
            } else {
                disable()
            }
        }
        update()

        for (const stat of this.observe.getTarget()) {
            reg.Observer(target.GetCharacter().CreateObserver(stat, update))
        }
        for (const stat of this.observe.getOwner()) {
            reg.Observer(ef.Owner.GetCharacter().CreateObserver(stat, update))
        }
        if (this.observe.getParty()) {
            reg.Observer(target.Event.CreateObserver(CharboxEvent.CHANGE_PARTY, update))
        }

        reg.EndQuery()
        return update
    }

    Build(): Options["OnApply"] {
        return (...[target, ef, reg]: Parameters<Options["OnApply"]>) => {
            const fns = this.container.map(builder => builder.innerBuild(target, ef, reg))
            const update = () => fns.forEach(fn => fn())

            update()
            const tgchar = target.GetCharacter()
            const owchar = ef.Owner.GetCharacter()
            const tgenemy = tgchar.GetEnemy()

            // observe effect changes
            for (const ev of [
                EffectEvent.CHANGE_RANK,
                EffectEvent.CHANGE_STACKS,
                EffectEvent.CHANGE_CONDITIONS,
                EffectEvent.CHANGE_AURAS,
                EffectEvent.ENABLE,
                EffectEvent.DISABLE,
            ]) {
                reg.Observer(ef.CreateObserver(ev, update))
            }
            // observe target and owner changes that determines queries
            for (const ev of [stat.LEVEL, stat.ASCENSION, stat.HP_CURRENT, stat.ENERGY_CURRENT, stat.SHIELDED]) {
                reg.Observer(tgchar.CreateObserver(ev, update))
                reg.Observer(owchar.CreateObserver(ev, update))
            }
            // observe enemy changes
            reg.Observer(tgenemy.Event.CreateObserver(EnemyEvent.CHANGE_AURA, update))
            return () => 0
        }
    }

    Next(): Builder {
        const next = new Builder()
        next.container = this.container
        this.container.push(next)
        return next
    }

    Where(query: BuilderQuery): Builder {
        this.query = query
        return this
    }
}