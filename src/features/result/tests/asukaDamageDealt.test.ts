import { AsukaCondition } from "useCharacter";
import {
    calculateDamageDealt,
    calculateDamageDealtAffectsByWeaponBlessed,
    calculateDamageDealtAffectsByStatusEffects,
    calculateDamageDealtAffectsByResonanceEffect,
    calculateSpecialAttackWeaponDealtDamage,
    calculateCriticalHitDealtDamage,
    roundDownDealtDamage,
} from "../modules/asukaDamageDealt";
import { Resonance } from "resonance";

// アスカの与ダメージ計算テスト
// calculateDamageDealt = (asukaAttackPower: number, monsterDefencePower: number): number[]
describe("calculateDamageDealtTest", () => {
    // 正常系
    test("アスカの攻撃力が5、モンスターの防御力が0のとき、与ダメージの最小値が4、中間値が5、最大値が6であること", () => {
        const asukaAttackPower = 5;
        const monsterDefencePower = 0;
        const result = calculateDamageDealt(asukaAttackPower, monsterDefencePower);
        expect(result[0]).toBeCloseTo(4);
        expect(result[1]).toBeCloseTo(5);
        expect(result[2]).toBeCloseTo(6);
    });

    test("アスカの攻撃力が5、モンスターの防御力が1のとき、与ダメージの最小値が3、中間値が4、最大値が5であること", () => {
        const asukaAttackPower = 5;
        const monsterDefencePower = 1;
        const result = calculateDamageDealt(asukaAttackPower, monsterDefencePower);
        expect(result[0]).toBeCloseTo(3);
        expect(result[1]).toBeCloseTo(4);
        expect(result[2]).toBeCloseTo(5);
    });

    test("アスカの攻撃力が1、モンスターの防御力が5のとき、与ダメージの最小値が1、中間値が1、最大値が1であること", () => {
        const asukaAttackPower = 1;
        const monsterDefencePower = 5;
        const result = calculateDamageDealt(asukaAttackPower, monsterDefencePower);
        expect(result[0]).toBeCloseTo(1);
        expect(result[1]).toBeCloseTo(1);
        expect(result[2]).toBeCloseTo(1);
    });
});

// 武器の祝福倍率の計算テスト
// calculateDamageDealtAffectsByWeaponBlessed = (normalAttackDamage: number[], isWeaponBlessed: boolean): number[]
describe("calculateDamageDealtAffectsByWeaponBlessedTest", () => {
    // 正常系
    test("アスカの攻撃力が5、装備が祝福されてないとき、与ダメージの最小値が4、中間値が5、最大値が6であること", () => {
        const attackDamage = [4, 5, 6];
        const isWeaponBlessingState = false;
        const result = calculateDamageDealtAffectsByWeaponBlessed(attackDamage, isWeaponBlessingState);
        expect(result[0]).toBeCloseTo(4);
        expect(result[1]).toBeCloseTo(5);
        expect(result[2]).toBeCloseTo(6);
    });

    test("アスカの攻撃力が5、装備が祝福されているとき、与ダメージの最小値が5、中間値が6.25、最大値が7.5であること", () => {
        const attackDamage = [4, 5, 6];
        const isWeaponBlessingState = true;
        const result = calculateDamageDealtAffectsByWeaponBlessed(attackDamage, isWeaponBlessingState);
        expect(result[0]).toBeCloseTo(5);
        expect(result[1]).toBeCloseTo(6.25);
        expect(result[2]).toBeCloseTo(7.5);
    });
});

