import { Resonance } from "resonance";
import { EquipmentBasicValue } from "equipmentBasicValue";
import { DifferentAbilityShieldRuneCount, DifferentAbilityWeaponRuneCount, SpecialAbilityWeaponRuneCount } from "equipmentRune";

import {
    calculateEquipmentBasicValueByResonancesEffect,
    calculateSpecialAbilityWeaponRuneEffect,
    calculateDifferentAbilityWeaponRuneEffect,
    calculateSpecialAbilityShieldRuneEffect,
    calculateDifferentAbilityShieldRuneEffect,
    checkHalberdShield,
} from "../modules/equipmentBasicValue";

// 装備の基本値に影響する共鳴効果を計算する
// calculateEquipmentBasicValueByResonancesEffect = (equipmentBasicValue: EquipmentBasicValue, resonances: Resonance): EquipmentBasicValue
describe("calculateEquipmentBasicValueByResonancesEffectTest", () => {
    test("装備が共鳴していないとき、武器と盾の基本値が変わらないこと", () => {
        const equipmentBasicValue: EquipmentBasicValue = {
            weaponBasicValue: 0,
            shieldBasicValue: 0,
        }
        const resonaces: Resonance = {
            isForgedSetResonance: false,
            isFumaSetResonance: false,
            isDragonSetResonance: false,
            isBeastKingSetResonance: false,
        }
        const result = calculateEquipmentBasicValueByResonancesEffect(equipmentBasicValue, resonaces);
        expect(result.weaponBasicValue).toBe(0);
        expect(result.shieldBasicValue).toBe(0);
    });

    test("鍛えたセット共鳴のとき、武器と盾の基本値がそれぞれ+3されていること", () => {
        const equipmentBasicValue: EquipmentBasicValue = {
            weaponBasicValue: 0,
            shieldBasicValue: 0,
        }
        const resonaces: Resonance = {
            isForgedSetResonance: true,
            isFumaSetResonance: false,
            isDragonSetResonance: false,
            isBeastKingSetResonance: false,
        }
        const result = calculateEquipmentBasicValueByResonancesEffect(equipmentBasicValue, resonaces);
        expect(result.weaponBasicValue).toBe(3);
        expect(result.shieldBasicValue).toBe(3);
    });

    test("風魔セット共鳴のとき、武器と盾の基本値がそれぞれ+3されていること", () => {
        const equipmentBasicValue: EquipmentBasicValue = {
            weaponBasicValue: 0,
            shieldBasicValue: 0,
        }
        const resonaces: Resonance = {
            isForgedSetResonance: false,
            isFumaSetResonance: true,
            isDragonSetResonance: false,
            isBeastKingSetResonance: false,
        }
        const result = calculateEquipmentBasicValueByResonancesEffect(equipmentBasicValue, resonaces);
        expect(result.weaponBasicValue).toBe(5);
        expect(result.shieldBasicValue).toBe(5);
    });

    test("ドラゴンセット共鳴のとき、武器と盾の基本値がそれぞれ+5されていること", () => {
        const equipmentBasicValue: EquipmentBasicValue = {
            weaponBasicValue: 0,
            shieldBasicValue: 0,
        }
        const resonaces: Resonance = {
            isForgedSetResonance: false,
            isFumaSetResonance: false,
            isDragonSetResonance: true,
            isBeastKingSetResonance: false,
        }
        const result = calculateEquipmentBasicValueByResonancesEffect(equipmentBasicValue, resonaces);
        expect(result.weaponBasicValue).toBe(5);
        expect(result.shieldBasicValue).toBe(5);
    });
});

