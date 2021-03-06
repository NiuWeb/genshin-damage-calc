## [04/06/2022]
- Fixed condition text [ES] on Hamayumi.
## [31/05/2022]
- Added Yelan.
- Added 3 ★ Recurve Bow.
## [28/05/2022]
- Updated default rotation for Ayaka (quickswap rotation).
## [28/05/2022]
- Added new weapons of the version 2.7:
  - 5 ★ Aqua Simulacra.
  - 4 ★ Fading Twilight.
## [29/04/2022]
- Fixed description text for Prototype Crescent.
- Fixed [ES] description text for Lithic weapon series.
## [17/04/2022]
- Fixed table headers text in Resin Optimizer results that was displayed in EN language only.
- Fixed Talent Level Upgrades text in Resin Optimier results, that was in range 2-10 even when the character had C3/C5 enabled (it must be in range 5-13). This **does not** affect the calculation results.
## [11/04/2022]
- Updated rotations for Keqing (4xN1C).
## [30/03/2022]
- Updated rotations for Kamisato Ayato: Single target and AoE.
- Added rotation for Yoimiya vaporize.
## [29/03/2022]
- Added Kamisato Ayato.
- Added new artifact sets:
  - Echoes of an Offering.
  - Vermillion Hereafter.
- Added new weapon:
  - 5 ★ Haran Geppaku Futsu.
## [19/03/2022]
- Added Barbara.
- Added Razor.
## [13/03/2022]
- Fixed resin cost calculation for Character Ascensions.
## [12/03/2022] V2
- Added new characters:
  - Yae Miko
  - Yun jin
  - Shenhe
  - Sucrose
  - Kazuha
- Added new artifact sets:
  - Ocean-Hued Clam.
- Updated default rotations for Raiden Shogun, now it includes Charged Attacks.
- Updated formulas for the **Royal** weapon series, to include negative CRIT Rate values.
- Fixed **Bennett C6**: The Pyro DMG Bonus should be applied to any character, regardless of their weapon type.
- Added new damage attributes:
  - ATK (percentage and flat) for specific elemental types (Electro ATK%, Geo Flat ATK, etc.).
  - ATK (percentage and flat) for specific talent types (Elemental Burst ATK%, Charged Attack Flat ATK, etc.).
  - CRIT Rate for specific elemental types (Cryo CRIT Rate, Pyro CRIT Rate, etc.).
  - Base multiplier for specific instances.
  - Flat damage for specific instances.
- Updated **Damage Formula** view with new damage attributes.
- Added option to **See more** advanced attributes in the **Attributes** section.
- Added option to **View scaling** of skills in the **Talents** section.
- Artifacts can now have no artifact set assigned (default).
- Added **Filter** system in the **Optimize Substats** and **Optimize Artifacts** tools: Only those combinations that matches the conditions set by the filters will be included in the results, for example, a minimum amount of _Energy Recharge_.
- Updated the filter system of the **Inventory** of artifacts.
- Changed the structure of the calculator data files. Version 1 files are not directly compatible with Version 2 files.
- Added option to import data from files in Version 1 format in the **Storage** section.
- Added option to import artifacts from GOOD format files (_Genshin Optimizer_ and some scanners) in the **Storage** section.
- Added new **Items** section: Lists all characters, weapons and artifact sets currently available in the calculator, along with their descriptions.
- Fixed resin cost for character ascensions.
- Added details view for **Resin Cost**, open it by clicking on a resin cost box in the optimizer results.
- Added option to configure the **datasheets** of the resin optimizer, including the _drop rates_ and costs per _run_ of each domain.
- Minor changes in the GUI.
### New rotation system
The new rotation system is based on three different actions:
- **Instances:** The attacks made by the character.
- **Effect Controls:** Allows you to dynamically configure the attributes of any effect within the rotation. For example, turning off skill bonuses before certain instances of damage are calculated.
- **Additional Instances:** Allows you to manually include damage instances of weapons (such as _Aquila Favonia_ or _Crescent Pike_) and artifact sets (such as _Ocean-Hued Clam_).