// ダメージに影響を与えるアスカのステータス効果を計算するテスト
// calculateDamageDealtAffectsByStatusEffects = (normalAttackDamage: number[], asukaCondition: Condition): number[]
describe("calculateDamageDealtAffectsByStatusEffectsTest", () => {
    // 正常系
    test("アスカのステータスがイカリ状態でないとき、与ダメージが2倍にならないこと", () => {
        const attackDamage = [4, 5, 6];
        const asukaCondition: AsukaCondition = {
            isAngryState: false,
            isFightState: false,
            isWildDanceState: false,
            isConfusionState: false
        }
        const result = calculateDamageDealtAffectsByStatusEffects(attackDamage, asukaCondition);
        expect(result[0]).toBe(4);
        expect(result[1]).toBe(5);
        expect(result[2]).toBe(6);
    });

    test("アスカのステータスがイカリ状態のとき、与ダメージが2倍になること", () => {
        const attackDamage = [4, 5, 6];
        const asukaCondition: AsukaCondition = {
            isAngryState: true,
            isFightState: false,
            isWildDanceState: false,
            isConfusionState: false
        }
        const result = calculateDamageDealtAffectsByStatusEffects(attackDamage, asukaCondition);
        expect(result[0]).toBe(8);
        expect(result[1]).toBe(10);
        expect(result[2]).toBe(12);
    });

    test("アスカのステータスが乱舞状態でないとき、与ダメージが2倍にならないこと", () => {
        const attackDamage = [4, 5, 6];
        const asukaCondition: AsukaCondition = {
            isAngryState: false,
            isFightState: false,
            isWildDanceState: false,
            isConfusionState: false
        }
        const result = calculateDamageDealtAffectsByStatusEffects(attackDamage, asukaCondition);
        expect(result[0]).toBe(4);
        expect(result[1]).toBe(5);
        expect(result[2]).toBe(6);
    });

    test("アスカのステータスが乱舞状態のとき、与ダメージが2倍になること", () => {
        const attackDamage = [4, 5, 6];
        const asukaCondition: AsukaCondition = {
            isAngryState: false,
            isFightState: false,
            isWildDanceState: true,
            isConfusionState: false
        }
        const result = calculateDamageDealtAffectsByStatusEffects(attackDamage, asukaCondition);
        expect(result[0]).toBe(8);
        expect(result[1]).toBe(10);
        expect(result[2]).toBe(12);
    });

    test("アスカのステータスがイカリかつ乱舞状態のとき、与ダメージが4倍になること", () => {
        const attackDamage = [4, 5, 6];
        const asukaCondition: AsukaCondition = {
            isAngryState: true,
            isFightState: false,
            isWildDanceState: true,
            isConfusionState: false
        }
        const result = calculateDamageDealtAffectsByStatusEffects(attackDamage, asukaCondition);
        expect(result[0]).toBe(16);
        expect(result[1]).toBe(20);
        expect(result[2]).toBe(24);
    });
});

