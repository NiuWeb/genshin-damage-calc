import { BaseConfig } from "./type"

export const defaultConfig = (): BaseConfig => ({
  Ranks: {
    3: [5],
    4: [1, 5],
    5: [1]
  },
  ConfigCmd: `
/*
IMPORTANT: Remember to mark the "Shielded" checkbox in the 
character attributes if you want to optimize weapons from
Golden Majesty series (Memory of Dust, Summit Shaper, etc.).
*/
case
WolfsGravestone2
ElegyForTheEnd2
FreedomSworn2
SongOfBrokenPines2
ThousandFloatingDreams2
KeyOfKhajNisut2
HakushinRing1
MakhairaAquamarine1
WanderingEvenstar1
XiphosMoonlight1:
  /*
  These weapon effects will be applied to the entire party
  by default. You can write your own configurations to apply
  to specific characters.
  */
  effect apply all

case KeyOfKhajNisut2:
  effect stacks 3

case
ThrillingTalesOfDragonSlayers1
ForestRegalia1
SapwoodBlade1:
  /*
  By default, these weapon effects will be applied ONLY to the
  first character in the party.
  */
  effect unapply all
  effect apply $member_0_name
`.trim()
})