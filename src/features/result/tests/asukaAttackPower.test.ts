import { AsukaCondition } from "useCharacter";
import {
    calculateLevelCorrection,
    calculatePowerCorrection,
    calculateWeaponTilt,
    calculateWeaponSection,
    calculateWeaponCorrection,
    calculateFractionalAttackPower,
    calculateAttackPower,
    calculateAttackPowerAffectsByStatusEffects,
} from "../modules/asukaAttackPower";

// レベル補正のテスト
// calculateLevelCorrection = (asukaLevel: number): number
describe("calculateLevelCorrectionTest", () => {
    // 正常系
    test("アスカのレベルが1のとき、レベル補正が0.744225509120611であること", () => {
        const asukaLevel = 1;
        const result = calculateLevelCorrection(asukaLevel);
        expect(result).toBeCloseTo(0.744225509120611);
    });

    test("アスカのレベルが99のとき、レベル補正が69.63167633204124であること", () => {
        const asukaLevel = 99;
        const result = calculateLevelCorrection(asukaLevel);
        expect(result).toBeCloseTo(69.63167633204124);
    });

    // 異常系
    test("アスカのレベルが0のとき、レベル補正が0であること", () => {
        const asukaLevel = 0;
        const result = calculateLevelCorrection(asukaLevel);
        expect(result).toBe(0);
    });
});

// ちから補正のテスト
// calculatePowerCorrection = (asukaPower: number): number
describe("calculatePowerCorrectionTest", () => {
    // 正常系
    // 境界値
    test("アスカのちからが1のとき、ちから補正が5.463695434100786であること", () => {
        const asukaPower = 1;
        const result = calculatePowerCorrection(asukaPower);
        expect(result).toBeCloseTo(0.6829619292625982);
    });

    test("アスカのちからが99のとき、ちから補正が68.2041866846459であること", () => {
        const asukaPower = 99;
        const result = calculatePowerCorrection(asukaPower);
        expect(result).toBeCloseTo(68.2041866846459);
    });

    test("アスカのちからが7のとき、ちから補正が4.780733504838188であること", () => {
        const asukaPower = 7;
        const result = calculatePowerCorrection(asukaPower);
        expect(result).toBeCloseTo(4.780733504838188);
    });

    test("アスカのちからが8のとき、ちから補正が5.463695434100786であること", () => {
        const asukaPower = 8;
        const result = calculatePowerCorrection(asukaPower);
        expect(result).toBeCloseTo(5.463695434100786);
    });

    test("アスカのちからが9のとき、ちから補正が7.1045306387391465であること", () => {
        const asukaPower = 9;
        const result = calculatePowerCorrection(asukaPower);
        expect(result).toBeCloseTo(7.1045306387391465);
    });

    // 異常系
    test("アスカのちからが0のとき、ちから補正が0であること", () => {
        const asukaPower = 0;
        const result = calculatePowerCorrection(asukaPower);
        expect(result).toBe(0);
    });
});

// 武器傾きのテスト
// calculateWeaponTilt = (weaponBasicValue: number): number
describe("calculateWeaponTiltTest", () => {
    // 正常系
    test("武器の基本値が1のとき、武器傾きが0.04349892205346475であること", () => {
        const weaponBasicValue = 1;
        const result = calculateWeaponTilt(weaponBasicValue);
        expect(result).toBeCloseTo(0.04349892205346475);
    });

    test("武器の基本値が50のとき、武器傾きが1.3996391183715797であること", () => {
        const weaponBasicValue = 50;
        const result = calculateWeaponTilt(weaponBasicValue);
        expect(result).toBeCloseTo(1.3996391183715797);
    });

    test("武器の基本値が99のとき、武器傾きが1.9200783091132967であること", () => {
        const weaponBasicValue = 99;
        const result = calculateWeaponTilt(weaponBasicValue);
        expect(result).toBeCloseTo(1.9200783091132967);
    });

    test("武器の基本値が0のとき、武器傾きが0であること", () => {
        const weaponBasicValue = 0;
        const result = calculateWeaponTilt(weaponBasicValue);
        expect(result).toBe(0);
    });
});

