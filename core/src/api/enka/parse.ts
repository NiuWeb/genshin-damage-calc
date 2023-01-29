import { artbox, charbox, stats } from "@src/core"
import { characters, weapons } from "@src/resources"
import { Characters, Pieces, PropMapStat, Props, Sets, Weapons } from "./data"
import { Enka } from "./type"

/**
 * Loads characters from Enka.Network service format
 * @param enka data to load in Enka.Network format
 * @returns A list of generated character boxes.
 */
export function ParseEnka(enka: Enka): charbox.Charbox[] {
    const result: charbox.Charbox[] = []
    for (const avatarInfo of enka.avatarInfoList) {
        const charName = Characters[avatarInfo.avatarId]
        if (!charName) {
            console.error(`[ENKA ERROR] Cannot find character by avatarId ${avatarInfo.avatarId}`)
            continue
        }
        const charGen = characters.FindByName(charName)
        if (!charGen) {
            console.error(`[ENKA ERROR] Cannot find character by name ${charName}`)
            continue
        }

        const level = parseInt(avatarInfo.propMap[PropMapStat.Level].val) || 1
        const ascension = parseInt(avatarInfo.propMap[PropMapStat.Ascension].val) || 1

        const talents = Object.values(avatarInfo.skillLevelMap)

        const charbox = charGen()
        const artifacts = new artbox.Artbox(charbox)
        charbox.SetArtifacts(artifacts)
        const character = charbox.GetCharacter()

        character.SetLevel(level)
        character.SetAscension(ascension)
        character.Set(stats.stat.NORMAL_ATTACK_LEVEL, talents[0])
        character.Set(stats.stat.ELEMENTAL_SKILL_LEVEL, talents[1])
        character.Set(stats.stat.ELEMENTAL_BURST_LEVEL, talents[2])

        const artifactsInfo = avatarInfo.equipList.filter(equip => equip.flat.itemType === "ITEM_RELIQUARY")
        const weaponInfo = avatarInfo.equipList.filter(equip => equip.flat.itemType === "ITEM_WEAPON")

        for (const artifactInfo of artifactsInfo) {
            const { reliquary, flat } = artifactInfo
            if (!reliquary) { continue }
            const { level } = reliquary
            if (!flat.equipType) {
                console.error("Cannot get artifact piece")
                continue
            }
            const piece = Pieces[flat.equipType]

            if (flat.rankLevel < 4) {
                console.error("[ENKA ERROR] Cannot set 3-star artifacts")
                continue
            }

            const artifact = artifacts.Get(piece)
            artifact.SetStars(flat.rankLevel)
            artifact.SetLevel(level - 1)

            if (!flat.reliquaryMainstat) {
                console.error("[ENKA ERROR] Cannot get artifact mainstat")
                continue
            }

            artifact.SetMainstat(Props[flat.reliquaryMainstat.mainPropId])

            const subs = flat.reliquarySubstats
            if (!subs) {
                console.error("[ENKA ERROR] Cannot get artifact substats")
                continue
            }

            for (const subInfo of subs) {
                const prop = Props[subInfo.appendPropId]
                let value = subInfo.statValue

                if (!stats.FlatStats.includes(prop)) {
                    value /= 100
                }
                artifact.AddSubstat(prop, value)
            }

            const setKey = artifactInfo.flat.setNameTextMapHash
            if (setKey) {
                const set = Sets[setKey]
                artifact.SetSet(set)
            }
        }
        artifacts.GetArtifacts().forEach(art => art.FillSubstats())

        for (const info of weaponInfo) {
            const wpName = Weapons[info.flat.nameTextMapHash]
            if (!wpName) {
                console.error("[ENKA ERROR] Cannot find weapon by key " + info.flat.nameTextMapHash)
                continue
            }
            const wpGen = weapons.FindByName(wpName)
            if (!wpGen) {
                console.error("[ENKA ERROR] Cannot find weapon by name " + wpName)
                continue
            }

            charbox.SetWeapon(wpGen)
            const weapon = charbox.GetWeapon()
            if (!weapon) {
                console.error("[ENKA ERROR] Cannot equip weapon by name " + wpGen.Name)
                continue
            }

            if (!info.weapon) {
                continue
            }
            const { level, promoteLevel, affixMap } = info.weapon

            weapon.SetLevel(level)
            weapon.SetAscension(promoteLevel)

            const rank = Object
                .values(affixMap)
                .reduce((a, b) => Math.max(a, b), 0) + 1
            weapon.SetRank(rank)
        }

        result.push(charbox)
    }
    return result
}