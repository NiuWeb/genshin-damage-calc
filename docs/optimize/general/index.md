# General optimizer

This tool allows to make a cross-comparison between different weapons, main stats, substats and artifacts sets, finding the combination with the highest damage.

## Defining combinations
The combinations are defined via command. This is a particular command environment so you won't have access to most commands like the ones seen in the [Use of commands](../../index.md) section. However, the optimizer-specific constants are available, read more about them in the [Optimizer constants](../constants.md) section.

The two basic commands to define combinations are `weapon` and `artifact`:

### Weapons
The command `weapon` includes a single weapon to the comparison, but you can include different configurations of it, like different refinements or stacks. For example, This will add only one combination to the comparison: 

```shell
weapon SummitShaper
add
# 1. SummitShaper (refinement 1) with 0 stacks
```

And this will add 6 combinations to the comparison:

```shell
weapon SummitShaper rank=1,5 stacks=0,3,5
add
# 1. SummitShaper (refinement 1) with 0 stacks
# 2. SummitShaper (refinement 1) with 3 stacks
# 3. SummitShaper (refinement 1) with 5 stacks
# 4. SummitShaper (refinement 5) with 0 stacks
# 5. SummitShaper (refinement 5) with 3 stacks
# 6. SummitShaper (refinement 5) with 5 stacks
```
When defining lists of values, you can separate them with commas (`,`), and if is a list of numbers (like the ranks and stacks in the example above), you can use the range operator (`:`) to define a range of values. For example, the following command will compare the weapon at all stacks (6 combinations):

```shell
weapon SummitShaper stacks=0:5
add
```

If you want your range to increase by a different value than 1, you can use the following syntax:

```shell
weapon SummitShaper stacks=0:5:2
add
# 1. SummitShaper (refinement 1) with 0 stacks
# 2. SummitShaper (refinement 1) with 2 stacks
# 3. SummitShaper (refinement 1) with 4 stacks
```



The general form of the `weapon` command is:

```shell
weapon <weapon name> [rank=] [stacks=] [condition=] [aura=]
```

- The arguments in brackets (`[]`) are optional, and can be used in any order.
- `rank` and `stacks` are only numerical lists, but `condition` and `aura` are lists of strings, with the names of the conditions and auras to use.
- The weapon name doesn't need to be an exact match, it can be a similar name. For example, `SummitShaper` and `summit` are both valid names for the weapon `Summit Shaper`.
- The values in the `condition` argument must be exact matches of the weapon effect conditions. Those names can be found in the application, in the effect conditions dropdown.
- The values in the `aura` argument are element names, like "hydro" or "anemo". You can also include "quicken" or "frozen".

### Artifacts
The command `artifact` includes different configurations of main stats and sets, as in the following example:

```shell
artifact main=atk%/em/er,pyro,cr/cd
add
# 1. atk% sands - pyro goblet - crit rate circlet
# 2. atk% sands - pyro goblet - crit damage circlet
# 3. em sands - pyro goblet - crit rate circlet
# 4. em sands - pyro goblet - crit damage circlet
# 5. er sands - pyro goblet - crit rate circlet
# 6. er sands - pyro goblet - crit damage circlet
```

Note that the sands, goblet and circlet main stats are separated by commas (`,`), and the different configurations of each slot are separated by slashes (`/`).

Stat names must be exact matches, but there are some shortcuts you can use:

shortcut | stat
--- | ---
hp | HP_FLAT
hp% | HP_PERCENT
atk | ATK_FLAT
atk% | ATK_PERCENT
def | DEF_FLAT
def% | DEF_PERCENT
em | ELEMENTAL_MASTERY
er | ENERGY_RECHARGE
cr | CRIT_RATE
cd | CRIT_DAMAGE

Also the elemental damage stats are abbreviated, so `pyro` is the same as `pyro_dmg` for example.

--------------

You can include different set configurations, like this:

```shell
artifact set=gladiator+crimsonwitch,wanderer+crimsonwitch,crimson*4
add
# 1. 2 gladiator + 2 crimson witch
# 2. 2 wanderer + 2 crimson witch
# 3. 4 crimson witch
```
And cross it with the main stats:

```shell
artifact main=atk%/em,pyro,cr set=wanderer+crimsonwitch,crimson*4
add
# 1. atk% sands - pyro goblet - crit rate circlet - 2 wanderer + 2 crimson witch
# 2. atk% sands - pyro goblet - crit rate circlet - 4 crimson witch
# 3. em sands   - pyro goblet - crit rate circlet - 2 wanderer + 2 crimson witch
# 4. em sands   - pyro goblet - crit rate circlet - 4 crimson witch
```

The name of the sets doesn't need to be an exact match, it can be a similar name. For example, `gladiator` is valid for the set `GladiatorsFinale`. 

The general form of the `artifact` command is:

```shell
artifact [main=] [set=] [stacks=] [condition=] [aura=] [target=]
```

- The arguments `stacks`, `condition` and aura work the same as in the `weapon` command, and they modify the effects of the 4-piece set only.
- The `target` argument is used to define the target of the 4-piece set. It is the name of the character that will receive the set effect, and will work only for those effects that can be applied to other characters rather than the wielder, like 4pc Noblesse or 4pc Viridescent Venerer. If you don't include this argument, the target will be the wielder, as by default.