// 共鳴効果のダメージ計算テスト
// calculateDamageDealtAffectsByResonanceEffect = (normalAttackDamage: number[], resonances: Resonance, monsterValidRuneList): number[]
describe("calculateDamageDealtAffectsByResonanceEffectTest", () => {
    // 正常系
    test("ドラゴンセット/獣王セット共鳴効果がないとき、与ダメージが+20されていないこと", () => {
        const attackDamage = [4, 5, 6];
        const resonances: Resonance = {
            isForgedSetResonance: false,
            isFumaSetResonance: false,
            isDragonSetResonance: false,
            isBeastKingSetResonance: false
        }
        const monsterValidRuneList = [""];
        const result = calculateDamageDealtAffectsByResonanceEffect(attackDamage, resonances, monsterValidRuneList);
        expect(result[0]).toBeCloseTo(4);
        expect(result[1]).toBeCloseTo(5);
        expect(result[2]).toBeCloseTo(6);
    });

    test("獣王セット共鳴効果があり、敵に特定の属性がないとき、与ダメージが+20されていないこと", () => {
        const attackDamage = [4, 5, 6];
        const resonances: Resonance = {
            isForgedSetResonance: false,
            isFumaSetResonance: false,
            isDragonSetResonance: false,
            isBeastKingSetResonance: true
        }
        const monsterValidRuneList = [""];
        const result = calculateDamageDealtAffectsByResonanceEffect(attackDamage, resonances, monsterValidRuneList);
        expect(result[0]).toBeCloseTo(4);
        expect(result[1]).toBeCloseTo(5);
        expect(result[2]).toBeCloseTo(6);
    });

    test("ドラゴンセット共鳴効果があり、敵にドラゴン属性がないとき、与ダメージが+20されていないこと", () => {
        const attackDamage = [4, 5, 6];
        const resonances: Resonance = {
            isForgedSetResonance: false,
            isFumaSetResonance: false,
            isDragonSetResonance: true,
            isBeastKingSetResonance: false
        }
        const monsterValidRuneList = [""];
        const result = calculateDamageDealtAffectsByResonanceEffect(attackDamage, resonances, monsterValidRuneList);
        expect(result[0]).toBeCloseTo(4);
        expect(result[1]).toBeCloseTo(5);
        expect(result[2]).toBeCloseTo(6);
    });

    test("獣王セット共鳴効果があり、敵にゴースト属性があるとき、与ダメージが+20されていること", () => {
        const attackDamage = [4, 5, 6];
        const resonances: Resonance = {
            isForgedSetResonance: false,
            isFumaSetResonance: false,
            isDragonSetResonance: false,
            isBeastKingSetResonance: true
        }
        const monsterValidRuneList = ["仏"];
        const result = calculateDamageDealtAffectsByResonanceEffect(attackDamage, resonances, monsterValidRuneList);
        expect(result[0]).toBeCloseTo(24);
        expect(result[1]).toBeCloseTo(25);
        expect(result[2]).toBeCloseTo(26);
    });

    test("獣王セット共鳴効果があり、敵にゴースト属性があるとき、与ダメージが+20されていること", () => {
        const attackDamage = [4, 5, 6];
        const resonances: Resonance = {
            isForgedSetResonance: false,
            isFumaSetResonance: false,
            isDragonSetResonance: false,
            isBeastKingSetResonance: true
        }
        const monsterValidRuneList = ["水"];
        const result = calculateDamageDealtAffectsByResonanceEffect(attackDamage, resonances, monsterValidRuneList);
        expect(result[0]).toBeCloseTo(24);
        expect(result[1]).toBeCloseTo(25);
        expect(result[2]).toBeCloseTo(26);
    });

    test("獣王セット共鳴効果があり、敵に一ツ目属性があるとき、与ダメージが+20されていること", () => {
        const attackDamage = [4, 5, 6];
        const resonances: Resonance = {
            isForgedSetResonance: false,
            isFumaSetResonance: false,
            isDragonSetResonance: false,
            isBeastKingSetResonance: true
        }
        const monsterValidRuneList = ["目"];
        const result = calculateDamageDealtAffectsByResonanceEffect(attackDamage, resonances, monsterValidRuneList);
        expect(result[0]).toBeCloseTo(24);
        expect(result[1]).toBeCloseTo(25);
        expect(result[2]).toBeCloseTo(26);
    });

    test("獣王セット共鳴効果があり、敵にドレイン属性があるとき、与ダメージが+20されていること", () => {
        const attackDamage = [4, 5, 6];
        const resonances: Resonance = {
            isForgedSetResonance: false,
            isFumaSetResonance: false,
            isDragonSetResonance: false,
            isBeastKingSetResonance: true
        }
        const monsterValidRuneList = ["ド"];
        const result = calculateDamageDealtAffectsByResonanceEffect(attackDamage, resonances, monsterValidRuneList);
        expect(result[0]).toBeCloseTo(24);
        expect(result[1]).toBeCloseTo(25);
        expect(result[2]).toBeCloseTo(26);
    });

    test("獣王セット共鳴効果があり、敵に爆弾属性があるとき、与ダメージが+20されていること", () => {
        const attackDamage = [4, 5, 6];
        const resonances: Resonance = {
            isForgedSetResonance: false,
            isFumaSetResonance: false,
            isDragonSetResonance: false,
            isBeastKingSetResonance: true
        }
        const monsterValidRuneList = ["月"];
        const result = calculateDamageDealtAffectsByResonanceEffect(attackDamage, resonances, monsterValidRuneList);
        expect(result[0]).toBeCloseTo(24);
        expect(result[1]).toBeCloseTo(25);
        expect(result[2]).toBeCloseTo(26);
    });

    test("ドラゴンセット共鳴効果があり、敵にドラゴン属性(竜)があるとき、与ダメージが+20されていること", () => {
        const attackDamage = [4, 5, 6];
        const resonances: Resonance = {
            isForgedSetResonance: false,
            isFumaSetResonance: false,
            isDragonSetResonance: true,
            isBeastKingSetResonance: false
        }
        const monsterValidRuneList = ["竜"];
        const result = calculateDamageDealtAffectsByResonanceEffect(attackDamage, resonances, monsterValidRuneList);
        expect(result[0]).toBeCloseTo(24);
        expect(result[1]).toBeCloseTo(25);
        expect(result[2]).toBeCloseTo(26);
    });

    test("ドラゴンセット共鳴効果があり、敵にドラゴン属性(龍)があるとき、与ダメージが+20されていること", () => {
        const attackDamage = [4, 5, 6];
        const resonances: Resonance = {
            isForgedSetResonance: false,
            isFumaSetResonance: false,
            isDragonSetResonance: true,
            isBeastKingSetResonance: false
        }
        const monsterValidRuneList = ["龍"];
        const result = calculateDamageDealtAffectsByResonanceEffect(attackDamage, resonances, monsterValidRuneList);
        expect(result[0]).toBeCloseTo(24);
        expect(result[1]).toBeCloseTo(25);
        expect(result[2]).toBeCloseTo(26);
    });
});