// 基本値に影響する武器の特殊能力印の計算
// calculateSpecialAbilityWeaponRuneEffect = (equipmentBasicValue: EquipmentBasicValue, specialAbilityWeaponRuneCount: SpecialAbilityWeaponRuneCount): EquipmentBasicValue
describe("calculateEquipmentBasicValueByResonancesEffectTest", () => {
    test("武器に扇印が入っていないとき、盾の基本値が+3されていないこと", () => {
        const equipmentBasicValue: EquipmentBasicValue = {
            weaponBasicValue: 0,
            shieldBasicValue: 0,
        }
        const specialAbilityWeaponRuneCount: SpecialAbilityWeaponRuneCount = {
            ironFanRuneCount: 0,
        }
        const result = calculateSpecialAbilityWeaponRuneEffect(equipmentBasicValue, specialAbilityWeaponRuneCount);
        expect(result.shieldBasicValue).toBe(0);
    });

    test("武器に扇印が1個入っているとき、盾の基本値が+3されていること", () => {
        const equipmentBasicValue: EquipmentBasicValue = {
            weaponBasicValue: 0,
            shieldBasicValue: 0,
        }
        const specialAbilityWeaponRuneCount: SpecialAbilityWeaponRuneCount = {
            ironFanRuneCount: 1,
        }
        const result = calculateSpecialAbilityWeaponRuneEffect(equipmentBasicValue, specialAbilityWeaponRuneCount);
        expect(result.shieldBasicValue).toBe(3);
    });

    test("武器に扇印が9個入っているとき、盾の基本値が+27されていること", () => {
        const equipmentBasicValue: EquipmentBasicValue = {
            weaponBasicValue: 0,
            shieldBasicValue: 0,
        }
        const specialAbilityWeaponRuneCount: SpecialAbilityWeaponRuneCount = {
            ironFanRuneCount: 9,
        }
        const result = calculateSpecialAbilityWeaponRuneEffect(equipmentBasicValue, specialAbilityWeaponRuneCount);
        expect(result.shieldBasicValue).toBe(27);
    });

    test("武器に扇印が17個入っているとき、盾の基本値が+51されていること", () => {
        const equipmentBasicValue: EquipmentBasicValue = {
            weaponBasicValue: 0,
            shieldBasicValue: 0,
        }
        const specialAbilityWeaponRuneCount: SpecialAbilityWeaponRuneCount = {
            ironFanRuneCount: 17,
        }
        const result = calculateSpecialAbilityWeaponRuneEffect(equipmentBasicValue, specialAbilityWeaponRuneCount);
        expect(result.shieldBasicValue).toBe(51);
    });
});

