import { EquipUpgrade } from "./equip"
import { Upgrade } from "./upgrades"

test("Equip command for talent levels with constellation", () => {
    const cmd = EquipUpgrade({
        target: "Amber",
        type: Upgrade.NORMAL_ATTACK_LEVEL,
        stars: 4,
        value: 2,
        visible: 5
    })
    expect(cmd).toBe("character set Amber\ncharacter stat set NORMAL_ATTACK_LEVEL 5\n")
})