import { MonsterCondition } from "useMonster";

// ダメージに影響を与えるステータス効果を計算
export const calculateMonsterConditionAffectsDefencePower = (monsterDefencePower:number, monsterCondition: MonsterCondition): number => {
    // 錯乱(キグニ)
    if (monsterCondition.isConfusionState) {
        monsterDefencePower = 0;
    }

    return monsterDefencePower;
}