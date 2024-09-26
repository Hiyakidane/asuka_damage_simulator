import { AsukaCondition } from "useCharacter";
import {
    calculateShieldTilt,
    calculateShieldSection,
    calculateFractionalDefencePower,
    calculateDefencePower,
    calculateDefencePowerAffectsByRuneEffects,
    calculateDefencePowerAffectsByStatusEffects,
} from "../modules/asukaDefencePower";

// 防具傾きの計算テスト
// calculateShieldTilt = (shieldBasicValue: number): number
describe("calculateShieldTiltTest", () => {
    test("盾の基本値が1のとき、防具傾きが0.5434989220534647であること", () => {
        const shieldBasicValue = 1;
        const result = calculateShieldTilt(shieldBasicValue);
        expect(result).toBeCloseTo(0.5434989220534647);
    });

    test("盾の基本値が50のとき、防具傾きが1.8996391183715797であること", () => {
        const shieldBasicValue = 50;
        const result = calculateShieldTilt(shieldBasicValue);
        expect(result).toBeCloseTo(1.8996391183715797);
    });

    test("盾の基本値が1のとき、防具傾きが2.420078309113297であること", () => {
        const shieldBasicValue = 99;
        const result = calculateShieldTilt(shieldBasicValue);
        expect(result).toBeCloseTo(2.420078309113297);
    });

    test("盾の基本値が0のとき、防具傾きが0.5であること", () => {
        const shieldBasicValue = 0;
        const result = calculateShieldTilt(shieldBasicValue);
        expect(result).toBeCloseTo(0.5);
    });
});

// 防具切片の計算テスト
// calculateShieldSection = (shieldBasicValue: number): number
describe("calculateShieldSectionTest", () => {
    test("盾の基本値が1のとき、防具切片が0.37464778948690924であること", () => {
        const shieldBasicValue = 1;
        const result = calculateShieldSection(shieldBasicValue);
        expect(result).toBeCloseTo(0.37464778948690924);
    });

    test("盾の基本値が50のとき、防具切片が37.330993721745116であること", () => {
        const shieldBasicValue = 50;
        const result = calculateShieldSection(shieldBasicValue);
        expect(result).toBeCloseTo(37.330993721745116);
    });

    test("盾の基本値が99のとき、防具切片が56.29256001479557であること", () => {
        const shieldBasicValue = 99;
        const result = calculateShieldSection(shieldBasicValue);
        expect(result).toBeCloseTo(56.29256001479557);
    });

    test("盾の基本値が0のとき、防具切片が0であること", () => {
        const shieldBasicValue = 0;
        const result = calculateShieldSection(shieldBasicValue);
        expect(result).toBeCloseTo(0);
    });
});

