import { formatResults } from "./format"
import { Result } from "./type"

test("Format results in string table", () => {
    const format = formatResults(getInput())
    console.log(format.toString())
})



const getInput = (): Result[] => (
    [
        {
            "cmd": "weapon set jadecutter\nweapon rank 1\nweapon level 90\neffect unset\neffect set JadeCutter1\neffect stacks 0\neffect condition \neffect aura \neffect unset\nartifact add\nartifact main ATK_PERCENT HYDRO_DMG CRIT_DMG\nartifact stars 5\nartifact level 20\nartifact add\nartifact fill\nartifact stars 5\nartifact rolls tier 4\nartifact rolls equip ENERGY_RECHARGE 11 ATK_PERCENT 0 CRIT_RATE 8 CRIT_DMG 6 ",
            "combination": {
                "weapon": {
                    "name": "jadecutter",
                    "rank": 1,
                    "stacks": 0,
                    "condition": [
                        ""
                    ],
                    "aura": [
                        ""
                    ],
                    "target": [
                        ""
                    ]
                },
                "artifact": {
                    "sands": 4,
                    "goblet": 28,
                    "circlet": 21,
                    "stacks": 0,
                    "condition": [
                        ""
                    ],
                    "aura": [
                        ""
                    ],
                    "target": [
                        ""
                    ],
                    "substats": {
                        "total": 25,
                        "tier": 4,
                        "substats": [
                            {
                                "stat": 17,
                                "min": 0,
                                "max": 12
                            },
                            {
                                "stat": 4,
                                "min": 0,
                                "max": 12
                            },
                            {
                                "stat": 19,
                                "min": 0,
                                "max": 12
                            },
                            {
                                "stat": 21,
                                "min": 0,
                                "max": 10
                            }
                        ],
                        "filter": [
                            {
                                "stat": 17,
                                "value": 1.8,
                                "operator": ">="
                            }
                        ]
                    }
                }
            },
            "substats": {
                "rolls": [
                    11,
                    0,
                    8,
                    6
                ],
                "stats": [
                    1.8055500000000007,
                    0.7060000000000002,
                    0.7553947131388539,
                    1.5182999999999995
                ],
                "optimized": [
                    17,
                    4,
                    19,
                    21
                ],
                "damage": 325061.2696621005,
                "relative": 0.6921500305685416,
                "basic": [
                    1784.1566193655362,
                    757.5988927500001,
                    17046.904290928003
                ]
            },
            "damage": 325061.2696621005,
            "relative": 1.091130733620428
        },
        {
            "cmd": "weapon set jadecutter\nweapon rank 1\nweapon level 90\neffect unset\neffect set JadeCutter1\neffect stacks 0\neffect condition \neffect aura \neffect unset\nartifact add\nartifact main ENERGY_RECHARGE HYDRO_DMG CRIT_DMG\nartifact stars 5\nartifact level 20\nartifact add\nartifact fill\nartifact stars 5\nartifact rolls tier 4\nartifact rolls equip ENERGY_RECHARGE 2 ATK_PERCENT 5 CRIT_RATE 10 CRIT_DMG 8 ",
            "combination": {
                "weapon": {
                    "name": "jadecutter",
                    "rank": 1,
                    "stacks": 0,
                    "condition": [
                        ""
                    ],
                    "aura": [
                        ""
                    ],
                    "target": [
                        ""
                    ]
                },
                "artifact": {
                    "sands": 17,
                    "goblet": 28,
                    "circlet": 21,
                    "stacks": 0,
                    "condition": [
                        ""
                    ],
                    "aura": [
                        ""
                    ],
                    "target": [
                        ""
                    ],
                    "substats": {
                        "total": 25,
                        "tier": 4,
                        "substats": [
                            {
                                "stat": 17,
                                "min": 0,
                                "max": 12
                            },
                            {
                                "stat": 4,
                                "min": 0,
                                "max": 12
                            },
                            {
                                "stat": 19,
                                "min": 0,
                                "max": 12
                            },
                            {
                                "stat": 21,
                                "min": 0,
                                "max": 10
                            }
                        ],
                        "filter": [
                            {
                                "stat": 17,
                                "value": 1.8,
                                "operator": ">="
                            }
                        ]
                    }
                }
            },
            "substats": {
                "rolls": [
                    2,
                    5,
                    10,
                    8
                ],
                "stats": [
                    1.8281000000000007,
                    0.48775,
                    0.8214947131388592,
                    1.6503999999999939
                ],
                "optimized": [
                    17,
                    4,
                    19,
                    21
                ],
                "damage": 325005.82153726066,
                "relative": 0.7731847267961347,
                "basic": [
                    1621.864362719236,
                    757.5988927500001,
                    17046.904290928003
                ]
            },
            "damage": 325005.82153726066,
            "relative": 1.0909446113143246
        },
        {
            "cmd": "weapon set sacrificialsword\nweapon rank 1\nweapon level 90\nartifact add\nartifact main ATK_PERCENT HYDRO_DMG CRIT_RATE\nartifact stars 5\nartifact level 20\nartifact add\nartifact fill\nartifact stars 5\nartifact rolls tier 4\nartifact rolls equip ENERGY_RECHARGE 0 ATK_PERCENT 3 CRIT_RATE 10 CRIT_DMG 12 ",
            "combination": {
                "weapon": {
                    "name": "sacrificialsword",
                    "rank": 1,
                    "stacks": 0,
                    "condition": [
                        ""
                    ],
                    "aura": [
                        ""
                    ],
                    "target": [
                        ""
                    ]
                },
                "artifact": {
                    "sands": 4,
                    "goblet": 28,
                    "circlet": 19,
                    "stacks": 0,
                    "condition": [
                        ""
                    ],
                    "aura": [
                        ""
                    ],
                    "target": [
                        ""
                    ],
                    "substats": {
                        "total": 25,
                        "tier": 4,
                        "substats": [
                            {
                                "stat": 17,
                                "min": 0,
                                "max": 12
                            },
                            {
                                "stat": 4,
                                "min": 0,
                                "max": 12
                            },
                            {
                                "stat": 19,
                                "min": 0,
                                "max": 10
                            },
                            {
                                "stat": 21,
                                "min": 0,
                                "max": 12
                            }
                        ],
                        "filter": [
                            {
                                "stat": 17,
                                "value": 1.8,
                                "operator": ">="
                            }
                        ]
                    }
                }
            },
            "substats": {
                "rolls": [
                    0,
                    3,
                    10,
                    12
                ],
                "stats": [
                    1.8124773448208344,
                    0.8546500000000001,
                    0.6915,
                    1.2926
                ],
                "optimized": [
                    17,
                    4,
                    19,
                    21
                ],
                "damage": 245737.33720844507,
                "relative": 0.8248646826024598,
                "basic": [
                    1527.91103841566,
                    757.5988927500001,
                    15002.420242440001
                ]
            },
            "damage": 245737.33720844507,
            "relative": 0.8248646826024598
        }
    ]
)