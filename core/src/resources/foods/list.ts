import { food, stats } from "@src/core"
import { FoodType } from "@src/core/food"

export const foods: readonly food.Options[] = [
    {
        Name: "SakuraShrimpCrackers",
        Type: FoodType.DEFENSIVE,
        Effects: [
            [stats.stat.HP_PERCENT, 0.2, 0.25],
        ],
        Stars: 3
    },
    {
        Name: "PileEmUp",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.CRIT_RATE, 0.1, 0.2]
        ],
        Stars: 3
    },
    {
        Name: "AdeptusTemptation",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.ATK_FLAT, 260, 372],
            [stats.stat.CRIT_RATE, 0.08, 0.12]
        ],
        Stars: 5
    },
    {
        Name: "AdventurersBreakfastSandwich",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.ATK_FLAT, 160, 228]
        ],
        Stars: 3
    },
    {
        Name: "AlmondTofu",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.ATK_FLAT, 66, 95]
        ],
        Stars: 2
    },
    {
        Name: "Baklava",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.CRIT_RATE, 0.1, 0.2]
        ],
        Stars: 3
    },
    {
        Name: "BerryMintBurst",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.CRIT_RATE, 0.16, 0.16]
        ],
        Stars: 2
    },
    {
        Name: "Biryani",
        Type: FoodType.DEFENSIVE,
        Effects: [
            [stats.stat.DEF_FLAT, 215, 308],
            [stats.stat.HEALING_BONUS, 0.06, 0.1]
        ],
        Stars: 4
    },
    {
        Name: "BountifulYear",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.ATK_FLAT, 224, 320],
            [stats.stat.CRIT_RATE, 0.06, 0.1]
        ],
        Stars: 4
    },
    {
        Name: "BraisedMeat",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.PHYSICAL_DMG, 0.2, 0.4]
        ],
        Stars: 3
    },
    {
        Name: "ButterChicken",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.ATK_FLAT, 160, 228]
        ],
        Stars: 3
    },
    {
        Name: "ButterCrab",
        Type: FoodType.DEFENSIVE,
        Effects: [
            [stats.stat.DEF_FLAT, 215, 308],
            [stats.stat.HEALING_BONUS, 0.06, 0.1]
        ],
        Stars: 4
    },
    {
        Name: "CallaLilySeafoodSoup",
        Type: FoodType.DEFENSIVE,
        Effects: [
            [stats.stat.DEF_FLAT, 165, 235]
        ],
        Stars: 3
    },
    {
        Name: "CandiedAjilenakhNut",
        Type: FoodType.DEFENSIVE,
        Effects: [
            [stats.stat.DEF_FLAT, 165, 235]
        ],
        Stars: 3
    },
    {
        Name: "ChickenTofuPudding",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.ATK_FLAT, 224, 320],
            [stats.stat.CRIT_RATE, 0.06, 0.1]
        ],
        Stars: 4
    },
    {
        Name: "ColdCutPlatter",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.PHYSICAL_DMG, 0.2, 0.4],
        ],
        Stars: 3
    },
    {
        Name: "ComeandGetIt",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.CRIT_RATE, 0.1, 0.2]
        ],
        Stars: 3
    },
    {
        Name: "CrabRoeKourayaki",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.ATK_FLAT, 66, 95]
        ],
        Stars: 2
    },
    {
        Name: "CrocodileJerky",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.ATK_FLAT, 114, 114]
        ],
        Stars: 2
    },
    {
        Name: "CuredPorkDryHotpot",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.CRIT_RATE, 0.1, 0.2]
        ],
        Stars: 3
    },
    {
        Name: "DragonBeardNoodles",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.ATK_FLAT, 160, 228]
        ],
        Stars: 3
    },
    {
        Name: "FishermansToast",
        Type: FoodType.DEFENSIVE,
        Effects: [
            [stats.stat.DEF_FLAT, 88, 126]
        ],
        Stars: 2
    },
    {
        Name: "FlamingEssentialOil",
        Type: FoodType.ELEMENTAL,
        Effects: [
            [stats.stat.PYRO_DMG, 0.25, 0.25]
        ],
        Stars: 3
    },
    {
        Name: "ForestEssentialOil",
        Type: FoodType.ELEMENTAL,
        Effects: [
            [stats.stat.DENDRO_DMG, 0.25, 0.25]
        ],
        Stars: 3
    },
    {
        Name: "FragrantMashedPotatoes",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.ATK_FLAT, 160, 228]
        ],
        Stars: 3
    },
    {
        Name: "FriedRadishBalls",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.ATK_FLAT, 66, 95]
        ],
        Stars: 2
    },
    {
        Name: "FrostingEssentialOil",
        Type: FoodType.ELEMENTAL,
        Effects: [
            [stats.stat.CRYO_DMG, 0.25, 0.25]
        ],
        Stars: 3
    },
    {
        Name: "FruitsoftheFestival",
        Type: FoodType.DEFENSIVE,
        Effects: [
            [stats.stat.HEALING_BONUS, 0.15, 0.2]
        ],
        Stars: 3
    },
    {
        Name: "GoldenCrab",
        Type: FoodType.DEFENSIVE,
        Effects: [
            [stats.stat.DEF_FLAT, 215, 308],
            [stats.stat.HEALING_BONUS, 0.06, 0.1]
        ],
        Stars: 4
    },
    {
        Name: "GoldenFriedChicken",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.ATK_FLAT, 224, 320],
            [stats.stat.CRIT_RATE, 0.06, 0.1]
        ],
        Stars: 4
    },
    {
        Name: "GushingEssentialOil",
        Type: FoodType.ELEMENTAL,
        Effects: [
            [stats.stat.ANEMO_DMG, 0.25, 0.25]
        ],
        Stars: 3
    },
    {
        Name: "ImportedPoultry",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.CRIT_RATE, 0.1, 0.2]
        ],
        Stars: 3
    },
    {
        Name: "JadeParcels",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.ATK_FLAT, 224, 320],
            [stats.stat.CRIT_RATE, 0.06, 0.1]
        ],
        Stars: 4
    },
    {
        Name: "JewelrySoup",
        Type: FoodType.DEFENSIVE,
        Effects: [
            [stats.stat.DEF_FLAT, 88, 126]
        ],
        Stars: 2
    },
    {
        Name: "JueyunChiliChicken",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.CRIT_RATE, 0.06, 0.12]
        ],
        Stars: 2
    },
    {
        Name: "JueyunGuoba",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.PHYSICAL_DMG, 0.2, 0.4]
        ],
        Stars: 3
    },
    {
        Name: "KatsuSandwich",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.ATK_FLAT, 66, 95]
        ],
        Stars: 2
    },
    {
        Name: "LanternRiteSpecialComeandGetIt",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.CRIT_RATE, 0.2, 0.2]
        ],
        Stars: 3
    },
    {
        Name: "LanternRiteSpecialFriedRadishBalls",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.ATK_FLAT, 95, 95]
        ],
        Stars: 2
    },
    {
        Name: "LanternRiteSpecialJewelrySoup",
        Type: FoodType.DEFENSIVE,
        Effects: [
            [stats.stat.DEF_FLAT, 126, 126]
        ],
        Stars: 2
    },
    {
        Name: "LotusFlowerCrisp",
        Type: FoodType.DEFENSIVE,
        Effects: [
            [stats.stat.DEF_FLAT, 165, 235]
        ],
        Stars: 3
    },
    {
        Name: "MasalaCheeseBalls",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.CRIT_RATE, 0.06, 0.12]
        ],
        Stars: 2
    },
    {
        Name: "MeatLoversMushroomPizza",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.ATK_FLAT, 224, 320],
            [stats.stat.CRIT_RATE, 0.06, 0.1]
        ],
        Stars: 4
    },
    {
        Name: "MintSalad",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.ATK_FLAT, 66, 95]
        ],
        Stars: 2
    },
    {
        Name: "MoonPie",
        Type: FoodType.DEFENSIVE,
        Effects: [
            [stats.stat.DEF_FLAT, 165, 235]
        ],
        Stars: 4
    },
    {
        Name: "MoreandMore",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.PHYSICAL_DMG, 0.2, 0.4]
        ],
        Stars: 3
    },
    {
        Name: "MushroomHodgepodge",
        Type: FoodType.DEFENSIVE,
        Effects: [
            [stats.stat.DEF_FLAT, 88, 126]
        ],
        Stars: 2
    },
    {
        Name: "QingceStirFry",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.ATK_FLAT, 160, 228]
        ],
        Stars: 3
    },
    {
        Name: "RadishandFishStew",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.CRIT_RATE, 0.06, 0.12]
        ],
        Stars: 2
    },
    {
        Name: "RiceCakeSoup",
        Type: FoodType.DEFENSIVE,
        Effects: [
            [stats.stat.DEF_FLAT, 165, 235]
        ],
        Stars: 3
    },
    {
        Name: "SashimiPlatter",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.ATK_FLAT, 224, 320],
            [stats.stat.CRIT_RATE, 0.06, 0.1]
        ],
        Stars: 4
    },
    {
        Name: "SatisfyingSalad",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.CRIT_RATE, 0.06, 0.12]
        ],
        Stars: 2
    },
    {
        Name: "SautedMatsutake",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.ATK_FLAT, 160, 228]
        ],
        Stars: 3
    },
    {
        Name: "ShawarmaWrap",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.ATK_FLAT, 66, 95]
        ],
        Stars: 2
    },
    {
        Name: "ShockingEssentialOil",
        Type: FoodType.ELEMENTAL,
        Effects: [
            [stats.stat.ELECTRO_DMG, 0.25, 0.25]
        ],
        Stars: 3
    },
    {
        Name: "StoneHarborDelicacies",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.CRIT_RATE, 0.06, 0.12]
        ],
        Stars: 2
    },
    {
        Name: "StreamingEssentialOil",
        Type: FoodType.ELEMENTAL,
        Effects: [
            [stats.stat.HYDRO_DMG, 0.25, 0.25]
        ],
        Stars: 3
    },
    {
        Name: "SunsetBerryTea",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.ATK_FLAT, 160, 228]
        ],
        Stars: 3
    },
    {
        Name: "TandooriRoastChicken",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.ATK_FLAT, 224, 320],
            [stats.stat.CRIT_RATE, 0.06, 0.1]
        ],
        Stars: 4
    },
    {
        Name: "TianshuMeat",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.PHYSICAL_DMG, 0.25, 0.45],
            [stats.stat.CRIT_RATE, 0.06, 0.1]
        ],
        Stars: 4
    },
    {
        Name: "TriFlavoredSkewer",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.ATK_FLAT, 160, 228]
        ],
        Stars: 3
    },
    {
        Name: "UnagiChazuke",
        Type: FoodType.DEFENSIVE,
        Effects: [
            [stats.stat.HEALING_BONUS, 0.15, 0.2]
        ],
        Stars: 3
    },
    {
        Name: "UnmovingEssentialOil",
        Type: FoodType.ELEMENTAL,
        Effects: [
            [stats.stat.GEO_DMG, 0.25, 0.25]
        ],
        Stars: 3
    },
    {
        Name: "Wakatakeni",
        Type: FoodType.DEFENSIVE,
        Effects: [
            [stats.stat.DEF_FLAT, 88, 126]
        ],
        Stars: 2
    },
    {
        Name: "WolfhookJuice",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.ATK_FLAT, 114, 114]
        ],
        Stars: 2
    },
    {
        Name: "OnceUponaTimeinMondstadt",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.CRIT_RATE, 0.2, 0.2],
            [stats.stat.CRIT_DMG, 0.2, 0.2]
        ],
        Stars: 3
    },
    {
        Name: "SweetDream",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.ATK_FLAT, 114, 114]
        ],
        Stars: 2
    },
    {
        Name: "APrizeCatch",
        Type: FoodType.DEFENSIVE,
        Effects: [
            [stats.stat.DEF_FLAT, 282, 282]
        ],
        Stars: 3
    },
    {
        Name: "DerWeisheitLetzterSchlussLife",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.CRIT_RATE, 0.16, 0.16]
        ],
        Stars: 2
    },
    {
        Name: "DieHeiligeSinfonie",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.PHYSICAL_DMG, 0.55, 0.55]
        ],
        Stars: 3
    },
    {
        Name: "FishFlavoredToast",
        Type: FoodType.DEFENSIVE,
        Effects: [
            [stats.stat.DEF_FLAT, 151, 151]
        ],
        Stars: 2
    },
    {
        Name: "ForestWatchersChoice",
        Type: FoodType.DEFENSIVE,
        Effects: [
            [stats.stat.DEF_FLAT, 151, 151]
        ],
        Stars: 2
    },
    {
        Name: "Halvamazd",
        Type: FoodType.DEFENSIVE,
        Effects: [
            [stats.stat.DEF_FLAT, 282, 282]
        ],
        Stars: 3
    },
    {
        Name: "HeartstringNoodles",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.ATK_FLAT, 274, 274]
        ],
        Stars: 3
    },
    {
        Name: "NoTomorrow",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.CRIT_RATE, 0.2, 0.2],
            [stats.stat.CRIT_DMG, 0.2, 0.2]
        ],
        Stars: 3
    },
    {
        Name: "QingceHouseholdDish",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.ATK_FLAT, 274, 274]
        ],
        Stars: 3
    },
    {
        Name: "RockinRiffinChicken",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.CRIT_RATE, 0.16, 0.16]
        ],
        Stars: 2
    },
    {
        Name: "ShimiChazuke",
        Type: FoodType.DEFENSIVE,
        Effects: [
            [stats.stat.HEALING_BONUS, 0.25, 0.25]
        ],
        Stars: 3
    },
    {
        Name: "ShowMetheMora",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.ATK_FLAT, 274, 274]
        ],
        Stars: 3
    },
    {
        Name: "TheOnlyTruth",
        Type: FoodType.OFFENSIVE,
        Effects: [
            [stats.stat.ATK_FLAT, 114, 114]
        ],
        Stars: 2
    },
]