### Crossing weapons and artifacts
When you have defined some weapons and artifacts, they will be crossed automatically. For example:

```shell
# define weapons
weapon SummitShaper stacks=0,3,5        # 3 combinations
weapon mistplitter stacks=0,1,3         # 3 combinations
weapon lionsroar rank=1,5               # 2 combinations
weapon blackcliff rank=1,5 stacks=0,1,3 # 6 combinations
# this is 3+3+2+6 = 14 combinations for weapons

# define artifacts
artifact main=atk%/em/er,pyro,cr/cd set=wanderer+crimsonwitch,crimson*4
# this is 6 combinations for the main stats, and 2 for the sets, so 12 combinations for artifacts

artifact main=atk%/er,physical,cr/cd set=paleflame+gladiator,gladiator*4,paleflame*4
# this is 4 combinations for the main stats, and 3 for the sets, so 12 combinations for artifacts

# in total, 12+12 = 24 combinations for artifacts

# When CROSSING weapons and artifacts, the result is 14*24 = 336 combinations in total
add
```

## Stacking groups of combinations
You have seen the use of the `add` command in the previous section. When using this command, the defined combinations are added to the comparison, and the environment is cleared to define new combinations. 

In this way, the command `add` act as separator between groups of combinations: the weapons/artifacts defined in the first group (before the first `add`) will be crossed with themselves, but not with the weapons/artifacts defined in the second group (after the first `add`). For example:

```shell
# first group contains weapons with no crit rate as substat
# so i will use only a crit rate circlet.
weapon SummitShaper stacks=0,3,5 # 3 combinations for weapons
weapon mistplitter stacks=0,1,3  # 3 combinations for weapons
artifact main=atk%/em/er,pyro,cr # 3 combinations for artifacts
# in total (3+3)*3 = 18 combinations for the first group
add

# second group contains weapons with crit rate as substat
# so i will use only a crit damage circlet.
weapon jadecutter # 1 combination for weapons
weapon blacksword # 1 combination for weapons
artifact main=atk%/em/er,pyro,cd # 3 combinations for artifacts
# in total (1+1)*3 = 6 combinations for the second group
add

# In total, 18+6 = 24 combinations will be compared,
# note that the weapons in the first group are not 
# crossed with the artifacts in the second group (and viceversa)
```

## Optimizing substats
By default, the optimizer will use the substats defined in the application. However, you can choose to generate an optimal substats configuration for each combination, using the `substats` command. The logic of this process can be read in the [Substats optimizer](../substats/index.md) section.

As in the substats optimizer, the `substats` command can be used to configure the total rolls, to optimize, the tier of those rolls, the range of each substat, and the filters. For example:

```shell
substats total 25 # 25 rolls to distribute

substats tier 4   # use average rolls
substats tier avg # same as above
substats tier 3   # use max rolls
substats tier 0  # use min rolls

# Define the range of each substat:
substats range atk%=2:12 er=2:12 cr=2:10 cd=2:12
# atk% will be between 2 and 12
# energy recharge will be between 2 and 12
# crit rate will be between 2 and 10
# crit dmg will be between 2 and 12

# Apply minimum filters:
substats min er=180% cr=50% cd=100% em=50
# energy recharge will be at least 180%
# crit rate will be at least 50%
# crit dmg will be at least 100%

# NOTE: If the stat is percentage, remember
# to include the % symbol in the filter value,
# or write the value as a decimal number instead:
substats min er=1.8 cr=0.5 cd=1.0 em=50
```

You can also reset the substats configuration to the default values with the `substats default` command. It will set the total, tier and range to the values found in the application by default, in the substats optimizer section.

When you run any of the `substats` commands, all combinations defined after that will replace the substats of the artifacts for the optimized ones. For example:

```shell
weapon jadecutter
artifact main=atk%/em,pyro,cr # this will use the substats defined in the application

substats default # use substats optimizer default values
artifact main=atk%/em,pyro,cr # this will use the generated substats
```

You can disable the substats optimization with the `substats disable` command. This will make the optimizer use the substats defined in the application for the next combinations. For example:

```shell
weapon jadecutter
artifact main=atk%/em,pyro,cr # this will use the substats defined in the application

substats default # use substats optimizer default values
artifact main=atk%/em,pyro,cr # this will use the generated substats

substats disable
artifact main=atk%/em,pyro,cd # this will use the substats defined in the application
```

You can change the configuration at any line, so it is possible to define certain combinations with one configuration, and other combinations with a different configuration. For example:

```shell
substats default # default configuration
substats min er=150%

# Optimize weapons with no crit rate as substat,
# we will use a crit rate circlet, so the range
# for crit rate will be lower.
substats range atk%=2:12 er=2:12 cr=2:10 cd=2:12
weapon summitshapper
weapon sacrificial
artifact main=atk%/em/er,pyro,cr
add

# Optimize weapons with crit rate as substat,
# we will use a crit damage circlet, so the range
# for crit dmg will be lower.
substats range atk%=2:12 er=2:12 cr=2:12 cd=2:10
weapon jadecutter
weapon blacksword
artifact main=atk%/em/er,pyro,cd
add

# Note that, as the filter is not changed, it will
# be applied to all combinations, in both groups.
```