The rotation editor has also been changed to a grid-like one, where different actions can be dragged and dropped. **Actions are executed from left to right and from top to bottom**.

## [28/02/2022]
- Fixed Eula's **Roiling Rime**: damage must not scale with energy stacks.
## [12/02/2022]
- Added new weapons:
  - 5 ★ Kagura's Verity.
  - 4 ★ Oathsworn Eye.
## [30/01/2022]
- Updated _default rotations_ for Venti and Ganyu.
## [31/12/2021]
- Added 5 ★ Calamity Queller.
## [23/12/2021]
- Added Gorou.
## [17/12/2021]
- Added Arataki Itto.
## [10/12/2021]
- Added 5 ★ Redhorn Stonethresher.
## [06/12/2021]
- Updated Fischl C6 default rotations: increased Oz attacks from 9 to 11.
- Fixed Fischl damage instances' talent type:
  - Fischl A4 is Elemental Skill DMG.
  - Fischl C1 is Normal Attack DMG.
  - Fischl C6 is Elemental Skill DMG.
- Added *average roll* quality values to **Substat rolls optimizer**.
## [02/12/2021]
- Fixed Superconduct DMG.
## [01/12/2021]
- Fixed bug with set **Shimenawa's Reminiscence (4)** where Elemental Burst Effects remained disabled even after changing sets.
## [23/11/2021]
- Added Traveler (Geo).
- Added Traveler (Anemo).
- Added Lisa.
- Added Jean.
- Added Klee.
- Added Kujou Sara.
- Added 4 ★ Cinnabar Spindle.
- Added Eula's Grimheart DEF% bonus effect.
- Added new character attributes: Element-specific CRIT DMG.
## [17/11/2021]
**Please clear cache.**
- Added **rotation rules** system: certain effects can automatically set up rotation parameters and restrictions. This affects **Shimenawa's Reminiscence**:
  - This artifact set has now 4 effect states: Disabled (cast Q), Enabled (cast Q), Disabled (no Q), Enabled (no Q).
  - The states marked up with _(no Q)_ will add a rotation rule that excludes all the instances of **Elemental Burst DMG** from the damage calculation.
  - The states marked up with _(no Q)_ will also automatically disable all **Elemental Burst Effects** of the character.
- Fixed damage calculation: Enemy DEF ignored is multiplicative with DEF reduction, not additive. This affects **Raiden Shogun C2**.
- Fixed **Noelle C2**: Charged Attack bonus is +15%, not +20%.
- Added new artifact set: **Husk of Opulent Dreams**.
## [9/11/2021]
- Added **rotation damage formula** view: click on the name of a damage instance in _Damage_ section to display it.
## [8/11/2021]
- Performance improved for Artifacts Optimizer. **Please clear cache**.
## [7/11/2021]
- Added calculation details and expected time to Artifacts Optimizer.
## [4/11/2021]
- Updated **rotation damage calculation** system: there are now two different parameters to set up **amplifying reaction** consistency and **elemental aura** consistency. This update will affect calculation result for objects that applies effects conditioned by reaction and elemental aura with different uptimes, like **4 ★ Dragon's Bane** or **4 ★ Rainslasher**, but any other calculation will remain the same.
- Updated _default rotation_ parameters for:
	- Amber
	- Bennett
	- Diluc
	- Hu Tao
	- Xiangling: removed old rotations, added new rotations for C0 and C4 _off-field_ damage only.
	- Yanfei
	- Chongyun
	- Ganyu
	- Qiqi
	- Rosaria
	- Mona
	- Tartaglia: removed old rotations, added new rotations for N3C attack combo using **ranged burst**.
- Updated [ES] descriptions for:
  - 3 ★ Skyrider Greatsword.
  - 3 ★ White Iron Greatsword.
  - 4 ★ The bell.
  - 5 ★ Skyward Pride.
