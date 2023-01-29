import { Accordion } from "@src/components/accordion/accordion"
import { AccordionItem } from "@src/components/accordion/item"
import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { ModifiersCard } from "./modifiers"

export function ExtraEffectsList({ charbox }: { charbox: genshin.charbox.Charbox }) {

  return <Accordion initial={0}>
    <AccordionItem value={0} title={GetString("LABEL.EFFECTS_CUSTOM")}>
      <ModifiersCard charbox={charbox} />
    </AccordionItem>
    <AccordionItem value={1} title={GetString("LABEL.EFFECTS_FOOD")}>
      foods goes here
    </AccordionItem>
  </Accordion>
}