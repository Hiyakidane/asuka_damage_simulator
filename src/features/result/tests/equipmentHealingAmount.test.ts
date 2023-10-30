import { calculateHealingSwordHealingAmount, calculateHerbHealingAmount, calculateOtogirisoHealingAmount, calculateShieldTotalHealingAmount, calculateWeaponTotalHealingAmount } from "../modules/equipmentHealingAmount";

// calcHerbHealingAmount = (HerbRuneCount: number): number
describe("calcHerbHealingAmountTest", () => {
    test("装備に薬印が入っていないとき、回復量が0であること", () => {
        const herbRuneCount = 0;
        const result = calculateHerbHealingAmount(herbRuneCount);
        expect(result).toBeCloseTo(0);
    });

    test("装備に薬印が1個入っているとき、回復量が2であること", () => {
        const herbRuneCount = 1;
        const result = calculateHerbHealingAmount(herbRuneCount);
        expect(result).toBeCloseTo(2);
    });

    test("装備に薬印が8個入っているとき、回復量が12であること", () => {
        const herbRuneCount = 8;
        const result = calculateHerbHealingAmount(herbRuneCount);
        expect(result).toBeCloseTo(12);
    });

    test("装備に薬印が16個入っているとき、回復量が24であること", () => {
        const herbRuneCount = 16;
        const result = calculateHerbHealingAmount(herbRuneCount);
        expect(result).toBeCloseTo(24);
    });
});

describe("calculateOtogirisoHealingAmountTest", () => {
    test("装備に弟印が入っていないとき、回復量が0であること", () => {
        const otogirisoRuneCount = 0;
        const result = calculateOtogirisoHealingAmount(otogirisoRuneCount);
        expect(result).toBeCloseTo(0);
    });

    test("装備に弟印が1個入っているとき、回復量が4であること", () => {
        const otogirisoRuneCount = 1;
        const result = calculateOtogirisoHealingAmount(otogirisoRuneCount);
        expect(result).toBeCloseTo(4);
    });

    test("装備に弟印が8個入っているとき、回復量が28であること", () => {
        const otogirisoRuneCount = 8;
        const result = calculateOtogirisoHealingAmount(otogirisoRuneCount);
        expect(result).toBeCloseTo(28);
    });

    test("装備に弟印が16個入っているとき、回復量が56であること", () => {
        const otogirisoRuneCount = 16;
        const result = calculateOtogirisoHealingAmount(otogirisoRuneCount);
        expect(result).toBeCloseTo(56);
    });
});

describe("calculateHealingSwordHealingAmountTest", () => {
    test("武器に回印が入っていないとき、回復量が0であること", () => {
        const hasHealingSwordRune = false;
        const attackDamage = [0, 0, 0];
        const result = calculateHealingSwordHealingAmount(hasHealingSwordRune, attackDamage);
        expect(result[0]).toBeCloseTo(0);
        expect(result[1]).toBeCloseTo(0);
        expect(result[2]).toBeCloseTo(0);
    });

    test("武器に回印が入っていて、与ダメージが3未満のとき、回復量が0であること", () => {
        const hasHealingSwordRune = true;
        const attackDamage = [1, 1, 1];
        const result = calculateHealingSwordHealingAmount(hasHealingSwordRune, attackDamage);
        expect(result[0]).toBeCloseTo(0);
        expect(result[1]).toBeCloseTo(0);
        expect(result[2]).toBeCloseTo(0);
    });

    test("武器に回印が入っていて、与ダメージが10/20/30のとき、回復量が3/6/10であること", () => {
        const hasHealingSwordRune = true;
        const attackDamage = [10, 20, 30];
        const result = calculateHealingSwordHealingAmount(hasHealingSwordRune, attackDamage);
        expect(result[0]).toBeCloseTo(3);
        expect(result[1]).toBeCloseTo(6);
        expect(result[2]).toBeCloseTo(10);
    });

    test("武器に回印が入っていて、与ダメージが100/200/300のとき、回復量が33/66/100であること", () => {
        const hasHealingSwordRune = true;
        const attackDamage = [100, 200, 300];
        const result = calculateHealingSwordHealingAmount(hasHealingSwordRune, attackDamage);
        expect(result[0]).toBeCloseTo(33);
        expect(result[1]).toBeCloseTo(66);
        expect(result[2]).toBeCloseTo(100);
    });
});

describe("calculateWeaponTotalHealingAmountTest", () => {
    test("武器の薬印の総回復量が0、弟印の総回復量が0、回復剣の総回復量が0のとき、総回復量が0であること", () => {
        const herbHealingAmount = 0;
        const otogirisoHealingAmount = 0;
        const healingSwordHealingAmount = [0, 0, 0];
        const result = calculateWeaponTotalHealingAmount(herbHealingAmount, otogirisoHealingAmount, healingSwordHealingAmount);
        expect(result[0]).toBe(0);
        expect(result[1]).toBe(0);
        expect(result[2]).toBe(0);
    });

    test("武器の薬印の総回復量が2、弟印の総回復量が4、回復剣の総回復量が10のとき、総回復量が16であること", () => {
        const herbHealingAmount = 2;
        const otogirisoHealingAmount = 4;
        const healingSwordHealingAmount = [10, 10, 10];
        const result = calculateWeaponTotalHealingAmount(herbHealingAmount, otogirisoHealingAmount, healingSwordHealingAmount);
        expect(result[0]).toBe(16);
        expect(result[1]).toBe(16);
        expect(result[2]).toBe(16);
    });
});

describe("calculateShieldTotalHealingAmountTest", () => {
    test("武器の薬印の総回復量が0、弟印の総回復量が0、総回復量が0であること", () => {
        const herbHealingAmount = 0;
        const otogirisoHealingAmount = 0;
        const result = calculateShieldTotalHealingAmount(herbHealingAmount, otogirisoHealingAmount);
        expect(result).toBe(0);
    });

    test("武器の薬印の総回復量が2、弟印の総回復量が4のとき、総回復量が6であること", () => {
        const herbHealingAmount = 2;
        const otogirisoHealingAmount = 4;
        const result = calculateShieldTotalHealingAmount(herbHealingAmount, otogirisoHealingAmount);
        expect(result).toBe(6);
    });
});