- Fixed substat value for:
  - 3 ★ Skyrider Greatsword.
  - 3 ★ White Iron Greatsword.
## [03/11/2021]
- Fixed _confirm cancel_ dialog text in Substats optimizer.
## [29/10/2021]
- Added new weapons:
  - 4 ★ Mouun's Moon.
  - 4 ★ Wavebreaker's Fin.
- Added **Damage Formula** view: click on the name of a damage instance in _Talents_ section to display it.
## [28/10/2021]
**New GUI!**
Please clear cache

## [13/10/2021]
_(please clear cache)_
- Added Eula.
- improved behavior of numeric inputs.
- Fixed Base ATK for Primordial Jade Cutter.
- Fixed Base ATK for Sword of Descension.
## [11/10/2021]
- Updated Storage view.
- Fixed bugs with Storage Imports.
## [09/10/2021]
- Added **2.2** weapons:
  - 5★ Polar Star.
  - 4★ Akuoumaru.
- Updated _default presets_ for Fischl: all new presets has Electro aura applied, electrocharged presets also includes A4 damage instances.
- Updated GUI:
  - Weapons classified by stars in Weapon view.
  - Updated builds table.
  - In Weapon Optimizer results: large effect strings are not displayed if all possible options are included.
  - Hidden checkbox to disable Artifact set effects.
  
- Fixed bug where importing an storage file with artifacts but without _presets_ generated an error.
- Fixed bug that generated miscalculations in Artifacts Optimizer.
## [06/10/2021]
- Added new _default presets_ for Hu Tao C0.
## [05/10/2021]
- Updated _default presets_ for Hu Tao: removed old presets, added presets for C0 and C1.
- Updated **Artifacts optimizer**: improved performance.
- Added new effect configuration for Slingshot: _no arrow effect_.
## [02/10/2021]
**IMPORTANT:** Please clear cache to avoid errors.
- fixed mainstats transform precision.
- Updated **Substats Optimizer**: 
    - Added option to select min/max rolls for each substat.
    - Added option to select automatically substats min/max rolls based on the character's equipped substats.
    - Added option to equip generated combinations.
    - Fixed bug that left substats undefined when equipping generated combinations.
- Added persistent state to optimizers' settings.
- Fixed Beidou C6 description text on Enemy debuffs section.
- Minor GUI changes.
## [01/10/2021]
**IMPORTANT:** Please clear cache to avoid errors.
- Fixed bug with incomplete substats list on Artifact views.
- Updated Damage Section views.
- Optimized priority queues implementation, performance improved.
- Added new **Substats Optimizer**: compares the damage of every possible substat rolls distribution, and displays the highest 100.

## [26/09/2021]
_**(please clear cache)**_
- Added option to **Select stacks** in Artifacts optimizer.
- Updated **Talent priority** optimizer: using new resin calculation.

## [25/09/2021]
- Added Beidou.
- Added C1 _default preset_ for Sangonomiya Kokomi.
- Updated _default presets_ for Xingqiu: removed old presets, added new presets for C0, C2 and C6. Increased Rain Swords number (assumed one wave per second).

## [24/09/2021]
- Added Sangonomiya Kokomi.
- Added 5★ Everlasting Moonglow (weapon).
- Fixed Maiden Beloved (2) Healing Bonus effect.
- Fixed rolls limit per substat on 4-star artifacts (limit increased from 3 to 4).
- Fixed Raiden Shogun C2: effect also applies to Elemental Skill.

## [12/09/2021]
- Added option to set **weekly boss effective materials** for Resin Optimizer.
- Updated Raiden Shogun _default presets_: added Elemental Skill initial hit.
## [11/09/2021]
- New **Resin Optimizer**: calculates the most efficient order to level up character, weapon, and talents.

## [02/09/2021]
_**(please clear cache to avoid errors)**_
- Added Raiden Shogun.
- Added **2.1** weapons:
  - 5★ Engulfing Lightning.
  - 4★ The Catch.
  - 4★ Luxurious Sea-Lord.
  - 4★ Predator.
