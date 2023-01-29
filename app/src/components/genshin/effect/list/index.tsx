import { Accordion } from "@src/components/accordion/accordion"
import { AccordionItem } from "@src/components/accordion/item"
import { usePagination } from "@src/components/pagination/hook"
import { Pagination } from "@src/components/pagination/pagination"
import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { EffectCard } from "../effect"

export function EffectList({ charbox }: { charbox: genshin.charbox.Charbox }) {
  const groups = charbox.GetGroupedEffects()

  return <Accordion initial={0}>
    {groups.map(([name, list], i) => (
      <AccordionItem key={i} value={i} title={GetString("LABEL.EFFECTS_" + name.toUpperCase())}>
        <InnerList list={list} />
        {!list.length && (
          <div className="text-center">
            {GetString("LABEL.EFFECT_NONE")}
          </div>
        )}
      </AccordionItem>
    ))}
  </Accordion>
}

export function InnerList({ list }: { list: readonly genshin.effect.Effect[] }) {
  const pagination = usePagination(list, 6)
  return <div className="flex flex-col gap-1">
    {pagination.Get().map((ef, i) => (
      <div key={i} className="border border-neutral-900">
        <EffectCard effect={ef} />
      </div>
    ))}
    {pagination.pages > 1 && (
      <div className="flex justify-center">
        <Pagination model={pagination} />
      </div>
    )}
  </div>
}