// 特攻武器の与ダメージ計算テスト
// calculateSpecialAttackWeaponDealtDamage = (normalAttackDamage: number[], weaponSpecialAttackRuneCount: WeaponSpecialAttackRuneCount, monsterValidRuneList: string[]): number[]
describe("calculateSpecialAttackWeaponDealtDamageTest", () => {
    // 正常系
    test("武器印に特攻印がなく、モンスターの属性がないとき、与ダメージが1.5倍にならないこと", () => {
        const attackDamage = [4, 5, 6];
        const weaponSpecialAttackRuneCount = {
            ghostSickleRuneCount: 0,
            marineSlasherRuneCount: 0,
            cyclopsKillerRuneCount: 0,
            drainBusterRuneCount: 0,
            crescentArmRuneCount: 0,
            dragonKillerRuneCount: 0,
            dragonGodSwordRuneCount: 0,
        }
        const monsterValidRuneList = [""];

        const result = calculateSpecialAttackWeaponDealtDamage(attackDamage, weaponSpecialAttackRuneCount, monsterValidRuneList);
        expect(result[0]).toBeCloseTo(4);
        expect(result[1]).toBeCloseTo(5);
        expect(result[2]).toBeCloseTo(6);
    });

    test("武器印に特攻印があり、モンスターの属性がないとき、与ダメージが1.5倍にならないこと", () => {
        const attackDamage = [4, 5, 6];
        const weaponSpecialAttackRuneCount = {
            ghostSickleRuneCount: 1,
            marineSlasherRuneCount: 1,
            cyclopsKillerRuneCount: 1,
            drainBusterRuneCount: 1,
            crescentArmRuneCount: 1,
            dragonKillerRuneCount: 1,
            dragonGodSwordRuneCount: 1,
        }
        const monsterValidRuneList = [""];

        const result = calculateSpecialAttackWeaponDealtDamage(attackDamage, weaponSpecialAttackRuneCount, monsterValidRuneList);
        expect(result[0]).toBeCloseTo(4);
        expect(result[1]).toBeCloseTo(5);
        expect(result[2]).toBeCloseTo(6);
    });

    test("武器印に仏印がなく、モンスターの属性にゴーストが含まれているとき、与ダメージが1.5倍にならないこと", () => {
        const attackDamage = [4, 5, 6];
        const weaponSpecialAttackRuneCount = {
            ghostSickleRuneCount: 0,
            marineSlasherRuneCount: 0,
            cyclopsKillerRuneCount: 0,
            drainBusterRuneCount: 0,
            crescentArmRuneCount: 0,
            dragonKillerRuneCount: 0,
            dragonGodSwordRuneCount: 0,
        }
        const monsterValidRuneList = ["仏"];

        const result = calculateSpecialAttackWeaponDealtDamage(attackDamage, weaponSpecialAttackRuneCount, monsterValidRuneList);
        expect(result[0]).toBeCloseTo(4);
        expect(result[1]).toBeCloseTo(5);
        expect(result[2]).toBeCloseTo(6);
    });

    test("武器印に仏印があり、モンスターの属性にゴーストが含まれていないとき、与ダメージが1.5倍にならないこと", () => {
        const attackDamage = [4, 5, 6];
        const weaponSpecialAttackRuneCount = {
            ghostSickleRuneCount: 1,
            marineSlasherRuneCount: 0,
            cyclopsKillerRuneCount: 0,
            drainBusterRuneCount: 0,
            crescentArmRuneCount: 0,
            dragonKillerRuneCount: 0,
            dragonGodSwordRuneCount: 0,
        }
        const monsterValidRuneList = [""];

        const result = calculateSpecialAttackWeaponDealtDamage(attackDamage, weaponSpecialAttackRuneCount, monsterValidRuneList);
        expect(result[0]).toBeCloseTo(4);
        expect(result[1]).toBeCloseTo(5);
        expect(result[2]).toBeCloseTo(6);
    });

    test("武器印に仏印があり、モンスターの属性にゴーストが含まれているとき、与ダメージが1.5倍になること", () => {
        const attackDamage = [4, 5, 6];
        const weaponSpecialAttackRuneCount = {
            ghostSickleRuneCount: 1,
            marineSlasherRuneCount: 0,
            cyclopsKillerRuneCount: 0,
            drainBusterRuneCount: 0,
            crescentArmRuneCount: 0,
            dragonKillerRuneCount: 0,
            dragonGodSwordRuneCount: 0,
        }
        const monsterValidRuneList = ["仏"];

        const result = calculateSpecialAttackWeaponDealtDamage(attackDamage, weaponSpecialAttackRuneCount, monsterValidRuneList);
        expect(result[0]).toBeCloseTo(6);
        expect(result[1]).toBeCloseTo(7);
        expect(result[2]).toBeCloseTo(9);
    });

    test("武器印に水印がなく、モンスターの属性に水棲が含まれているとき、与ダメージが1.5倍にならないこと", () => {
        const attackDamage = [4, 5, 6];
        const weaponSpecialAttackRuneCount = {
            ghostSickleRuneCount: 0,
            marineSlasherRuneCount: 0,
            cyclopsKillerRuneCount: 0,
            drainBusterRuneCount: 0,
            crescentArmRuneCount: 0,
            dragonKillerRuneCount: 0,
            dragonGodSwordRuneCount: 0,
        }
        const monsterValidRuneList = ["水"];

        const result = calculateSpecialAttackWeaponDealtDamage(attackDamage, weaponSpecialAttackRuneCount, monsterValidRuneList);
        expect(result[0]).toBeCloseTo(4);
        expect(result[1]).toBeCloseTo(5);
        expect(result[2]).toBeCloseTo(6);
    });

    test("武器印に水印があり、モンスターの属性に水棲が含まれていないとき、与ダメージが1.5倍にならないこと", () => {
        const attackDamage = [4, 5, 6];
        const weaponSpecialAttackRuneCount = {
            ghostSickleRuneCount: 0,
            marineSlasherRuneCount: 1,
            cyclopsKillerRuneCount: 0,
            drainBusterRuneCount: 0,
            crescentArmRuneCount: 0,
            dragonKillerRuneCount: 0,
            dragonGodSwordRuneCount: 0,
        }
        const monsterValidRuneList = [""];

        const result = calculateSpecialAttackWeaponDealtDamage(attackDamage, weaponSpecialAttackRuneCount, monsterValidRuneList);
        expect(result[0]).toBeCloseTo(4);
        expect(result[1]).toBeCloseTo(5);
        expect(result[2]).toBeCloseTo(6);
    });

    test("武器印に水印があり、モンスターの属性に水棲が含まれているとき、与ダメージが1.5倍になること", () => {
        const attackDamage = [4, 5, 6];
        const weaponSpecialAttackRuneCount = {
            ghostSickleRuneCount: 0,
            marineSlasherRuneCount: 1,
            cyclopsKillerRuneCount: 0,
            drainBusterRuneCount: 0,
            crescentArmRuneCount: 0,
            dragonKillerRuneCount: 0,
            dragonGodSwordRuneCount: 0,
        }
        const monsterValidRuneList = ["水"];

        const result = calculateSpecialAttackWeaponDealtDamage(attackDamage, weaponSpecialAttackRuneCount, monsterValidRuneList);
        expect(result[0]).toBeCloseTo(6);
        expect(result[1]).toBeCloseTo(7);
        expect(result[2]).toBeCloseTo(9);
    });

    test("武器印に目印がなく、モンスターの属性に一ツ目が含まれているとき、与ダメージが1.5倍にならないこと", () => {
        const attackDamage = [4, 5, 6];
        const weaponSpecialAttackRuneCount = {
            ghostSickleRuneCount: 0,
            marineSlasherRuneCount: 0,
            cyclopsKillerRuneCount: 0,
            drainBusterRuneCount: 0,
            crescentArmRuneCount: 0,
            dragonKillerRuneCount: 0,
            dragonGodSwordRuneCount: 0,
        }
        const monsterValidRuneList = ["目"];

        const result = calculateSpecialAttackWeaponDealtDamage(attackDamage, weaponSpecialAttackRuneCount, monsterValidRuneList);
        expect(result[0]).toBeCloseTo(4);
        expect(result[1]).toBeCloseTo(5);
        expect(result[2]).toBeCloseTo(6);
    });

    test("武器印に目印があり、モンスターの属性に一ツ目が含まれていないとき、与ダメージが1.5倍にならないこと", () => {
        const attackDamage = [4, 5, 6];
        const weaponSpecialAttackRuneCount = {
            ghostSickleRuneCount: 0,
            marineSlasherRuneCount: 0,
            cyclopsKillerRuneCount: 1,
            drainBusterRuneCount: 0,
            crescentArmRuneCount: 0,
            dragonKillerRuneCount: 0,
            dragonGodSwordRuneCount: 0,
        }
        const monsterValidRuneList = [""];

        const result = calculateSpecialAttackWeaponDealtDamage(attackDamage, weaponSpecialAttackRuneCount, monsterValidRuneList);
        expect(result[0]).toBeCloseTo(4);
        expect(result[1]).toBeCloseTo(5);
        expect(result[2]).toBeCloseTo(6);
    });

    test("武器印に目印があり、モンスターの属性に一ツ目が含まれているとき、与ダメージが1.5倍になること", () => {
        const attackDamage = [4, 5, 6];
        const weaponSpecialAttackRuneCount = {
            ghostSickleRuneCount: 0,
            marineSlasherRuneCount: 0,
            cyclopsKillerRuneCount: 1,
            drainBusterRuneCount: 0,
            crescentArmRuneCount: 0,
            dragonKillerRuneCount: 0,
            dragonGodSwordRuneCount: 0,
        }
        const monsterValidRuneList = ["目"];

        const result = calculateSpecialAttackWeaponDealtDamage(attackDamage, weaponSpecialAttackRuneCount, monsterValidRuneList);
        expect(result[0]).toBeCloseTo(6);
        expect(result[1]).toBeCloseTo(7);
        expect(result[2]).toBeCloseTo(9);
    });

    test("武器印にド印がなく、モンスターの属性にドレインが含まれているとき、与ダメージが1.5倍にならないこと", () => {
        const attackDamage = [4, 5, 6];
        const weaponSpecialAttackRuneCount = {
            ghostSickleRuneCount: 0,
            marineSlasherRuneCount: 0,
            cyclopsKillerRuneCount: 0,
            drainBusterRuneCount: 0,
            crescentArmRuneCount: 0,
            dragonKillerRuneCount: 0,
            dragonGodSwordRuneCount: 0,
        }
        const monsterValidRuneList = ["ド"];

        const result = calculateSpecialAttackWeaponDealtDamage(attackDamage, weaponSpecialAttackRuneCount, monsterValidRuneList);
        expect(result[0]).toBeCloseTo(4);
        expect(result[1]).toBeCloseTo(5);
        expect(result[2]).toBeCloseTo(6);
    });

    test("武器印にド印があり、モンスターの属性にドレインが含まれていないとき、与ダメージが1.5倍にならないこと", () => {
        const attackDamage = [4, 5, 6];
        const weaponSpecialAttackRuneCount = {
            ghostSickleRuneCount: 0,
            marineSlasherRuneCount: 0,
            cyclopsKillerRuneCount: 0,
            drainBusterRuneCount: 1,
            crescentArmRuneCount: 0,
            dragonKillerRuneCount: 0,
            dragonGodSwordRuneCount: 0,
        }
        const monsterValidRuneList = [""];

        const result = calculateSpecialAttackWeaponDealtDamage(attackDamage, weaponSpecialAttackRuneCount, monsterValidRuneList);
        expect(result[0]).toBeCloseTo(4);
        expect(result[1]).toBeCloseTo(5);
        expect(result[2]).toBeCloseTo(6);
    });

    test("武器印にド印があり、モンスターの属性にドレインが含まれているとき、与ダメージが1.5倍になること", () => {
        const attackDamage = [4, 5, 6];
        const weaponSpecialAttackRuneCount = {
            ghostSickleRuneCount: 0,
            marineSlasherRuneCount: 0,
            cyclopsKillerRuneCount: 0,
            drainBusterRuneCount: 1,
            crescentArmRuneCount: 0,
            dragonKillerRuneCount: 0,
            dragonGodSwordRuneCount: 0,
        }
        const monsterValidRuneList = ["ド"];

        const result = calculateSpecialAttackWeaponDealtDamage(attackDamage, weaponSpecialAttackRuneCount, monsterValidRuneList);
        expect(result[0]).toBeCloseTo(6);
        expect(result[1]).toBeCloseTo(7);
        expect(result[2]).toBeCloseTo(9);
    });

    test("武器印に月印がなく、モンスターの属性に爆弾が含まれているとき、与ダメージが1.5倍にならないこと", () => {
        const attackDamage = [4, 5, 6];
        const weaponSpecialAttackRuneCount = {
            ghostSickleRuneCount: 0,
            marineSlasherRuneCount: 0,
            cyclopsKillerRuneCount: 0,
            drainBusterRuneCount: 0,
            crescentArmRuneCount: 0,
            dragonKillerRuneCount: 0,
            dragonGodSwordRuneCount: 0,
        }
        const monsterValidRuneList = ["月"];

        const result = calculateSpecialAttackWeaponDealtDamage(attackDamage, weaponSpecialAttackRuneCount, monsterValidRuneList);
        expect(result[0]).toBeCloseTo(4);
        expect(result[1]).toBeCloseTo(5);
        expect(result[2]).toBeCloseTo(6);
    });

    test("武器印に月印があり、モンスターの属性に爆弾が含まれていないとき、与ダメージが1.5倍にならないこと", () => {
        const attackDamage = [4, 5, 6];
        const weaponSpecialAttackRuneCount = {
            ghostSickleRuneCount: 0,
            marineSlasherRuneCount: 0,
            cyclopsKillerRuneCount: 0,
            drainBusterRuneCount: 0,
            crescentArmRuneCount: 1,
            dragonKillerRuneCount: 0,
            dragonGodSwordRuneCount: 0,
        }
        const monsterValidRuneList = [""];

        const result = calculateSpecialAttackWeaponDealtDamage(attackDamage, weaponSpecialAttackRuneCount, monsterValidRuneList);
        expect(result[0]).toBeCloseTo(4);
        expect(result[1]).toBeCloseTo(5);
        expect(result[2]).toBeCloseTo(6);
    });

    test("武器印に月印があり、モンスターの属性に爆弾が含まれているとき、与ダメージが1.5倍になること", () => {
        const attackDamage = [4, 5, 6];
        const weaponSpecialAttackRuneCount = {
            ghostSickleRuneCount: 0,
            marineSlasherRuneCount: 0,
            cyclopsKillerRuneCount: 0,
            drainBusterRuneCount: 0,
            crescentArmRuneCount: 1,
            dragonKillerRuneCount: 0,
            dragonGodSwordRuneCount: 0,
        }
        const monsterValidRuneList = ["月"];

        const result = calculateSpecialAttackWeaponDealtDamage(attackDamage, weaponSpecialAttackRuneCount, monsterValidRuneList);
        expect(result[0]).toBeCloseTo(6);
        expect(result[1]).toBeCloseTo(7);
        expect(result[2]).toBeCloseTo(9);
    });

    test("武器印に竜印がなく、モンスターの属性にドラゴンが含まれているとき、与ダメージが1.5倍にならないこと", () => {
        const attackDamage = [4, 5, 6];
        const weaponSpecialAttackRuneCount = {
            ghostSickleRuneCount: 0,
            marineSlasherRuneCount: 0,
            cyclopsKillerRuneCount: 0,
            drainBusterRuneCount: 0,
            crescentArmRuneCount: 0,
            dragonKillerRuneCount: 0,
            dragonGodSwordRuneCount: 0,
        }
        const monsterValidRuneList = ["竜"];

        const result = calculateSpecialAttackWeaponDealtDamage(attackDamage, weaponSpecialAttackRuneCount, monsterValidRuneList);
        expect(result[0]).toBeCloseTo(4);
        expect(result[1]).toBeCloseTo(5);
        expect(result[2]).toBeCloseTo(6);
    });

    test("武器印に竜印があり、モンスターの属性にドラゴンが含まれていないとき、与ダメージが1.5倍にならないこと", () => {
        const attackDamage = [4, 5, 6];
        const weaponSpecialAttackRuneCount = {
            ghostSickleRuneCount: 0,
            marineSlasherRuneCount: 0,
            cyclopsKillerRuneCount: 0,
            drainBusterRuneCount: 0,
            crescentArmRuneCount: 0,
            dragonKillerRuneCount: 1,
            dragonGodSwordRuneCount: 0,
        }
        const monsterValidRuneList = [""];

        const result = calculateSpecialAttackWeaponDealtDamage(attackDamage, weaponSpecialAttackRuneCount, monsterValidRuneList);
        expect(result[0]).toBeCloseTo(4);
        expect(result[1]).toBeCloseTo(5);
        expect(result[2]).toBeCloseTo(6);
    });

    test("武器印に竜印があり、モンスターの属性にドラゴンが含まれているとき、与ダメージが1.5倍になること", () => {
        const attackDamage = [4, 5, 6];
        const weaponSpecialAttackRuneCount = {
            ghostSickleRuneCount: 0,
            marineSlasherRuneCount: 0,
            cyclopsKillerRuneCount: 0,
            drainBusterRuneCount: 0,
            crescentArmRuneCount: 0,
            dragonKillerRuneCount: 1,
            dragonGodSwordRuneCount: 0,
        }
        const monsterValidRuneList = ["竜"];

        const result = calculateSpecialAttackWeaponDealtDamage(attackDamage, weaponSpecialAttackRuneCount, monsterValidRuneList);
        expect(result[0]).toBeCloseTo(6);
        expect(result[1]).toBeCloseTo(7);
        expect(result[2]).toBeCloseTo(9);
    });

    test("武器印に龍印がなく、モンスターの属性にドラゴンが含まれているとき、与ダメージが2倍にならないこと", () => {
        const attackDamage = [4, 5, 6];
        const weaponSpecialAttackRuneCount = {
            ghostSickleRuneCount: 0,
            marineSlasherRuneCount: 0,
            cyclopsKillerRuneCount: 0,
            drainBusterRuneCount: 0,
            crescentArmRuneCount: 0,
            dragonKillerRuneCount: 0,
            dragonGodSwordRuneCount: 0,
        }
        const monsterValidRuneList = ["龍"];

        const result = calculateSpecialAttackWeaponDealtDamage(attackDamage, weaponSpecialAttackRuneCount, monsterValidRuneList);
        expect(result[0]).toBeCloseTo(4);
        expect(result[1]).toBeCloseTo(5);
        expect(result[2]).toBeCloseTo(6);
    });

    test("武器印に龍印があり、モンスターの属性にドラゴンが含まれていないとき、与ダメージが2倍にならないこと", () => {
        const attackDamage = [4, 5, 6];
        const weaponSpecialAttackRuneCount = {
            ghostSickleRuneCount: 0,
            marineSlasherRuneCount: 0,
            cyclopsKillerRuneCount: 0,
            drainBusterRuneCount: 0,
            crescentArmRuneCount: 0,
            dragonKillerRuneCount: 0,
            dragonGodSwordRuneCount: 1,
        }
        const monsterValidRuneList = [""];

        const result = calculateSpecialAttackWeaponDealtDamage(attackDamage, weaponSpecialAttackRuneCount, monsterValidRuneList);
        expect(result[0]).toBeCloseTo(4);
        expect(result[1]).toBeCloseTo(5);
        expect(result[2]).toBeCloseTo(6);
    });

    test("武器印に龍印があり、モンスターの属性にドラゴンが含まれているとき、与ダメージが2倍になること", () => {
        const attackDamage = [4, 5, 6];
        const weaponSpecialAttackRuneCount = {
            ghostSickleRuneCount: 0,
            marineSlasherRuneCount: 0,
            cyclopsKillerRuneCount: 0,
            drainBusterRuneCount: 0,
            crescentArmRuneCount: 0,
            dragonKillerRuneCount: 0,
            dragonGodSwordRuneCount: 1,
        }
        const monsterValidRuneList = ["龍"];

        const result = calculateSpecialAttackWeaponDealtDamage(attackDamage, weaponSpecialAttackRuneCount, monsterValidRuneList);
        expect(result[0]).toBe(8);
        expect(result[1]).toBe(10);
        expect(result[2]).toBe(12);
    });
});

// 会心の一撃の与ダメージ計算
// calculateCriticalHitDealtDamage = (normalAttackDamage: number[]): number[]
describe("calculateCriticalHitDealtDamageTest", () => {
    // 正常系
    test("与ダメージの最小値、中間値、最大値がそれぞれ2倍になること", () => {
        const attackDamage = [4, 5, 6];
        const result = calculateCriticalHitDealtDamage(attackDamage);
        expect(result[0]).toBe(8);
        expect(result[1]).toBe(10);
        expect(result[2]).toBe(12);
    });
});

// 与ダメージの端数切り捨てテスト
// roundDownDealtDamage = (attackDamage: number[]): number[]
describe("roundDownDealtDamageTest", () => {
    // 正常系
    const attackDamage = [4.5, 5.4, 6.6];
    const result = roundDownDealtDamage(attackDamage);
    expect(result[0]).toBe(4);
    expect(result[1]).toBe(5);
    expect(result[2]).toBe(6);
});