// 武器切片のテスト
// calculateWeaponSection = (weaponBasicValue: number): number
describe("calculateWeaponSectionTest", () => {
    test("武器の基本値が1のとき、武器切片が0.04349892205346475であること", () => {
        const weaponBasicValue = 1;
        const result = calculateWeaponSection(weaponBasicValue);
        expect(result).toBeCloseTo(0.150478210569169);
    });

    test("武器の基本値が50のとき、武器切片が1.3996391183715797であること", () => {
        const weaponBasicValue = 50;
        const result = calculateWeaponSection(weaponBasicValue);
        expect(result).toBeCloseTo(26.02903096949418);
    });

    test("武器の基本値が99のとき、武器切片が1.9200783091132967であること", () => {
        const weaponBasicValue = 99;
        const result = calculateWeaponSection(weaponBasicValue);
        expect(result).toBeCloseTo(41.696683490783556);
    });

    test("武器の基本値が0のとき、武器切片が0であること", () => {
        const weaponBasicValue = 0;
        const result = calculateWeaponSection(weaponBasicValue);
        expect(result).toBe(0);
    });
});

// 武器補正のテスト
// calculateWeaponCorrection = (weaponBasicValue: number, weaponModifierValue: number, weaponTilt: number, weaponSection: number): number
describe("calculateWeaponCorrectionTest", () => {
    test("武器の基本値が0、修正値が0、武器傾きが0、武器切片が0のとき、武器補正が0であること", () => {
        const weaponBasicValue = 0;
        const weaponModifierValue = 0;
        const weaponTilt = calculateWeaponTilt(0);
        const weaponSection = calculateWeaponSection(0);
        const result = calculateWeaponCorrection(weaponBasicValue, weaponModifierValue, weaponTilt, weaponSection);
        expect(result).toBeCloseTo(0);
    });

    test("武器の基本値が1、修正値が0、武器傾きが0.04349892205346475、武器切片が0.150478210569169のとき、武器補正が0.150478210569169であること", () => {
        const weaponBasicValue = 1;
        const weaponModifierValue = 0;
        const weaponTilt = calculateWeaponTilt(weaponBasicValue);
        const weaponSection = calculateWeaponSection(weaponBasicValue);
        const result = calculateWeaponCorrection(weaponBasicValue, weaponModifierValue, weaponTilt, weaponSection);
        expect(result).toBeCloseTo(0.150478210569169);
    });

    test("武器の基本値が50、修正値が0、武器傾きが1.3996391183715797、武器切片が26.02903096949418のとき、武器補正が26.02903096949418であること", () => {
        const weaponBasicValue = 50;
        const weaponModifierValue = 0;
        const weaponTilt = calculateWeaponTilt(weaponBasicValue);
        const weaponSection = calculateWeaponSection(weaponBasicValue);
        const result = calculateWeaponCorrection(weaponBasicValue, weaponModifierValue, weaponTilt, weaponSection);
        expect(result).toBeCloseTo(26.02903096949418);
    });

    test("武器の基本値が99、修正値が0、武器傾きが1.9200783091132967、武器切片が41.696683490783556のとき、武器補正が41.696683490783556であること", () => {
        const weaponBasicValue = 99;
        const weaponModifierValue = 0;
        const weaponTilt = calculateWeaponTilt(weaponBasicValue);
        const weaponSection = calculateWeaponSection(weaponBasicValue);
        const result = calculateWeaponCorrection(weaponBasicValue, weaponModifierValue, weaponTilt, weaponSection);
        expect(result).toBeCloseTo(41.696683490783556);
    });

    test("武器の基本値が1、修正値が1、武器傾きが0.04349892205346475、武器切片が0.150478210569169のとき、武器補正が0.19397713262263375であること", () => {
        const weaponBasicValue = 1;
        const weaponModifierValue = 1;
        const weaponTilt = calculateWeaponTilt(weaponBasicValue);
        const weaponSection = calculateWeaponSection(weaponBasicValue);
        const result = calculateWeaponCorrection(weaponBasicValue, weaponModifierValue, weaponTilt, weaponSection);
        expect(result).toBeCloseTo(0.19397713262263375);
    });

    test("武器の基本値が50、修正値が50、武器傾きが1.3996391183715797、武器切片が26.02903096949418のとき、武器補正が96.01098688807318であること", () => {
        const weaponBasicValue = 50;
        const weaponModifierValue = 50;
        const weaponTilt = calculateWeaponTilt(weaponBasicValue);
        const weaponSection = calculateWeaponSection(weaponBasicValue);
        const result = calculateWeaponCorrection(weaponBasicValue, weaponModifierValue, weaponTilt, weaponSection);
        expect(result).toBeCloseTo(96.01098688807318);
    });

    test("武器の基本値が99、修正値が99、武器傾きが1.9200783091132967、武器切片が41.696683490783556のとき、武器補正が231.78443609299993であること", () => {
        const weaponBasicValue = 99;
        const weaponModifierValue = 99;
        const weaponTilt = calculateWeaponTilt(weaponBasicValue);
        const weaponSection = calculateWeaponSection(weaponBasicValue);
        const result = calculateWeaponCorrection(weaponBasicValue, weaponModifierValue, weaponTilt, weaponSection);
        expect(result).toBeCloseTo(231.78443609299993);
    });

    test("武器の基本値が1、修正値が-1、武器傾きが0.04349892205346475、武器切片が0.150478210569169のとき、武器補正が0であること", () => {
        const weaponBasicValue = 1;
        const weaponModifierValue = -1;
        const weaponTilt = calculateWeaponTilt(weaponBasicValue);
        const weaponSection = calculateWeaponSection(weaponBasicValue);
        const result = calculateWeaponCorrection(weaponBasicValue, weaponModifierValue, weaponTilt, weaponSection);
        expect(result).toBeCloseTo(0);
    });

    test("武器の基本値が99、修正値が-69、武器傾きが1.9200783091132967、武器切片が41.696683490783556のとき、武器補正が12.635358633570775であること", () => {
        const weaponBasicValue = 99;
        const weaponModifierValue = -69;
        const weaponTilt = calculateWeaponTilt(weaponBasicValue);
        const weaponSection = calculateWeaponSection(weaponBasicValue);
        const result = calculateWeaponCorrection(weaponBasicValue, weaponModifierValue, weaponTilt, weaponSection);
        expect(result).toBeCloseTo(12.635358633570775);
    });

    test("武器の基本値が0、修正値が-1、武器傾きが0、武器切片が0のとき、武器補正が0であること", () => {
        const weaponBasicValue = 0;
        const weaponModifierValue = -1;
        const weaponTilt = 0;
        const weaponSection = 0;
        const result = calculateWeaponCorrection(weaponBasicValue, weaponModifierValue, weaponTilt, weaponSection);
        expect(result).toBeCloseTo(0);
    });
});