- Added **DEF ignored** stat for Damage Instances. 
- Updated Artifacts Section:
  - Reorganized piece views.
  - Added **Substat rolls summary** view. 
  - Added new tool: **Substat rolls editor [EXPERIMENTAL]**: Click on a substat in the **Rolls summary** view to open the editor. 
- Updated 4-star artifacts conversion system: sub stat rolls number is also reduced.
- Fixed precision for artifacts sub stat rolls calculator.
- Updated sub stat value conversion: when changing a sub stat, the new value is calculated based on equivalent rolls, instead of minimun roll ratio.
- Updated Sword of Descension effect for Traveler (electro).
- Updated Emblem of Severed Fate name and description [ES].
## [26/08/2021]
- Added artifact **Substat rolls** calculator, click on 🔍 icon on an artifact to display it.
- Fixed Skyward Pride physical hits count.

## [23/08/2021]
- Added Chongyun.
- Added Song of Broken Pines.
- Added **Weekly boss average cost** option to Talent Optimizer.
- Updated GUI:
  - Enemy view moved to Stats section, removed Enemy section.
  - reorganized Talents and Buffs sections columns.
  - Added baseline to percent bars on comparison tables.
  - Hidden C.V. calculation from Damage Details view.

## [15/08/2021]
- Added **Character Summary** view on Stats section.
- Fixed bug with Festering Desire: Elemental Skill CRIT Rate effect.
- Updated **Add Character** view: list of characters organized in a table.
- Updated **Talent Scaling** view: Talent DMG and Talent CRIT Rate values are now displayed.

## [14/08/2021]
- Added claymores.
- Added Diluc.
- Added Noelle.
- Added Yoimiya.
- Updated some _Party Effects_ texts.

## [05/08/2021]
- Updated Skyward Blade effect: hits count fixed.
## [03/08/2021]
- Updated _default preset_ for Ayaka: Charged Attack count reduced from 9 to 8.

## [01/08/2021]
- Added Yanfei.
- Added Kaeya.
- Added Traveler (electro).
- Added weapon: Amenoma Kageuchi.

## [27/07/2021]
- Added Ningguang.
- Fixed bugs with summarized rows (multiple rows with the same weapon and the same damage) on weapon comparison table.

## [24/07/2021]
_**(please clear cache to avoid errors)**_
- Added catalysts.
- Added Mona.
- Added Ayaka.
- Added **2.0** weapons:
  - Mistsplitter Reforged.
  - Thundering Pulse.
  - Kitain Cross Spear.
  - Hakushin Ring.
  - Hamayumi.
- Updated **Select ranks** and **Select stacks** options for weapon optimizer.
- Added **Select stacks** option to artifact sets optimizer.
- Added percentile ranking to comparison tables.
- Updated weapon **hits counter** system: For weapons like The Viridescent Hunt and Skyward Atlas, weapon damage instances count is now calculated based on _hits per round_, _round cooldown_ and _time interval per hit_ properties, in order to get more accurate results.

## [17/07/2021]
- Updated new artifact sets names.
- Added percent bars on weapon comparison tables.
- Added **Select stacks** option for weapon optimizer.
- Typos fixed.

## [14/07/2021]
- Added **Talent Scaling** view for damage instances (click on instance's name to display it).
- Fixed Xingqiu **C4** effect: multiplicative damage bonus.
- Updated Xingqiu _default presets_: increased **Rain Swords** count.
- Added _default presets_ for Xingqiu: **Sacrifical Sword** double Elemental Skill.
- Fixed **Thundersoother** artifacts set name.

## [9/07/2021]
- Added **Shimenawa Reminiscence** artifacts set.
- Added **Emblem of Severed Fate** artifacts set.
- Added a new _default preset_ for Hu Tao.

## [6/07/2021]
- Added Keqing.
- Added Xingqiu.
- Added Qiqi.
- Updated **The Flute** passive.
- Added preset name on **Damage Details** view.
- Added `changelog.md` file to repository.
