import {
    checkDifferentAbilityShieldRuneCount,
    checkDifferentAbilityWeaponRuneCount,
    checkFestivalRune,
    checkFrontWarriorRune,
    checkHealingSwordRune,
    checkSpecialAbilityWeaponRuneCount,
    checkSpecialAttackWeaponRuneCount,
} from "../modules/equipmentRune";


describe("checkHealingSwordRuneTest", () => {
    test("武器に回印が入ってないとき、falseが返ること", () => {
        const weaponRune = [];
        const result = checkHealingSwordRune(weaponRune);
        expect(result).toBe(false);
    });

    test("武器に回印が入っているとき、trueが返ること", () => {
        const weaponRune = ["回"];
        const result = checkHealingSwordRune(weaponRune);
        expect(result).toBe(true);
    });
});

describe("checkSpecialAttackWeaponRuneCountTest", () => {
    test("武器に特攻能力印[仏水目ド月竜龍]が入っていないとき、それぞれの印の数が0個であること", () => {
        const weaponRune = [];
        const result = checkSpecialAttackWeaponRuneCount(weaponRune);
        expect(result.ghostSickleRuneCount).toBe(0);
        expect(result.marineSlasherRuneCount).toBe(0);
        expect(result.cyclopsKillerRuneCount).toBe(0);
        expect(result.drainBusterRuneCount).toBe(0);
        expect(result.crescentArmRuneCount).toBe(0);
        expect(result.dragonKillerRuneCount).toBe(0);
        expect(result.dragonGodSwordRuneCount).toBe(0);
    });

    test("武器に特攻能力印[仏水目ド月竜龍]がそれぞれ1個ずつ入っているとき、それぞれの印の数が1個であること", () => {
        const weaponRune = ["仏", "水", "目", "ド", "月", "竜", "龍"];
        const result = checkSpecialAttackWeaponRuneCount(weaponRune);
        expect(result.ghostSickleRuneCount).toBe(1);
        expect(result.marineSlasherRuneCount).toBe(1);
        expect(result.cyclopsKillerRuneCount).toBe(1);
        expect(result.drainBusterRuneCount).toBe(1);
        expect(result.crescentArmRuneCount).toBe(1);
        expect(result.dragonKillerRuneCount).toBe(1);
        expect(result.dragonGodSwordRuneCount).toBe(1);
    });

    test("武器に仏印が17個入っているとき、仏印の数が17であること", () => {
        const weaponRune = new Array(17).fill("仏");
        const result = checkSpecialAttackWeaponRuneCount(weaponRune);
        expect(result.ghostSickleRuneCount).toBe(17);
    });
});

describe("checkSpecialAbilityWeaponRuneCountTest", () => {
    test("武器に扇印が入っていないとき、扇印の数が0個であること", () => {
        const weaponRune = [];
        const result = checkSpecialAbilityWeaponRuneCount(weaponRune);
        expect(result.ironFanRuneCount).toBe(0);
    });

    test("武器に扇印が1個入っているとき、扇印の数が1個であること", () => {
        const weaponRune = ["扇"];
        const result = checkSpecialAbilityWeaponRuneCount(weaponRune);
        expect(result.ironFanRuneCount).toBe(1);
    });

    test("武器に扇印が17個入っているとき、扇印の数が17個であること", () => {
        const weaponRune = new Array(17).fill("扇");
        const result = checkSpecialAbilityWeaponRuneCount(weaponRune);
        expect(result.ironFanRuneCount).toBe(17);
    });
});

describe("checkDifferentAbilityWeaponRuneCountTest", () => {
    test("武器に異種能力印[ち不薬弟]が入っていないとき、それぞれの印の数が0個であること", () => {
        const weaponRune = [];
        const result = checkDifferentAbilityWeaponRuneCount(weaponRune);
        expect(result.strengthGrassRuneCount).toBe(0);
        expect(result.unluckyGrassRuneCount).toBe(0);
        expect(result.herbRuneCount).toBe(0);
        expect(result.otogirisoRuneCount).toBe(0);
    });

    test("武器に異種能力印[ち不薬弟]がそれぞれ1個ずつ入っているとき、それぞれの印の数が1個であること", () => {
        const weaponRune = ["ち", "不", "薬", "弟"];
        const result = checkDifferentAbilityWeaponRuneCount(weaponRune);
        expect(result.strengthGrassRuneCount).toBe(1);
        expect(result.unluckyGrassRuneCount).toBe(1);
        expect(result.herbRuneCount).toBe(1);
        expect(result.otogirisoRuneCount).toBe(1);
    });

    test("武器にち印が16個入っているとき、ち印の数が16個であること", () => {
        const weaponRune = new Array(16).fill("ち");
        const result = checkDifferentAbilityWeaponRuneCount(weaponRune);
        expect(result.strengthGrassRuneCount).toBe(16);
    });
});

describe("checkFestivalRuneTest", () => {
    test("盾に祭印が入っていないとき、falseが返ること", () => {
        const shieldRune = [];
        const result = checkFestivalRune(shieldRune);
        expect(result).toBe(false);
    });

    test("盾に祭印が入っているとき、trueが返ること", () => {
        const shieldRune = ["祭"];
        const result = checkFestivalRune(shieldRune);
        expect(result).toBe(true);
    });
});

describe("checkFrontWarriorRuneTest", () => {
    test("盾に正印が入っていないとき、falseが返ること", () => {
        const shieldRune = [];
        const result = checkFrontWarriorRune(shieldRune);
        expect(result).toBe(false);
    });

    test("盾に正印が入っているとき、trueが返ること", () => {
        const shieldRune = ["正"];
        const result = checkFrontWarriorRune(shieldRune);
        expect(result).toBe(true);
    });
});

describe("checkDifferentAbilityShieldRuneCountTest", () => {
    test("盾に異種能力印[命不薬弟]が入っていないとき、それぞれの印の数が0個であること", () => {
        const shieldRune = [];
        const result = checkDifferentAbilityShieldRuneCount(shieldRune);
        expect(result.lifeGrassRuneCount).toBe(0);
        expect(result.unluckyGrassRuneCount).toBe(0);
        expect(result.herbRuneCount).toBe(0);
        expect(result.otogirisoRuneCount).toBe(0);
    });

    test("盾に異種能力印[命不薬弟]がそれぞれ1個ずつ入っているとき、それぞれの印の数が1個であること", () => {
        const shieldRune = ["命", "不", "薬", "弟"];
        const result = checkDifferentAbilityShieldRuneCount(shieldRune);
        expect(result.lifeGrassRuneCount).toBe(1);
        expect(result.unluckyGrassRuneCount).toBe(1);
        expect(result.herbRuneCount).toBe(1);
        expect(result.otogirisoRuneCount).toBe(1);
    });

    test("盾に命印が16個入っているとき、命印の数が16個であること", () => {
        const shieldRune = new Array(16).fill("命");
        const result = checkDifferentAbilityShieldRuneCount(shieldRune);
        expect(result.lifeGrassRuneCount).toBe(16);
    });
});