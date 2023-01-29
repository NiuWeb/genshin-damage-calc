import { stats } from "@src/core"
import { EquipType } from "./type"

export enum PropMapStat {
    Ascension = 1002,
    Level = 4001,
}
export const Pieces: { readonly [key in EquipType]: number } = {
    EQUIP_BRACER: stats.piece.FLOWER,
    EQUIP_NECKLACE: stats.piece.PLUME,
    EQUIP_SHOES: stats.piece.SANDS,
    EQUIP_RING: stats.piece.GOBLET,
    EQUIP_DRESS: stats.piece.CIRCLET,
}

export const Weapons: { readonly [key: number | string]: string } = {
    20848859: "BlackcliffSlasher",
    37147251: "SolarPearl",
    160493219: "DarkIronSword",
    197755235: "VortexVanquisher",
    231836963: "PrimordialJadeCutter",
    310247243: "KagurasVerity",
    313300315: "SapwoodBlade",
    342097547: "CinnabarSpindle",
    346510395: "LuxuriousSeaLord",
    411685275: "CompoundBow",
    452357939: "Moonpiercer",
    479076483: "CoolSteel",
    481755219: "BlackcliffPole",
    540938627: "Predator",
    578575283: "CrescentPike",
    618786571: "Halberd",
    623534363: "FavoniusCodex",
    650049651: "WindblumeOde",
    656120259: "SharpshootersOath",
    680510411: "Whiteblind",
    688991243: "CalamityQueller",
    693354267: "MemoryOfDust",
    716252627: "LithicSpear",
    735056795: "FavoniusGreatsword",
    807607555: "SkywardAtlas",
    828711395: "AmosBow",
    850802171: "WhiteIronGreatsword",
    877751435: "RoyalGreatsword",
    902184579: "ForestRegalia",
    902264035: "AquilaFavonia",
    930640955: "TheBell",
    944332883: "SummitShaper",
    1012170803: "KagotsurubeIsshin",
    1021898539: "Slingshot",
    1072884907: "MappaMare",
    1075647299: "SongOfBrokenPines",
    1089950259: "SkywardPride",
    1154009435: "PrototypeStarglitter",
    1163263227: "TheWidsith",
    1240067179: "FavoniusWarbow",
    1321135667: "LionsRoar",
    1348687251: "HuntersPath",
    1388004931: "SkyriderSword",
    1390797107: "WhiteTassel",
    1406746947: "OtherworldlyStory",
    1437658243: "SerpentSpine",
    1455107995: "LostPrayer",
    1470442731: "MissiveWindspear",
    1479961579: "FerrousShadow",
    1600275315: "HaranGeppakuFutsu",
    1608953539: "HarbingerOfDawn",
    1675686363: "SacrificialGreatsword",
    1773425155: "SwordOfDescension",
    1860795787: "MouunsMoon",
    1890163363: "EverlastingMoonglow",
    1901973075: "PolarStar",
    1990641987: "SacrificialSword",
    1990820123: "AmenomaKageuchi",
    1991707099: "PrototypeRancour",
    1997709467: "JadeSpear",
    2006422931: "LithicBlade",
    2195665683: "SacrificialFragments",
    2267978875: "FruitofFulfillment",
    2279290283: "MagicGuide",
    2324146259: "HakushinRing",
    2359799475: "Akuoumaru",
    2375993851: "RoyalLongsword",
    2400012995: "SacrificalBow",
    2417717595: "AlleyHunter",
    2425414923: "FadingTwilight",
    2474354867: "FavoniusSword",
    2491797315: "KitainCrossSpear",
    2521338131: "PrototypeAmber",
    2539208459: "OathswornEye",
    2556914683: "TheStringless",
    2587614459: "Frostbearer",
    2614170427: "SkyriderGreatsword",
    2664629131: "DragonsBane",
    2749853923: "FesteringDesire",
    2753539619: "SnowTombedStarsilver",
    2792766467: "TheUnforged",
    2832648187: "RoyalBow",
    2918525947: "ThunderingPulse",
    2935286715: "RoyalSpear",
    2947140987: "TheAlleyFlash",
    2949448555: "FreedomSworn",
    2963220587: "EmeraldOrb",
    3063191787: "EndOfTheLine",
    3073454867: "MakhairaAquamarine",
    3090373787: "WineAndSong",
    3097441915: "DebateClub",
    3112679155: "ElegyForTheEnd",
    3156385731: "EyeOfPerception",
    3169209451: "Rust",
    3176599083: "KingsSquire",
    3235324891: "StaffOfHoma",
    3273999011: "BlackcliffAgate",
    3378007475: "BlackcliffLongsword",
    3421967235: "FilletBlade",
    3439749859: "TheViridescentHunt",
    3443142923: "DragonspineSpear",
    3447737235: "BlackcliffWarbow",
    3456986819: "DodocoTales",
    3500935003: "ThrillingTalesOfDragonSlayers",
    3587621259: "TheFlute",
    3625393819: "PrototypeCrescent",
    3673792067: "TravelersHandySword",
    3684723963: "Rainslasher",
    3717849275: "EngulfingLightning",
    3719372715: "TwinNephrite",
    3722933411: "PrototypeArchaic",
    3755004051: "FavoniusLance",
    3796905611: "TheBlackSword",
    3827789435: "RoyalGrimoire",
    3914951691: "RedhornStonethresher",
    3933622347: "SkywardHarp",
    3949653579: "MitternachtsWaltz",
    3975746731: "RavenBow",
    3995710363: "WolfsGravestone",
    4049410651: "Deathmatch",
    4055003299: "SkywardBlade",
    4090429643: "BloodtaintedGreatsword",
    4103022435: "IronSting",
    4103766499: "BlackTassel",
    4122509083: "WavebreakersFin",
    4124851547: "MistsplitterReforged",
    4158505619: "SkywardSpine",
    4186179883: "Hamayumi",
    4193089947: "KatsuragikiriNagamasa",
    4230231107: "AquaSimulacra",
    4238339131: "StaffOfTheScarletSands",
    4267718859: "RecurveBow"
}
export const Sets: { readonly [key: number | string]: string } = {
    83115355: "MaidenBeloved",
    147298547: "WanderersTroupe",
    156294403: "HeartOfDepth",
    855894507: "Berserker",
    862591315: "PaleFlame",
    933076627: "BlizzardStrayer",
    1186209435: "Gambler",
    1212345779: "GladiatorsFinale",
    1337666507: "TenacityOfTheMillelith",
    1438974835: "RetracingBolide",
    1524173875: "CrimsonWitchOfFlames",
    1541919827: "BloodstainedChivalry",
    1558036915: "VermillionHereafter",
    1562601179: "ViridescentVenerer",
    1632377563: "Lavawalker",
    1675079283: "DeepwoodMemories",
    1751039235: "NoblesseOblige",
    1756609915: "OceanHuedClam",
    1873342283: "Thundersoother",
    2040573235: "ArchaicPetra",
    2276480763: "EmblemOfSeveredFate",
    2364208851: "ResolutionOfSojourner",
    2512309395: "ThunderingFury",
    2546254811: "HuskOfOpulentDreams",
    2764598579: "TheExile",
    2890909531: "MartialArtist",
    3535784755: "BraveHeart",
    3618167299: "Scholar",
    3626268211: "EchoesOfAnOffering",
    3890292467: "Instructor",
    4082302819: "DefendersWill",
    4144069251: "ShimenawasReminiscence",
    4145306051: "GildedDreams"
}