// 端数防御力の計算テスト
// calculateFractionalDefencePower = (shieldBasicValue: number, shieldModifierValue: number, shieldTilt: number, shieldSection: number): number
describe("calculateFractionalDefencePowerTest", () => {
    test("盾の基本値が0、修正値が0、防具傾きが0.5、防具切片が0のとき、端数防御力が0であること", () => {
        const shieldBasicValue = 0;
        const shieldModifierValue = 0;
        const shieldTilt = calculateShieldTilt(shieldBasicValue);
        const shieldSection = calculateShieldSection(shieldBasicValue);
        const result = calculateFractionalDefencePower(shieldBasicValue, shieldModifierValue, shieldTilt, shieldSection);
        expect(result).toBeCloseTo(0);
    });

    test("盾の基本値が1、修正値が0、防具傾きが0.5434989220534647、防具切片が0.37464778948690924のとき、端数防御力が0.37464778948690924であること", () => {
        const shieldBasicValue = 1;
        const shieldModifierValue = 0;
        const shieldTilt = calculateShieldTilt(shieldBasicValue);
        const shieldSection = calculateShieldSection(shieldBasicValue);
        const result = calculateFractionalDefencePower(shieldBasicValue, shieldModifierValue, shieldTilt, shieldSection);
        expect(result).toBeCloseTo(0.37464778948690924);
    });

    test("盾の基本値が50、修正値が0、防具傾きが1.8996391183715797、防具切片が37.330993721745116のとき、端数防御力が37.330993721745116であること", () => {
        const shieldBasicValue = 50;
        const shieldModifierValue = 0;
        const shieldTilt = calculateShieldTilt(shieldBasicValue);
        const shieldSection = calculateShieldSection(shieldBasicValue);
        const result = calculateFractionalDefencePower(shieldBasicValue, shieldModifierValue, shieldTilt, shieldSection);
        expect(result).toBeCloseTo(37.330993721745116);
    });

    test("盾の基本値が99、修正値が0、防具傾きが2.420078309113297、防具切片が56.29256001479557のとき、端数防御力が56.29256001479557であること", () => {
        const shieldBasicValue = 99;
        const shieldModifierValue = 0;
        const shieldTilt = calculateShieldTilt(shieldBasicValue);
        const shieldSection = calculateShieldSection(shieldBasicValue);
        const result = calculateFractionalDefencePower(shieldBasicValue, shieldModifierValue, shieldTilt, shieldSection);
        expect(result).toBeCloseTo(56.29256001479557);
    });

    test("盾の基本値が1、修正値が1、防具傾きが0.5434989220534647、防具切片が0.37464778948690924のとき、端数防御力が0.918146711540374であること", () => {
        const shieldBasicValue = 1;
        const shieldModifierValue = 1;
        const shieldTilt = calculateShieldTilt(shieldBasicValue);
        const shieldSection = calculateShieldSection(shieldBasicValue);
        const result = calculateFractionalDefencePower(shieldBasicValue, shieldModifierValue, shieldTilt, shieldSection);
        expect(result).toBeCloseTo(0.918146711540374);
    });

    test("盾の基本値が50、修正値が50、防具傾きが1.8996391183715797、防具切片が37.330993721745116のとき、端数防御力が132.31294964032412であること", () => {
        const shieldBasicValue = 50;
        const shieldModifierValue = 50;
        const shieldTilt = calculateShieldTilt(shieldBasicValue);
        const shieldSection = calculateShieldSection(shieldBasicValue);
        const result = calculateFractionalDefencePower(shieldBasicValue, shieldModifierValue, shieldTilt, shieldSection);
        expect(result).toBeCloseTo(132.31294964032412);
    });

    test("盾の基本値が99、修正値が99、防具傾きが2.420078309113297、防具切片が56.29256001479557のとき、端数防御力が295.88031261701195であること", () => {
        const shieldBasicValue = 99;
        const shieldModifierValue = 99;
        const shieldTilt = calculateShieldTilt(shieldBasicValue);
        const shieldSection = calculateShieldSection(shieldBasicValue);
        const result = calculateFractionalDefencePower(shieldBasicValue, shieldModifierValue, shieldTilt, shieldSection);
        expect(result).toBeCloseTo(295.88031261701195);
    });

    test("盾の基本値が1、修正値が-1、防具傾きが0.5434989220534647、防具切片が0.37464778948690924のとき、端数防御力が0(Nan)であること", () => {
        const shieldBasicValue = 1;
        const shieldModifierValue = -1;
        const shieldTilt = calculateShieldTilt(shieldBasicValue);
        const shieldSection = calculateShieldSection(shieldBasicValue);
        const result = calculateFractionalDefencePower(shieldBasicValue, shieldModifierValue, shieldTilt, shieldSection);
        expect(result).toBeCloseTo(0);
    });

    test("盾の基本値が99、修正値が-69、防具傾きが2.420078309113297、防具切片が56.29256001479557のとき、端数防御力が17.05835151963502であること", () => {
        const shieldBasicValue = 99;
        const shieldModifierValue = -69;
        const shieldTilt = calculateShieldTilt(shieldBasicValue);
        const shieldSection = calculateShieldSection(shieldBasicValue);
        const result = calculateFractionalDefencePower(shieldBasicValue, shieldModifierValue, shieldTilt, shieldSection);
        expect(result).toBeCloseTo(17.05835151963502);
    });

    test("盾の基本値が0、修正値が-1、防具傾きが0、防具切片が0のとき、端数防御力が0であること", () => {
        const shieldBasicValue = 0;
        const shieldModifierValue = -1;
        const shieldTilt = calculateShieldTilt(shieldBasicValue);
        const shieldSection = calculateShieldSection(shieldBasicValue);
        const result = calculateFractionalDefencePower(shieldBasicValue, shieldModifierValue, shieldTilt, shieldSection);
        expect(result).toBeCloseTo(0);
    });
});

