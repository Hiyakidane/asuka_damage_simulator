import { calculateLevelCorrection, calculatePowerCorrection } from "../modules/asukaAttackPower";
import {
    calculateCriticalHitArrowDealtDamage,
    calculateProjectileDealtDamage,
} from "../modules/asukaProjectileDamageDealt";

// 飛び道具の与ダメージ計算テスト
// calculateProjectileDealtDamage = (projectileAttackPower: number, levelCorrection: number, powerCorrection: number, monsterDefencePower: number): number[]
describe("calculateProjectileDealtDamageTest", () => {
    test("矢の攻撃力が5、モンスターの防御力が0のとき、与ダメージの最小値10、中間値が11、最大値が13であること", () => {
        const projectileAttackPower = 5;
        const levelCorrection = calculateLevelCorrection(1);
        const powerCorrection = calculatePowerCorrection(8);
        const monsterDefencePower = 0;
        const result = calculateProjectileDealtDamage(projectileAttackPower, levelCorrection, powerCorrection, monsterDefencePower);
        expect(result[0]).toBe(10);
        expect(result[1]).toBe(11);
        expect(result[2]).toBe(13);
    });

    test("矢の攻撃力が5、モンスターの防御力が50のとき、与ダメージのそれぞれの最小値が1であること", () => {
        const projectileAttackPower = 5;
        const levelCorrection = calculateLevelCorrection(1);
        const powerCorrection = calculatePowerCorrection(8);
        const monsterDefencePower = 50;
        const result = calculateProjectileDealtDamage(projectileAttackPower, levelCorrection, powerCorrection, monsterDefencePower);
        expect(result[0]).toBe(1);
        expect(result[1]).toBe(1);
        expect(result[2]).toBe(1);
    });
});

// 会心の矢の会心ダメージ計算
// calculateCriticalHitArrowDealtDamage = (projectileAttackPower: number, levelCorrection: number, powerCorrection: number, monsterDefencePower: number): number[]
describe("calculateCriticalHitArrowDealtDamageTest", () => {
    test("ダメージが1.3倍されていること", () => {
        const projectileAttackPower = 11;
        const levelCorrection = calculateLevelCorrection(1);
        const powerCorrection = calculatePowerCorrection(8);
        const monsterDefencePower = 0;
        const result = calculateCriticalHitArrowDealtDamage(projectileAttackPower, levelCorrection, powerCorrection, monsterDefencePower);
        expect(result[0]).toBe(19);
        expect(result[1]).toBe(22);
        expect(result[2]).toBe(24);
    });
});