// 端数攻撃力のテスト
// calculateFractionalAttackPower = (levelCorrection: number, powerCorrection: number, weaponCorrection: number): number
describe("calculateFractionalAttackPowerTest", () => {
    test("レベル補正が0.744225509120611、ちから補正が4.780733504838188、武器補正が0のとき、端数攻撃力が5.5249590139587985であること", () => {
        const asukaLevel = 1;
        const levelCorrection = calculateLevelCorrection(asukaLevel);
        //console.log("levelCorrection:" + levelCorrection);
        const asukaPower = 7;
        const powerCorrection = calculatePowerCorrection(asukaPower);
        //console.log("powerCorrection:" + powerCorrection);
        const weaponBasicValue = 0;
        const weaponModifierValue = 0;
        const weaponTilt = calculateWeaponTilt(weaponBasicValue);
        const weaponSection = calculateWeaponSection(weaponBasicValue);
        const weaponCorrection = calculateWeaponCorrection(weaponBasicValue, weaponModifierValue, weaponTilt, weaponSection);
        const result = calculateFractionalAttackPower(levelCorrection, powerCorrection, weaponCorrection);
        expect(result).toBeCloseTo(5.5249590139587985);
    });

    test("レベル補正が0.744225509120611、ちから補正が5.463695434100786、武器補正が0のとき、端数攻撃力が6.2079209432214であること", () => {
        const asukaLevel = 1;
        const levelCorrection = calculateLevelCorrection(asukaLevel);
        //console.log("levelCorrection:" + levelCorrection);
        const asukaPower = 8;
        const powerCorrection = calculatePowerCorrection(asukaPower);
        //console.log("powerCorrection:" + powerCorrection);
        const weaponBasicValue = 0;
        const weaponModifierValue = 0;
        const weaponTilt = calculateWeaponTilt(weaponBasicValue);
        const weaponSection = calculateWeaponSection(weaponBasicValue);
        const weaponCorrection = calculateWeaponCorrection(weaponBasicValue, weaponModifierValue, weaponTilt, weaponSection);
        const result = calculateFractionalAttackPower(levelCorrection, powerCorrection, weaponCorrection);
        expect(result).toBeCloseTo(6.2079209432214);
    });

    test("レベル補正が0.744225509120611、ちから補正が7.1045306387391465、武器補正が0.150478210569169のとき、端数攻撃力が7.999234358428926であること", () => {
        const asukaLevel = 1;
        const levelCorrection = calculateLevelCorrection(asukaLevel);
        //console.log("levelCorrection:" + levelCorrection);
        const asukaPower = 9;
        const powerCorrection = calculatePowerCorrection(asukaPower);
        //console.log("powerCorrection:" + powerCorrection);
        const weaponBasicValue = 1;
        const weaponModifierValue = 0;
        const weaponTilt = calculateWeaponTilt(weaponBasicValue);
        const weaponSection = calculateWeaponSection(weaponBasicValue);
        const weaponCorrection = calculateWeaponCorrection(weaponBasicValue, weaponModifierValue, weaponTilt, weaponSection);
        //console.log("weaponCorrection:" + weaponCorrection);
        const result = calculateFractionalAttackPower(levelCorrection, powerCorrection, weaponCorrection);
        expect(result).toBeCloseTo(7.999234358428926);
    });
});