// 防御力の計算テスト
// calculateDefencePower = (shieldBasicValue: number, shieldModifierValue: number, shieldSection: number, fractionalDefencePower: number): number
describe("calculateDefencePowerTest", () => {
    test("盾の基本値が0、修正値が0、防具切片が0、端数防御力が0のとき、防御力が0になること", () => {
        const shieldBasicValue = 0;
        const shieldModifierValue = 0;
        const shieldTilt = calculateShieldTilt(shieldBasicValue);
        const shieldSection = calculateShieldSection(shieldBasicValue);
        const fractionalDefencePower = calculateFractionalDefencePower(shieldBasicValue, shieldModifierValue, shieldTilt, shieldSection);
        const result = calculateDefencePower(shieldBasicValue, shieldModifierValue, shieldSection, fractionalDefencePower);
        expect(result).toBeCloseTo(0);
    });

    test("盾の基本値が1、修正値が0、防具切片が0.37464778948690924、端数防御力が0.37464778948690924のとき、防御力が0になること", () => {
        const shieldBasicValue = 1;
        const shieldModifierValue = 0;
        const shieldTilt = calculateShieldTilt(shieldBasicValue);
        const shieldSection = calculateShieldSection(shieldBasicValue);
        const fractionalDefencePower = calculateFractionalDefencePower(shieldBasicValue, shieldModifierValue, shieldTilt, shieldSection);
        const result = calculateDefencePower(shieldBasicValue, shieldModifierValue, shieldSection, fractionalDefencePower);
        expect(result).toBeCloseTo(0);
    });

    test("盾の基本値が50、修正値が0、防具切片が37.330993721745116、端数防御力が0.37464778948690924のとき、防御力が37になること", () => {
        const shieldBasicValue = 50;
        const shieldModifierValue = 0;
        const shieldTilt = calculateShieldTilt(shieldBasicValue);
        const shieldSection = calculateShieldSection(shieldBasicValue);
        const fractionalDefencePower = calculateFractionalDefencePower(shieldBasicValue, shieldModifierValue, shieldTilt, shieldSection);
        const result = calculateDefencePower(shieldBasicValue, shieldModifierValue, shieldSection, fractionalDefencePower);
        expect(result).toBeCloseTo(37);
    });

    test("盾の基本値が99、修正値が0、防具切片が56.29256001479557、端数防御力が56.29256001479557のとき、防御力が56になること", () => {
        const shieldBasicValue = 99;
        const shieldModifierValue = 0;
        const shieldTilt = calculateShieldTilt(shieldBasicValue);
        const shieldSection = calculateShieldSection(shieldBasicValue);
        const fractionalDefencePower = calculateFractionalDefencePower(shieldBasicValue, shieldModifierValue, shieldTilt, shieldSection);
        const result = calculateDefencePower(shieldBasicValue, shieldModifierValue, shieldSection, fractionalDefencePower);
        expect(result).toBeCloseTo(56);
    });

    test("盾の基本値が1、修正値が1、防具切片が0.37464778948690924、端数防御力が0.918146711540374のとき、防御力が0になること", () => {
        const shieldBasicValue = 1;
        const shieldModifierValue = 1;
        const shieldTilt = calculateShieldTilt(shieldBasicValue);
        const shieldSection = calculateShieldSection(shieldBasicValue);
        const fractionalDefencePower = calculateFractionalDefencePower(shieldBasicValue, shieldModifierValue, shieldTilt, shieldSection);
        const result = calculateDefencePower(shieldBasicValue, shieldModifierValue, shieldSection, fractionalDefencePower);
        expect(result).toBeCloseTo(0);
    });

    test("盾の基本値が50、修正値が50、防具切片が37.330993721745116、端数防御力が132.31294964032412のとき、防御力が132になること", () => {
        const shieldBasicValue = 50;
        const shieldModifierValue = 50;
        const shieldTilt = calculateShieldTilt(shieldBasicValue);
        const shieldSection = calculateShieldSection(shieldBasicValue);
        const fractionalDefencePower = calculateFractionalDefencePower(shieldBasicValue, shieldModifierValue, shieldTilt, shieldSection);
        const result = calculateDefencePower(shieldBasicValue, shieldModifierValue, shieldSection, fractionalDefencePower);
        expect(result).toBeCloseTo(132);
    });

    test("盾の基本値が99、修正値が99、防具切片が56.29256001479557、端数防御力が295.88031261701195のとき、防御力が295になること", () => {
        const shieldBasicValue = 99;
        const shieldModifierValue = 99;
        const shieldTilt = calculateShieldTilt(shieldBasicValue);
        const shieldSection = calculateShieldSection(shieldBasicValue);
        const fractionalDefencePower = calculateFractionalDefencePower(shieldBasicValue, shieldModifierValue, shieldTilt, shieldSection);
        const result = calculateDefencePower(shieldBasicValue, shieldModifierValue, shieldSection, fractionalDefencePower);
        expect(result).toBeCloseTo(295);
    });

    test("盾の基本値が1、修正値が-1、防具切片が0.37464778948690924、端数防御力が0のとき、防御力が0になること", () => {
        const shieldBasicValue = 1;
        const shieldModifierValue = -1;
        const shieldTilt = calculateShieldTilt(shieldBasicValue);
        const shieldSection = calculateShieldSection(shieldBasicValue);
        const fractionalDefencePower = calculateFractionalDefencePower(shieldBasicValue, shieldModifierValue, shieldTilt, shieldSection);
        const result = calculateDefencePower(shieldBasicValue, shieldModifierValue, shieldSection, fractionalDefencePower);
        expect(result).toBeCloseTo(0);
    });

    test("盾の基本値が99、修正値が-69、防具切片が56.29256001479557、端数防御力が17.05835151963502のとき、防御力が17になること", () => {
        const shieldBasicValue = 99;
        const shieldModifierValue = -69;
        const shieldTilt = calculateShieldTilt(shieldBasicValue);
        const shieldSection = calculateShieldSection(shieldBasicValue);
        const fractionalDefencePower = calculateFractionalDefencePower(shieldBasicValue, shieldModifierValue, shieldTilt, shieldSection);
        const result = calculateDefencePower(shieldBasicValue, shieldModifierValue, shieldSection, fractionalDefencePower);
        expect(result).toBeCloseTo(17);
    });

    test("盾の基本値が0、修正値が-1、防具切片が0.5、端数防御力が0のとき、防御力が0(NaN)になること", () => {
        const shieldBasicValue = 0;
        const shieldModifierValue = -1;
        const shieldTilt = calculateShieldTilt(shieldBasicValue);
        const shieldSection = calculateShieldSection(shieldBasicValue);
        const fractionalDefencePower = calculateFractionalDefencePower(shieldBasicValue, shieldModifierValue, shieldTilt, shieldSection);
        const result = calculateDefencePower(shieldBasicValue, shieldModifierValue, shieldSection, fractionalDefencePower);
        expect(result).toBeCloseTo(0);
    });
});

