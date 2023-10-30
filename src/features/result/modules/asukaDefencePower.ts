import { AsukaCondition } from "useCharacter";

// 防具傾きの計算
export const calculateShieldTilt = (shieldBasicValue: number): number => {
    return Math.pow(Math.log(shieldBasicValue + 1) / Math.log(1.6), 2) / 50 + 0.5;
}

// 防具切片の計算
export const calculateShieldSection = (shieldBasicValue: number): number => {
    return Math.pow(Math.log(shieldBasicValue / 3 + 1) / Math.log(1.6), 2);
}

// 端数防御力の計算
export const calculateFractionalDefencePower = (shieldBasicValue: number, shieldModifierValue: number, shieldTilt: number, shieldSection: number): number => {
    let fractionalDefencePower = 0.0;

    if (shieldModifierValue >= 0) {
        fractionalDefencePower = shieldModifierValue * shieldTilt + shieldSection;
    } else {
        fractionalDefencePower = shieldSection * (shieldBasicValue + shieldModifierValue) / shieldBasicValue;
        if (isNaN(fractionalDefencePower)) {
            fractionalDefencePower = 0;
        }
    }

    return fractionalDefencePower;
}

// 防御力の計算
export const calculateDefencePower = (shieldBasicValue: number, shieldModifierValue: number, shieldSection: number, fractionalDefencePower: number): number => {
    let defencePower = 0;

    if (shieldModifierValue >= 0) {
        if ((shieldModifierValue % 2) === 0) {
            defencePower = Math.round(fractionalDefencePower);
        } else {
            defencePower = Math.floor(fractionalDefencePower);
        }
    } else {
        defencePower = Math.round(shieldSection * (shieldBasicValue + shieldModifierValue) / shieldBasicValue);
        if (isNaN(defencePower)) {
            defencePower = 0;
        }
    }

    return defencePower;
}

// プレイヤーの防御力に影響を与える印効果の計算
export const calculateDefencePowerAffectsByRuneEffects = (defencePower: number, hasFrontWarriorRune: boolean): number => {
    if (hasFrontWarriorRune) {
        defencePower *= 2;
    }

    return defencePower;
}

// プレイヤーの防御力に影響を与えるステータス効果の計算
export const calculateDefencePowerAffectsByStatusEffects = (defencePower: number, asukaCondition: AsukaCondition): number => {
    if (asukaCondition.isConfusionState) {
        defencePower = 0;
    }

    return defencePower;
}