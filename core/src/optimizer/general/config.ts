import { Config } from "./type"

export const defaultConfig = (): Config => ({
    ConfigCmd: `# Uncomment the line below if you want to generate optimal substats
# using the default ranges of rolls:
    // substats default
# Also, you can define your own rolls range:
    // substats range atk%=0:12 cr=0:10 cd=0:12 em=0:12 er=0:12
# And you can define minimum values for substats:
    // substats min atk%=5 cr=3 cd=3 em=3 er=3
# And general rolls configuration:
    // substats tier 3   // use max rolls
    // substats tier avg // use average rolls
    // substats total 25 // optimize 25 rolls
# By default, the substats optimization is disabled., which means
# that it will be used the values defined in the artifacts.
# Any of the commands above will enable the substats optimization.


weapon 4* rank=1,5 # optimize all 4* weapons at rank 1 and 5
artifact \\
    sands=atk% \\
    goblet=atk% \\
    circlet=cr,cd # compare crit rate and crit damage circlets
add

weapon 5* rank=1 # optimize all 5* weapons at rank 1
artifact \\
    sands=atk% \\
    goblet=atk% \\
    circlet=cr,cd # compare crit rate and crit damage circlets
add

# You can also add specific weapons and configurations:
// weapon jadespear rank=3 stacks=1,3,5
// weapon alleyhunter rank=5 stacks=1:10

# Or specific combinations of artifact sets:
// artifact sands=atk% goblet=pyro,physical circlet=cr,cd set=gladiator*4
// artifact sands=atk% goblet=pyro,physical circlet=cr,cd set=gladiator+noblesse`
})