// プレイヤーの防御力に影響を与える印効果の計算テスト
// calculateDefencePowerAffectsByRuneEffects = (defencePower: number, hasFrontWarriorRune: boolean): number
describe("calculateDefencePowerAffectsByRuneEffectsTest", () => {
    test("盾に正印が入っていないとき、防御力が2倍にならないこと", () => {
        const defencePower = 5;
        const hasFrontWarriorRune = false;
        const result = calculateDefencePowerAffectsByRuneEffects(defencePower, hasFrontWarriorRune);
        expect(result).toBe(5);
    });

    test("盾に正印が入っているとき、防御力が2倍になること", () => {
        const defencePower = 5;
        const hasFrontWarriorRune = true;
        const result = calculateDefencePowerAffectsByRuneEffects(defencePower, hasFrontWarriorRune);
        expect(result).toBe(10);
    });
});

// プレイヤーの防御力に影響を与えるステータス効果の計算テスト
// calculateDefencePowerAffectsByStatusEffects = (defencePower: number, asukaCondition: Condition): number
describe("calculateDefencePowerAffectsByStatusEffectsTest", () => {
    test("キャラクターがキグニ状態でないとき、防御力が0にならないこと", () => {
        const defencePower = 5;
        const asukaCondition: AsukaCondition = {
            isAngryState: false,
            isFightState: false,
            isWildDanceState: false,
            isConfusionState: false,
        }
        const result = calculateDefencePowerAffectsByStatusEffects(defencePower, asukaCondition);
        expect(result).toBe(5);
    });

    test("キャラクターがキグニ状態のとき、防御力が0になること", () => {
        const defencePower = 5;
        const asukaCondition: AsukaCondition = {
            isAngryState: false,
            isFightState: false,
            isWildDanceState: false,
            isConfusionState: true,
        }
        const result = calculateDefencePowerAffectsByStatusEffects(defencePower, asukaCondition);
        expect(result).toBe(0);
    });
});