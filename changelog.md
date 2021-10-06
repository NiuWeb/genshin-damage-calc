# Changelog
WORK IN PROGRESS

Genshin Impact Damage Calculator.
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
- Added **Reminiscence of Shime** artifacts set.
- Added **Seal of Insulation** artifacts set.
- Added a new _default preset_ for Hu Tao.

## [6/07/2021]
- Added Keqing.
- Added Xingqiu.
- Added Qiqi.
- Updated **The Flute** passive.
- Added preset name on **Damage Details** view.
- Added `changelog.md` file to repository.