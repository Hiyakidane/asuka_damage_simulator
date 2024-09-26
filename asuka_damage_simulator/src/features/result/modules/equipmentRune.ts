import {
    SpecialAttackWeaponRuneCount,
    SpecialAbilityWeaponRuneCount,
    DifferentAbilityWeaponRuneCount,
    DifferentAbilityShieldRuneCount,
} from "equipmentRune";

// 武器に回印があるかチェック
export const checkHealingSwordRune = (weaponRune: string[]): boolean => {
    return weaponRune.includes("回");
}

// 武器の特攻能力印の数をチェック
export const checkSpecialAttackWeaponRuneCount = (weaponRune: string[]): SpecialAttackWeaponRuneCount => {
    let specialAttackWeaponRuneCount = {
        ghostSickleRuneCount: 0,
        marineSlasherRuneCount: 0,
        cyclopsKillerRuneCount: 0,
        drainBusterRuneCount: 0,
        crescentArmRuneCount: 0,
        dragonKillerRuneCount: 0,
        dragonGodSwordRuneCount: 0,
    }

    // 特攻武器印
    specialAttackWeaponRuneCount.ghostSickleRuneCount = weaponRune.filter((rune) => rune === "仏").length;
    specialAttackWeaponRuneCount.marineSlasherRuneCount = weaponRune.filter((rune) => rune === "水").length;
    specialAttackWeaponRuneCount.cyclopsKillerRuneCount = weaponRune.filter((rune) => rune === "目").length;
    specialAttackWeaponRuneCount.drainBusterRuneCount = weaponRune.filter((rune) => rune === "ド").length;
    specialAttackWeaponRuneCount.crescentArmRuneCount = weaponRune.filter((rune) => rune === "月").length;
    specialAttackWeaponRuneCount.dragonKillerRuneCount = weaponRune.filter((rune) => rune === "竜").length;
    specialAttackWeaponRuneCount.dragonGodSwordRuneCount = weaponRune.filter((rune) => rune === "龍").length;

    return specialAttackWeaponRuneCount;
}

// 武器の特殊能力印の数をチェック
export const checkSpecialAbilityWeaponRuneCount = (weaponRune: string[]): SpecialAbilityWeaponRuneCount => {
    let specialAbilityWeaponRuneCount = {
        ironFanRuneCount: 0,
    }

    specialAbilityWeaponRuneCount.ironFanRuneCount = weaponRune.filter((rune) => rune === "扇").length;

    return specialAbilityWeaponRuneCount;
}

// 武器の異種能力印の数をチェック
export const checkDifferentAbilityWeaponRuneCount = (weaponRune: string[]): DifferentAbilityWeaponRuneCount => {
    let differentAbilityWeaponRuneCount = {
        strengthGrassRuneCount: 0,
        unluckyGrassRuneCount: 0,
        herbRuneCount: 0,
        otogirisoRuneCount: 0,
    }

    differentAbilityWeaponRuneCount.strengthGrassRuneCount = weaponRune.filter((rune) => rune === "ち").length;
    differentAbilityWeaponRuneCount.unluckyGrassRuneCount = weaponRune.filter((rune) => rune === "不").length;
    differentAbilityWeaponRuneCount.herbRuneCount = weaponRune.filter((rune) => rune === "薬").length;
    differentAbilityWeaponRuneCount.otogirisoRuneCount = weaponRune.filter((rune) => rune === "弟").length;

    return differentAbilityWeaponRuneCount;
}

// 盾に祭印が入っているかチェック
export const checkFestivalRune = (shieldRune: string[]): boolean => {
    return shieldRune.includes("祭");
}

// 盾に正印が入っているかチェック
export const checkFrontWarriorRune = (shieldRune: string[]): boolean => {
    return shieldRune.includes("正");
}

// 盾の異種能力印の数をチェック
export const checkDifferentAbilityShieldRuneCount = (shieldRune: string[]): DifferentAbilityShieldRuneCount => {
    let differentAbilityRune = {
        lifeGrassRuneCount: 0,
        unluckyGrassRuneCount: 0,
        herbRuneCount: 0,
        otogirisoRuneCount: 0,
    }

    // 異種能力印
    differentAbilityRune.lifeGrassRuneCount = shieldRune.filter((rune) => rune === "命").length;
    differentAbilityRune.unluckyGrassRuneCount = shieldRune.filter((rune) => rune === "不").length;
    differentAbilityRune.herbRuneCount = shieldRune.filter((rune) => rune === "薬").length;
    differentAbilityRune.otogirisoRuneCount = shieldRune.filter((rune) => rune === "弟").length;

    return differentAbilityRune;
}

