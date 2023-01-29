import { BaseConfig } from "./type"

export const defaultConfig = (): BaseConfig => ({
  artifacts: [],
  allowSetNumber: [2, 4],
  ConfigCmd: `
/*
You will have to configure all set effects here. This optimizer won't 
automatically set any stacks or conditions to the effects.

Also remember to mark the "Shielded" checkbox in the character attributes
if you want to optimize Retracing Bolide with its 4-piece set effect enabled.

Note that the effect configurations in this section will override the configurations 
you do in the application, but will be overrided by configurations done in the 
rotation code.
*/

case 
NoblesseOblige4
TenacityOfTheMillelith4
DeepwoodMemories4
ArchaicPetra4
ViridescentVenerer4
Instructor4:
  // by default, these party effects will be applied to the entire party.
  effect apply all
  /* 
  you can apply the effect to the member you want, for example:

  effect apply Xiangling

  If you don't want the effect to be applied to the target, then unapply
  from it:

  effect unapply $target_name
  */
  
case 
ArchaicPetra4 
ViridescentVenerer4:
  // by default, Petra and VV effects will have applied the aura corresponding to 
  // the target's element, you can change it to the aura (s) you want, or all.
  effect aura $target_element_aura
  // the constant $target_element_aura is predefined by the optimizer, 
  // you can read more about it in the documentation.
  
case OceanHuedClam4:
  // stacks refer to accumulated healing so by default will be 0.
  // set this to the corresponding value if you're optimizing a character
  // with healing capabilities.
  effect stacks 0

case CrimsonWitchOfFlames4:
  effect stacks 1 // optimize CW4 with 1 stacks

case PaleFlame4:
  effect stacks 2

case
HuskOfOpulentDreams4
FlowerOfParadiseLost4
VermillionHereafter4:
  effect stacks 4
    `.trim()
})