// 基本値に影響する武器の異種能力印の計算
// calculateDifferentAbilityWeaponRuneEffect = (equipmentBasicValue: EquipmentBasicValue, differentAbilityWeaponRuneCount: DifferentAbilityWeaponRuneCount): EquipmentBasicValue
describe("calculateEquipmentBasicValueByResonancesEffectTest", () => {
    test("武器にち印が入っていないとき、武器の基本値が+2されていないこと", () => {
        const equipmentBasicValue: EquipmentBasicValue = {
            weaponBasicValue: 0,
            shieldBasicValue: 0,
        }
        const differentAbilityWeaponRuneCount: DifferentAbilityWeaponRuneCount = {
            strengthGrassRuneCount: 0,
            unluckyGrassRuneCount: 0,
            herbRuneCount: 0,
            otogirisoRuneCount: 0,
        }
        const result = calculateDifferentAbilityWeaponRuneEffect(equipmentBasicValue, differentAbilityWeaponRuneCount);
        expect(result.weaponBasicValue).toBe(0);
    });

    test("武器にち印が1個入っているとき、武器の基本値が+2されていること", () => {
        const equipmentBasicValue: EquipmentBasicValue = {
            weaponBasicValue: 0,
            shieldBasicValue: 0,
        }
        const differentAbilityWeaponRuneCount: DifferentAbilityWeaponRuneCount = {
            strengthGrassRuneCount: 1,
            unluckyGrassRuneCount: 0,
            herbRuneCount: 0,
            otogirisoRuneCount: 0,
        }
        const result = calculateDifferentAbilityWeaponRuneEffect(equipmentBasicValue, differentAbilityWeaponRuneCount);
        expect(result.weaponBasicValue).toBe(2);
    });

    test("武器にち印が8個入っているとき、武器の基本値が+16されていること", () => {
        const equipmentBasicValue: EquipmentBasicValue = {
            weaponBasicValue: 0,
            shieldBasicValue: 0,
        }
        const differentAbilityWeaponRuneCount: DifferentAbilityWeaponRuneCount = {
            strengthGrassRuneCount: 8,
            unluckyGrassRuneCount: 0,
            herbRuneCount: 0,
            otogirisoRuneCount: 0,
        }
        const result = calculateDifferentAbilityWeaponRuneEffect(equipmentBasicValue, differentAbilityWeaponRuneCount);
        expect(result.weaponBasicValue).toBe(16);
    });

    test("武器にち印が16個入っているとき、武器の基本値が+32されていること", () => {
        const equipmentBasicValue: EquipmentBasicValue = {
            weaponBasicValue: 0,
            shieldBasicValue: 0,
        }
        const differentAbilityWeaponRuneCount: DifferentAbilityWeaponRuneCount = {
            strengthGrassRuneCount: 16,
            unluckyGrassRuneCount: 0,
            herbRuneCount: 0,
            otogirisoRuneCount: 0,
        }
        const result = calculateDifferentAbilityWeaponRuneEffect(equipmentBasicValue, differentAbilityWeaponRuneCount);
        expect(result.weaponBasicValue).toBe(32);
    });

    test("武器に不印が入っていないとき、武器の基本値が変わらないこと", () => {
        const equipmentBasicValue: EquipmentBasicValue = {
            weaponBasicValue: 0,
            shieldBasicValue: 0,
        }
        const differentAbilityWeaponRuneCount: DifferentAbilityWeaponRuneCount = {
            strengthGrassRuneCount: 0,
            unluckyGrassRuneCount: 0,
            herbRuneCount: 0,
            otogirisoRuneCount: 0,
        }
        const result = calculateDifferentAbilityWeaponRuneEffect(equipmentBasicValue, differentAbilityWeaponRuneCount);
        expect(result.weaponBasicValue).toBe(0);
    });

    test("武器に不印が1個入ってるとき、武器の基本値が-10されていること", () => {
        const equipmentBasicValue: EquipmentBasicValue = {
            weaponBasicValue: 20,
            shieldBasicValue: 0,
        }
        const differentAbilityWeaponRuneCount: DifferentAbilityWeaponRuneCount = {
            strengthGrassRuneCount: 0,
            unluckyGrassRuneCount: 1,
            herbRuneCount: 0,
            otogirisoRuneCount: 0,
        }
        const result = calculateDifferentAbilityWeaponRuneEffect(equipmentBasicValue, differentAbilityWeaponRuneCount);
        expect(result.weaponBasicValue).toBe(10);
    });

    test("武器に不印が2個入ってるとき、武器の基本値が-15されていること", () => {
        const equipmentBasicValue: EquipmentBasicValue = {
            weaponBasicValue: 20,
            shieldBasicValue: 0,
        }
        const differentAbilityWeaponRuneCount: DifferentAbilityWeaponRuneCount = {
            strengthGrassRuneCount: 0,
            unluckyGrassRuneCount: 2,
            herbRuneCount: 0,
            otogirisoRuneCount: 0,
        }
        const result = calculateDifferentAbilityWeaponRuneEffect(equipmentBasicValue, differentAbilityWeaponRuneCount);
        expect(result.weaponBasicValue).toBe(5);
    });

    test("武器に不印が16個入ってるとき、武器の基本値が-85されていること", () => {
        const equipmentBasicValue: EquipmentBasicValue = {
            weaponBasicValue: 99,
            shieldBasicValue: 0,
        }
        const differentAbilityWeaponRuneCount: DifferentAbilityWeaponRuneCount = {
            strengthGrassRuneCount: 0,
            unluckyGrassRuneCount: 16,
            herbRuneCount: 0,
            otogirisoRuneCount: 0,
        }
        const result = calculateDifferentAbilityWeaponRuneEffect(equipmentBasicValue, differentAbilityWeaponRuneCount);
        expect(result.weaponBasicValue).toBe(14);
    });

    test("不印による装備の基本値の減少によって、装備の基本値が0未満になるとき、武器の基本値が0になること", () => {
        const equipmentBasicValue: EquipmentBasicValue = {
            weaponBasicValue: 5,
            shieldBasicValue: 0,
        }
        const differentAbilityWeaponRuneCount: DifferentAbilityWeaponRuneCount = {
            strengthGrassRuneCount: 0,
            unluckyGrassRuneCount: 1,
            herbRuneCount: 0,
            otogirisoRuneCount: 0,
        }
        const result = calculateDifferentAbilityWeaponRuneEffect(equipmentBasicValue, differentAbilityWeaponRuneCount);
        expect(result.weaponBasicValue).toBe(0);
    });
});

