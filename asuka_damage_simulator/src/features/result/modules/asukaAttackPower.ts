import { AsukaCondition } from "useCharacter";

// レベル補正を計算
export const calculateLevelCorrection = (asukaLevel: number): number => {
    return Math.pow(Math.log(asukaLevel / 2 + 1) / Math.log(1.6), 2);
}

// ちから補正の計算
export const calculatePowerCorrection = (asukaPower: number): number => {
    if (asukaPower < 8) {
        return Math.pow(Math.log(3) / Math.log(1.6), 2) * asukaPower / 8;
    } else {
        return Math.pow(Math.log(asukaPower / 2 - 1) / Math.log(1.6), 2);
    }
}

// 武器傾きの計算
export const calculateWeaponTilt = (weaponBasicValue: number): number => {
    return Math.pow(Math.log(weaponBasicValue + 1) / Math.log(1.6), 2) / 50;
}

// 武器切片の計算
export const calculateWeaponSection = (weaponBasicValue: number): number => {
    return Math.pow(Math.log(weaponBasicValue / 5 + 1) / Math.log(1.6), 2);
}

// 武器補正の計算
export const calculateWeaponCorrection = (weaponBasicValue: number, weaponModifierValue: number, weaponTilt: number, weaponSection: number): number => {
    let weaponCorrection = 0;

    if (weaponModifierValue >= 0) {
        weaponCorrection = weaponModifierValue * weaponTilt + weaponSection;
    } else {
        weaponCorrection = weaponSection * (weaponBasicValue + weaponModifierValue) / weaponBasicValue;
        if (isNaN(weaponCorrection)) {
            weaponCorrection = 0;
        }
    }

    return weaponCorrection;
}

// 端数攻撃力の計算
export const calculateFractionalAttackPower = (levelCorrection: number, powerCorrection: number, weaponCorrection: number): number => {
    return levelCorrection + powerCorrection + weaponCorrection;
}

// 攻撃力の計算
export const calculateAttackPower = (fractionalAttackPower: number): number => {
    return Math.round(fractionalAttackPower);
}

// プレイヤーの攻撃力に影響を与えるステータス効果の計算
export const calculateAttackPowerAffectsByStatusEffects = (attackPower: number, asukaCondition: AsukaCondition): number => {
    if (asukaCondition.isFightState) {
        attackPower = Math.floor(attackPower * 1.5);
    }

    if (asukaCondition.isConfusionState) {
        attackPower = Math.floor(attackPower * 1.5);
    }

    return attackPower;
}