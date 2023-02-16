# Optimizer constants
Some optimizers allow configuration through code, like the weapons
optimizer or the sets optimizer.

For those places, the program provides a list of pre-defined constants
that can be used within the code:

constant | description
---------|------------
`$target_name` | The name of the character set as target in the application. For example `Xiangling`.
`$target_element` | The element (as a stat) of the character set as target in the application. For example `HYDRO_DMG` or `ELECTRO_DMG`.
`$target_element_aura` | The element (as an aura) of the character set as target in the application. For example `HYDRO` or `ELECTRO`.

The above constants also exists for each one of the party members, in the form `$member_<n>_<variable>`. For example:
```
$member_0_name
$member_3_element
...etc
```