// 基本値に影響する盾の特殊能力印の計算
// calculateSpecialAbilityShieldRuneEffect = (equipmentBasicValue: EquipmentBasicValue, hasFestivalRune: boolean, friends: number): EquipmentBasicValue
describe("calculateSpecialAbilityShieldRuneEffectTest", () => {
    test("盾に祭印が入っていないとき、盾の基本値が変わらないこと", () => {
        const equipmentBasicValue: EquipmentBasicValue = {
            weaponBasicValue: 0,
            shieldBasicValue: 0,
        }
        const hasFestivalRune = false;
        const friends = 0;
        const result = calculateSpecialAbilityShieldRuneEffect(equipmentBasicValue, hasFestivalRune, friends);
        expect(result.shieldBasicValue).toBe(0);
    });

    test("盾に祭印が入っていて、仲間の数が1人のとき、盾の基本値が+10されていること", () => {
        const equipmentBasicValue: EquipmentBasicValue = {
            weaponBasicValue: 0,
            shieldBasicValue: 0,
        }
        const hasFestivalRune = true;
        const friends = 1;
        const result = calculateSpecialAbilityShieldRuneEffect(equipmentBasicValue, hasFestivalRune, friends);
        expect(result.shieldBasicValue).toBe(10);
    });

    test("盾に祭印が入っていて、仲間の数が5人のとき、盾の基本値が+50されていること", () => {
        const equipmentBasicValue: EquipmentBasicValue = {
            weaponBasicValue: 0,
            shieldBasicValue: 0,
        }
        const hasFestivalRune = true;
        const friends = 5;
        const result = calculateSpecialAbilityShieldRuneEffect(equipmentBasicValue, hasFestivalRune, friends);
        expect(result.shieldBasicValue).toBe(50);
    });
});

