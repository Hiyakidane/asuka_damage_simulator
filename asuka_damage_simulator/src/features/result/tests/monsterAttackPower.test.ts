import { MonsterCondition } from "useMonster";
import { calculateMonsterConditionAffectsAttackPower } from "../modules/monsterAttackPower";


describe("calculateMonsterConditionAffectsAttackPowerTest", () => {
	test("モンスターの状態がデフォルトのとき、攻撃力が変わらないこと", () => {
        const monsterAttackPower = 5;
        const monsterCondition: MonsterCondition = {
            isAngryState: false,
            isConfusionState: false,
        }
        const result = calculateMonsterConditionAffectsAttackPower(monsterAttackPower, monsterCondition);
        expect(result).toBeCloseTo(5);
	});

    test("モンスターのイカリ状態のとき、モンスターの攻撃力が2倍になること", () => {
        const monsterAttackPower = 5;
        const monsterCondition: MonsterCondition = {
            isAngryState: true,
            isConfusionState: false,
        }
        const result = calculateMonsterConditionAffectsAttackPower(monsterAttackPower, monsterCondition);
        expect(result).toBeCloseTo(10);
	});

    test("モンスターのキグニ状態のとき、モンスターの攻撃力が1.5倍になること", () => {
        const monsterAttackPower = 5;
        const monsterCondition: MonsterCondition = {
            isAngryState: false,
            isConfusionState: true,
        }
        const result = calculateMonsterConditionAffectsAttackPower(monsterAttackPower, monsterCondition);
        expect(result).toBeCloseTo(7.5);
	});

    test("モンスターのイカリ状態かつキグニ状態のとき、モンスターの攻撃力が3倍になること", () => {
        const monsterAttackPower = 5;
        const monsterCondition: MonsterCondition = {
            isAngryState: true,
            isConfusionState: true,
        }
        const result = calculateMonsterConditionAffectsAttackPower(monsterAttackPower, monsterCondition);
        expect(result).toBeCloseTo(15);
	});
});