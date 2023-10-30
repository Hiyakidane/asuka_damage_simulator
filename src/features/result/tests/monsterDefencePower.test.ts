import { MonsterCondition } from "useMonster";
import { calculateMonsterConditionAffectsDefencePower } from "../modules/monsterDefencePower";


describe("calculateMonsterConditionAffectsDefencePowerTest", () => {
	test("モンスターがキグニ状態でないとき、モンスターの防御力が0にならないこと", () => {
        const monsterDefencePower = 5;
        const monsterCondition: MonsterCondition = {
            isAngryState: false,
            isConfusionState: false,
        }
        const result = calculateMonsterConditionAffectsDefencePower(monsterDefencePower, monsterCondition);
        expect(result).toBe(5);
	});

    test("モンスターがキグニ状態のとき、モンスターの防御力が0になること", () => {
        const monsterDefencePower = 5;
        const monsterCondition: MonsterCondition = {
            isAngryState: false,
            isConfusionState: true,
        }
        const result = calculateMonsterConditionAffectsDefencePower(monsterDefencePower, monsterCondition);
        expect(result).toBe(0);
	});
});