// 基本値に影響する盾の異種能力印の計算 
// calculateDifferentAbilityShieldRuneEffect = (equipmentBasicValue: EquipmentBasicValue, differentAbilityShieldRuneCount: DifferentAbilityShieldRuneCount): EquipmentBasicValue
describe("calculateDifferentAbilityShieldRuneEffectTest", () => {
    test("盾に命印/不印が入っていないとき、盾の基本値が変わらないこと", () => {
        const equipmentBasicValue: EquipmentBasicValue = {
            weaponBasicValue: 0,
            shieldBasicValue: 0,
        }
        const differentAbilityShieldRuneCount: DifferentAbilityShieldRuneCount = {
            lifeGrassRuneCount: 0,
            unluckyGrassRuneCount: 0,
            herbRuneCount: 0,
            otogirisoRuneCount: 0,
        }
        const result = calculateDifferentAbilityShieldRuneEffect(equipmentBasicValue, differentAbilityShieldRuneCount);
        expect(result.shieldBasicValue).toBe(0);
    });

    test("盾に命印が1個入っているとき、盾の基本値が+3されていること", () => {
        const equipmentBasicValue: EquipmentBasicValue = {
            weaponBasicValue: 0,
            shieldBasicValue: 0,
        }
        const differentAbilityShieldRuneCount: DifferentAbilityShieldRuneCount = {
            lifeGrassRuneCount: 1,
            unluckyGrassRuneCount: 0,
            herbRuneCount: 0,
            otogirisoRuneCount: 0,
        }
        const result = calculateDifferentAbilityShieldRuneEffect(equipmentBasicValue, differentAbilityShieldRuneCount);
        expect(result.shieldBasicValue).toBe(3);
    });

    test("盾に命印が16個入っているとき、盾の基本値が+48されていること", () => {
        const equipmentBasicValue: EquipmentBasicValue = {
            weaponBasicValue: 0,
            shieldBasicValue: 0,
        }
        const differentAbilityShieldRuneCount: DifferentAbilityShieldRuneCount = {
            lifeGrassRuneCount: 16,
            unluckyGrassRuneCount: 0,
            herbRuneCount: 0,
            otogirisoRuneCount: 0,
        }
        const result = calculateDifferentAbilityShieldRuneEffect(equipmentBasicValue, differentAbilityShieldRuneCount);
        expect(result.shieldBasicValue).toBe(48);
    });

    test("盾に不印が1個入っているとき、盾の基本値が-3されていること", () => {
        const equipmentBasicValue: EquipmentBasicValue = {
            weaponBasicValue: 0,
            shieldBasicValue: 50,
        }
        const differentAbilityShieldRuneCount: DifferentAbilityShieldRuneCount = {
            lifeGrassRuneCount: 0,
            unluckyGrassRuneCount: 1,
            herbRuneCount: 0,
            otogirisoRuneCount: 0,
        }
        const result = calculateDifferentAbilityShieldRuneEffect(equipmentBasicValue, differentAbilityShieldRuneCount);
        expect(result.shieldBasicValue).toBe(47);
    });

    test("盾に不印が16個入っているとき、盾の基本値が-48されていること", () => {
        const equipmentBasicValue: EquipmentBasicValue = {
            weaponBasicValue: 0,
            shieldBasicValue: 50,
        }
        const differentAbilityShieldRuneCount: DifferentAbilityShieldRuneCount = {
            lifeGrassRuneCount: 0,
            unluckyGrassRuneCount: 16,
            herbRuneCount: 0,
            otogirisoRuneCount: 0,
        }
        const result = calculateDifferentAbilityShieldRuneEffect(equipmentBasicValue, differentAbilityShieldRuneCount);
        expect(result.shieldBasicValue).toBe(2);
    });

    test("不印による装備の基本値の減少によって、基本値が0未満になるとき、盾の基本値が0になること", () => {
        const equipmentBasicValue: EquipmentBasicValue = {
            weaponBasicValue: 0,
            shieldBasicValue: 30,
        }
        const differentAbilityShieldRuneCount: DifferentAbilityShieldRuneCount = {
            lifeGrassRuneCount: 0,
            unluckyGrassRuneCount: 11,
            herbRuneCount: 0,
            otogirisoRuneCount: 0,
        }
        const result = calculateDifferentAbilityShieldRuneEffect(equipmentBasicValue, differentAbilityShieldRuneCount);
        expect(result.shieldBasicValue).toBe(0);
    });
});

// 矛の盾の基本値計算
// checkHalberdShield = (equipmentBasicValue: EquipmentBasicValue, shieldName: string): EquipmentBasicValue
describe("checkHalberdShieldTest", () => {
    test("盾の名前が「矛の盾」でないとき、盾の基本値が武器の基本値に加算されていないこと", () => {
        const equipmentBasicValue: EquipmentBasicValue = {
            weaponBasicValue: 0,
            shieldBasicValue: 30,
        }
        const shieldName = "風魔の盾";
        const result = checkHalberdShield(equipmentBasicValue, shieldName);
        expect(result.weaponBasicValue).toBe(0);
    });

    test("盾の名前が「矛の盾」のとき、盾の基本値が武器の基本値に加算されていること", () => {
        const equipmentBasicValue: EquipmentBasicValue = {
            weaponBasicValue: 0,
            shieldBasicValue: 30,
        }
        const shieldName = "矛の盾";
        const result = checkHalberdShield(equipmentBasicValue, shieldName);
        expect(result.weaponBasicValue).toBe(30);
    });
});