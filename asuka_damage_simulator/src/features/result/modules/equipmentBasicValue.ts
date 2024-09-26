import {
    EquipmentBasicValue,
} from "equipmentBasicValue";
import { 
    DifferentAbilityShieldRuneCount,
    DifferentAbilityWeaponRuneCount,
    SpecialAbilityWeaponRuneCount
} from "equipmentRune";
import { Resonance } from "resonance";

// 装備の基本値に影響する共鳴効果を計算する
export const calculateEquipmentBasicValueByResonancesEffect = (equipmentBasicValue: EquipmentBasicValue, resonances: Resonance): EquipmentBasicValue => {
    if (resonances.isForgedSetResonance) {
        equipmentBasicValue.weaponBasicValue += 3;
        equipmentBasicValue.shieldBasicValue += 3;
    }

    if (resonances.isFumaSetResonance) {
        equipmentBasicValue.weaponBasicValue += 5;
        equipmentBasicValue.shieldBasicValue += 5;
    }

    if (resonances.isDragonSetResonance) {
        equipmentBasicValue.weaponBasicValue += 5;
        equipmentBasicValue.shieldBasicValue += 5;
    }

    return equipmentBasicValue;
}

// 基本値に影響する武器の特殊能力印の計算
export const calculateSpecialAbilityWeaponRuneEffect = (equipmentBasicValue: EquipmentBasicValue, specialAbilityWeaponRuneCount: SpecialAbilityWeaponRuneCount): EquipmentBasicValue => {
    equipmentBasicValue.shieldBasicValue += specialAbilityWeaponRuneCount.ironFanRuneCount * 3;

    return equipmentBasicValue;
}

// 基本値に影響する武器の異種能力印の計算
export const calculateDifferentAbilityWeaponRuneEffect = (equipmentBasicValue: EquipmentBasicValue, differentAbilityWeaponRuneCount: DifferentAbilityWeaponRuneCount): EquipmentBasicValue => {
    // ち印の武器攻撃力増加
    equipmentBasicValue.weaponBasicValue += (differentAbilityWeaponRuneCount.strengthGrassRuneCount * 2);

    // 不印の武器攻撃力低下
    if (differentAbilityWeaponRuneCount.unluckyGrassRuneCount !== 0) {
        let tmpWeaponBasicValue = 0;

        if (differentAbilityWeaponRuneCount.unluckyGrassRuneCount > 1) {
            tmpWeaponBasicValue = equipmentBasicValue.weaponBasicValue - (10 + ((differentAbilityWeaponRuneCount.unluckyGrassRuneCount - 1) * 5));
        } else {
            tmpWeaponBasicValue = equipmentBasicValue.weaponBasicValue - 10;
        }

        if (tmpWeaponBasicValue < 0) {
            equipmentBasicValue.weaponBasicValue = 0;
        } else {
            equipmentBasicValue.weaponBasicValue = tmpWeaponBasicValue;
        }
    }

    return equipmentBasicValue;
}

// 基本値に影響する盾の特殊能力印の計算
export const calculateSpecialAbilityShieldRuneEffect = (equipmentBasicValue: EquipmentBasicValue, hasFestivalRune: boolean, friends: number): EquipmentBasicValue => {
    // 祭印の計算
    if (hasFestivalRune) {
        equipmentBasicValue.shieldBasicValue += (friends * 10);
    }

    return equipmentBasicValue;
}

// 基本値に影響する盾の異種能力印の計算 
export const calculateDifferentAbilityShieldRuneEffect = (equipmentBasicValue: EquipmentBasicValue, differentAbilityShieldRuneCount: DifferentAbilityShieldRuneCount): EquipmentBasicValue => {
    // 命印の計算
    equipmentBasicValue.shieldBasicValue += differentAbilityShieldRuneCount.lifeGrassRuneCount * 3;

    // 不印の計算
    if (differentAbilityShieldRuneCount.unluckyGrassRuneCount > 0) {
        let tmpShieldBasicValue = equipmentBasicValue.shieldBasicValue - (differentAbilityShieldRuneCount.unluckyGrassRuneCount * 3);
        if (tmpShieldBasicValue < 0) {
            equipmentBasicValue.shieldBasicValue = 0;
        } else {
            equipmentBasicValue.shieldBasicValue = tmpShieldBasicValue;
        }
    }

    return equipmentBasicValue;
}

// 盾が矛の盾の場合には武器の基本値も増加する
export const checkHalberdShield = (equipmentBasicValue: EquipmentBasicValue, shieldName: string): EquipmentBasicValue => {
    if (shieldName === "矛の盾") {
        equipmentBasicValue.weaponBasicValue += equipmentBasicValue.shieldBasicValue;
    }

    return equipmentBasicValue;
}