import { Bracelet } from "useCharacter";
import {
    calculateDamageTaken,
    calculateDamageTakenReducedByProtectBracelet,
    calculateDamageTakenIncreasedByTaurosCriticalHit,
    calculateDamageTakenIncreasedByRegretBracelet,
    calculateDamageTakenReducedByBlessedShield,
    roundDownDamageTaken,
} from "../modules/asukaDamageTaken";

// アスカの被ダメージの計算
// calculateDamageTaken = (monsterAttackPower: number, asukaDefencePower: number): number[]
describe("calculateDamageTakenTest", () => {
    // 正常系
    test("モンスターの攻撃力が1、アスカの防御力が0のとき、被ダメージの最小値が1、中間値が1、最大値が1であること", () => {
        const monsterAttackPower = 1;
        const asukaDefencePower = 0;
        const result = calculateDamageTaken(monsterAttackPower, asukaDefencePower);
        expect(result[0]).toBe(1);
        expect(result[1]).toBe(1);
        expect(result[2]).toBe(1);
    });

    test("モンスターの攻撃力が130、アスカの防御力が0のとき、被ダメージの最小値が114、中間値が130、最大値が146であること", () => {
        const monsterAttackPower = 130;
        const asukaDefencePower = 0;
        const result = calculateDamageTaken(monsterAttackPower, asukaDefencePower);
        expect(result[0]).toBeCloseTo(114);
        expect(result[1]).toBeCloseTo(130);
        expect(result[2]).toBeCloseTo(146);
    });

    test("モンスターの攻撃力が1、アスカの防御力が99のとき、被ダメージの最小値が1、中間値が1、最大値が1であること", () => {
        const monsterAttackPower = 1;
        const asukaDefencePower = 99;
        const result = calculateDamageTaken(monsterAttackPower, asukaDefencePower);
        expect(result[0]).toBe(1);
        expect(result[1]).toBe(1);
        expect(result[2]).toBe(1);
    });
});

// 祝福された盾によって軽減されるダメージを計算する
// calculateDamageTakenReducedByBlessedShield = (normalDamageTaken: number[], isShieldBlessed: boolean): number[]
describe("calculateDamageTakenReducedByBlessedShieldTest", () => {
    test("盾が祝福されていないとき、被ダメージが0.75倍にならないこと", () => {
        const normalDamageTaken = [4, 5, 6];
        const isShieldBlessingState = false;
        const result = calculateDamageTakenReducedByBlessedShield(normalDamageTaken, isShieldBlessingState);
        expect(result[0]).toBe(4);
        expect(result[1]).toBe(5);
        expect(result[2]).toBe(6);
    });

    test("盾が祝福されているとき、被ダメージが0.75倍になること", () => {
        const normalDamageTaken = [4, 5, 6];
        const isShieldBlessingState = true;
        const result = calculateDamageTakenReducedByBlessedShield(normalDamageTaken, isShieldBlessingState);
        expect(result[0]).toBeCloseTo(3);
        expect(result[1]).toBeCloseTo(3.75);
        expect(result[2]).toBeCloseTo(4.5);
    });
});

// まもりの腕輪の被ダメージ計算
// calculateDamageTakenReducedByProtectBracelet = (normalDamageTaken: number[], bracelet: Bracelet): number[]
describe("calculateDamageTakenReducedByProtectBraceletTest", () => {
    // 正常系
    test("まもりの腕輪を装備していないとき、被ダメージが軽減されないこと", () => {
        const normalDamageTaken = [4, 5, 6];
        const bracelet: Bracelet = {
            isEquippedProtectBracelet1: false,
            isEquippedProtectBracelet2: false,
            isEquippedRegretBracelet: false,
        }
        const result = calculateDamageTakenReducedByProtectBracelet(normalDamageTaken, bracelet);
        expect(result[0]).toBe(4);
        expect(result[1]).toBe(5);
        expect(result[2]).toBe(6);
    });

    test("まもりの腕輪を1つ装備しているとき、被ダメージが25%軽減されること", () => {
        const normalDamageTaken = [4, 5, 6];
        const bracelet: Bracelet = {
            isEquippedProtectBracelet1: true,
            isEquippedProtectBracelet2: false,
            isEquippedRegretBracelet: false,
        }
        const result = calculateDamageTakenReducedByProtectBracelet(normalDamageTaken, bracelet);
        expect(result[0]).toBeCloseTo(3);
        expect(result[1]).toBeCloseTo(4);
        expect(result[2]).toBeCloseTo(5);
    });

    test("まもりの腕輪を1つ装備しているとき、被ダメージが25%軽減されること", () => {
        const normalDamageTaken = [4, 5, 6];
        const bracelet: Bracelet = {
            isEquippedProtectBracelet1: false,
            isEquippedProtectBracelet2: true,
            isEquippedRegretBracelet: false,
        }
        const result = calculateDamageTakenReducedByProtectBracelet(normalDamageTaken, bracelet);
        expect(result[0]).toBeCloseTo(3);
        expect(result[1]).toBeCloseTo(4);
        expect(result[2]).toBeCloseTo(5);
    });

    test("まもりの腕輪を2つ装備しているとき、被ダメージが50%軽減されること", () => {
        const normalDamageTaken = [4, 5, 6];
        const bracelet: Bracelet = {
            isEquippedProtectBracelet1: true,
            isEquippedProtectBracelet2: true,
            isEquippedRegretBracelet: false,
        }
        const result = calculateDamageTakenReducedByProtectBracelet(normalDamageTaken, bracelet);
        expect(result[0]).toBe(2);
        expect(result[1]).toBe(3);
        expect(result[2]).toBe(3);
    });
});