// 攻撃力のテスト
// calculateAttackPower = (fractionalAttackPower: number): number
describe("calculateAttackPowerTest", () => {
    test("端数攻撃力が6.2079209432214のとき、攻撃力が6であること", () => {
        const asukaLevel = 1;
        const levelCorrection = calculateLevelCorrection(asukaLevel);
        const asukaPower = 8;
        const powerCorrection = calculatePowerCorrection(asukaPower);
        const weaponBasicValue = 0;
        const weaponModifierValue = 0;
        const weaponTilt = calculateWeaponTilt(weaponBasicValue);
        const weaponSection = calculateWeaponSection(weaponBasicValue);
        const weaponCorrection = calculateWeaponCorrection(weaponBasicValue, weaponModifierValue, weaponTilt, weaponSection);
        const fractionalAttackPower = calculateFractionalAttackPower(levelCorrection, powerCorrection, weaponCorrection);
        const result = calculateAttackPower(fractionalAttackPower);
        expect(result).toBeCloseTo(6);
    });
});

// ステータス効果のテスト
// calculateAttackPowerAffectsByStatusEffects = (attackPower: number, asukaCondition: Condition): number
describe("calculateAttackPowerAffectsByStatusEffectsTest", () => {
    test("キャラクターがファイト状態のとき、算出された攻撃力が1.5になること", () => {
        const asukaCondition: AsukaCondition = {
            isAngryState: false,
            isFightState: true,
            isWildDanceState: false,
            isConfusionState: false
        }
        const attackPower = 2;
        const result = calculateAttackPowerAffectsByStatusEffects(attackPower, asukaCondition);
        expect(result).toBeCloseTo(3);
    });

    test("キャラクターがファイト状態でないとき、算出された攻撃力が1.5倍にならないこと", () => {
        const asukaCondition: AsukaCondition = {
            isAngryState: false,
            isFightState: false,
            isWildDanceState: false,
            isConfusionState: false
        }
        const attackPower = 2;
        const result = calculateAttackPowerAffectsByStatusEffects(attackPower, asukaCondition);
        expect(result).toBe(2);
    });

    test("キャラクターがキグニ状態のとき、算出された攻撃力が1.5倍になること", () => {
        const asukaCondition: AsukaCondition = {
            isAngryState: false,
            isFightState: false,
            isWildDanceState: false,
            isConfusionState: true
        }
        const attackPower = 2;
        const result = calculateAttackPowerAffectsByStatusEffects(attackPower, asukaCondition);
        expect(result).toBeCloseTo(3);
    });

    test("キャラクターがキグニ状態でないとき、算出された攻撃力が1.5倍にならないこと", () => {
        const asukaCondition: AsukaCondition = {
            isAngryState: false,
            isFightState: false,
            isWildDanceState: false,
            isConfusionState: false
        }
        const attackPower = 2;
        const result = calculateAttackPowerAffectsByStatusEffects(attackPower, asukaCondition);
        expect(result).toBe(2);
    });
});