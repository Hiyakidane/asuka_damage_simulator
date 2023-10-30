import { MonsterCondition } from "useMonster";

// ダメージに影響を与えるステータス効果を計算
export const calculateMonsterConditionAffectsAttackPower = (monsterAttackPower: number, monsterCondition: MonsterCondition): number => {
    // イカリ
    if (monsterCondition.isAngryState) {
        monsterAttackPower = monsterAttackPower * 2;
    }

    // 錯乱(キグニ)
    if (monsterCondition.isConfusionState) {
        monsterAttackPower = monsterAttackPower * 1.5;
    }

    return monsterAttackPower;
}