// 痛恨の一撃(タウロス系)の被ダメージ計算
// calculateDamageTakenIncreasedByTaurosCriticalHit = (normalDamageTaken: number[], monsterId: number): number[]
describe("calculateDamageTakenIncreasedByTaurosCriticalHitTest", () => {
    // 正常系
    test("タウロス系のモンスターID(135/136/137)でないとき、被ダメージが1.3倍にならないこと", () => {
        const normalDamageTaken = [2, 3, 4];
        const monsterId = 134;
        const result = calculateDamageTakenIncreasedByTaurosCriticalHit(normalDamageTaken, monsterId);
        expect(result[0]).toBe(2);
        expect(result[1]).toBe(3);
        expect(result[2]).toBe(4);
    });

    test("タウロス系のモンスターID(135)のとき、被ダメージが1.3倍になること", () => {
        const normalDamageTaken = [2, 3, 4];
        const monsterId = 135;
        const result = calculateDamageTakenIncreasedByTaurosCriticalHit(normalDamageTaken, monsterId);
        expect(result[0]).toBeCloseTo(2.6);
        expect(result[1]).toBeCloseTo(3.9);
        expect(result[2]).toBeCloseTo(5.2);
    });

    test("タウロス系のモンスターID(136)のとき、被ダメージが1.3倍になること", () => {
        const normalDamageTaken = [2, 3, 4];
        const monsterId = 136;
        const result = calculateDamageTakenIncreasedByTaurosCriticalHit(normalDamageTaken, monsterId);
        expect(result[0]).toBeCloseTo(2.6);
        expect(result[1]).toBeCloseTo(3.9);
        expect(result[2]).toBeCloseTo(5.2);
    });

    test("タウロス系のモンスターID(137)のとき、被ダメージが1.3倍になること", () => {
        const normalDamageTaken = [2, 3, 4];
        const monsterId = 137;
        const result = calculateDamageTakenIncreasedByTaurosCriticalHit(normalDamageTaken, monsterId);
        expect(result[0]).toBeCloseTo(2.6);
        expect(result[1]).toBeCloseTo(3.9);
        expect(result[2]).toBeCloseTo(5.2);
    });
});

// 痛恨の一撃(痛恨の腕輪)の被ダメージ計算
// calculateDamageTakenIncreasedByRegretBracelet = (normalDamageTaken: number[], bracelet): number[]
describe("calculateDamageTakenIncreasedByRegretBraceletTest", () => {
    // 正常系
    test("痛恨の腕輪を装備していないとき、被ダメージが1.5倍にならないこと", () => {
        const normalDamageTaken = [2, 3, 4];
        const bracelet: Bracelet = {
            isEquippedProtectBracelet1: false,
            isEquippedProtectBracelet2: false,
            isEquippedRegretBracelet: false,
        }
        const result = calculateDamageTakenIncreasedByRegretBracelet(normalDamageTaken, bracelet);
        expect(result[0]).toBe(2);
        expect(result[1]).toBe(3);
        expect(result[2]).toBe(4);
    });

    test("痛恨の腕輪を装備しているとき、被ダメージが1.5倍になること", () => {
        const normalDamageTaken = [2, 3, 4];
        const bracelet: Bracelet = {
            isEquippedProtectBracelet1: false,
            isEquippedProtectBracelet2: false,
            isEquippedRegretBracelet: true,
        }
        const result = calculateDamageTakenIncreasedByRegretBracelet(normalDamageTaken, bracelet);
        expect(result[0]).toBeCloseTo(3);
        expect(result[1]).toBeCloseTo(4.5);
        expect(result[2]).toBeCloseTo(6);
    });
})

// 被ダメージの端数切り捨てテスト
// roundDownDamageTaken = (damageTaken: number[]): number[]
describe("roundDownDamageTakenTest", () => {
    test("被ダメージが小数のとき、小数点以下が切り捨てられること", () => {
        const damageTaken = [4.5, 5.4, 6.6];
        const result = roundDownDamageTaken(damageTaken);
        expect(result[0]).toBe(4);
        expect(result[1]).toBe(5);
        expect(result[2]).toBe(6);
    });
});