export const Props: { readonly [key: string]: number } = {
    FIGHT_PROP_BASE_ATTACK: stats.stat.ATK_BASE,
    FIGHT_PROP_HP: stats.stat.HP_FLAT,
    FIGHT_PROP_ATTACK: stats.stat.ATK_FLAT,
    FIGHT_PROP_DEFENSE: stats.stat.DEF_FLAT,
    FIGHT_PROP_HP_PERCENT: stats.stat.HP_PERCENT,
    FIGHT_PROP_ATTACK_PERCENT: stats.stat.ATK_PERCENT,
    FIGHT_PROP_DEFENSE_PERCENT: stats.stat.DEF_PERCENT,
    FIGHT_PROP_CRITICAL: stats.stat.CRIT_RATE,
    FIGHT_PROP_CRITICAL_HURT: stats.stat.CRIT_DMG,
    FIGHT_PROP_CHARGE_EFFICIENCY: stats.stat.ENERGY_RECHARGE,
    FIGHT_PROP_HEAL_ADD: stats.stat.HEALING_BONUS,
    FIGHT_PROP_ELEMENT_MASTERY: stats.stat.ELEMENTAL_MASTERY,
    FIGHT_PROP_PHYSICAL_ADD_HURT: stats.stat.PHYSICAL_DMG,
    FIGHT_PROP_FIRE_ADD_HURT: stats.stat.PYRO_DMG,
    FIGHT_PROP_ELEC_ADD_HURT: stats.stat.ELECTRO_DMG,
    FIGHT_PROP_WATER_ADD_HURT: stats.stat.HYDRO_DMG,
    FIGHT_PROP_WIND_ADD_HURT: stats.stat.ANEMO_DMG,
    FIGHT_PROP_ICE_ADD_HURT: stats.stat.CRYO_DMG,
    FIGHT_PROP_ROCK_ADD_HURT: stats.stat.GEO_DMG,
    FIGHT_PROP_GRASS_ADD_HURT: stats.stat.DENDRO_DMG,
}

export const Characters: { readonly [key: number]: string } = {
    10000002: "Ayaka",
    10000003: "Jean",
    10000006: "Lisa",
    10000014: "Barbara",
    10000015: "Kaeya",
    10000016: "Diluc",
    10000020: "Razor",
    10000021: "Amber",
    10000022: "Venti",
    10000023: "Xiangling",
    10000024: "Beidou",
    10000025: "Xingqiu",
    10000026: "Xiao",
    10000027: "Ningguang",
    10000029: "Klee",
    10000030: "Zhongli",
    10000031: "Fischl",
    10000032: "Bennett",
    10000033: "Tartaglia",
    10000034: "Noelle",
    10000035: "Qiqi",
    10000036: "Chongyun",
    10000037: "Ganyu",
    10000038: "Albedo",
    10000039: "Diona",
    10000041: "Mona",
    10000042: "Keqing",
    10000043: "Sucrose",
    10000044: "Xinyan",
    10000045: "Rosaria",
    10000046: "HuTao",
    10000047: "Kazuha",
    10000048: "Yanfei",
    10000049: "Yoimiya",
    10000050: "Thoma",
    10000051: "Eula",
    10000052: "Raiden",
    10000053: "Sayu",
    10000054: "Kokomi",
    10000055: "Gorou",
    10000056: "Sara",
    10000057: "Itto",
    10000058: "Yae Miko",
    10000059: "Heizou",
    10000060: "Yelan",
    10000062: "Aloy",
    10000063: "Shenhe",
    10000064: "YunJin",
    10000065: "Kuki",
    10000066: "Ayato",
    10000067: "Collei",
    10000068: "Dori",
    10000069: "Tighnari",
    10000070: "Nilou",
    10000071: "Cyno",
    10000072: "Candace",
    10000073: "Nahida",
    10000074: "Layla",
    10000075: "Wanderer",
    10000076: "Faruzan",
}