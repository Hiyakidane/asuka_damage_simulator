import React, { ChangeEvent, useEffect, useState } from "react";

import { calculateIncreasedStatusByMonsterLevelUp } from "../../result/modules/monsterLevel";

import {
    Monster,
    MonsterType,
    MonsterCondition,
} from "useMonster";

import monsterJson from "../../../../json/monster/monster.json";

export const useMonster = (changeSelectedMonster): MonsterType => {
    const [monster, setMonster] = useState<Monster>(
        {
            id: 0,
            name: "",
            hp: 0,
            attackPower: 0,
            defencePower: 0,
            attributes: ["-"]
        }
    );

    // モンスターのレベル(火炎入道/キグニ族/ンドゥバ)
    const [level, setLevel] = useState<number>(1);

    // ステータスのチェック状態
    const [conditionState, setConditionState] = useState<MonsterCondition>(
        {
            isAngryState: false,
            isConfusionState: false
        }
    );

    useEffect(() => {
        changeSelectedMonster(
            {
                id: monster.id,
                name: monster.name,
                hp: monster.hp,
                attackPower: monster.attackPower,
                defencePower: monster.defencePower,
                attributes: monster.attributes,
                condition: conditionState
            }
        );

        debugConsoleLog();
    }, [monster, level, conditionState]);

    const debugConsoleLog = () => {
        const isDebug = false;
        if (isDebug) {
            console.log("monster.id:" + monster.id);
            console.log("monster.name:" + monster.name);
            console.log("monster.hp:" + monster.hp);
            console.log("monster.attackPower:" + monster.attackPower);
            console.log("monster.defencePower:" + monster.defencePower);
            console.log("monster.attributes:" + monster.attributes);
        }
    }

    const handleMonsterChange = (monsterId: number): void => {
        setMonster(monsterJson[monsterId]);
        let defaultLevel = 1;
        setLevel(defaultLevel);
    }

    const handleLevelChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const level = Number(event.target.value);

        calculateIncreasedStatusByMonsterLevelUp(monster, level);

        setLevel(level);
        setMonster(() => {
            return {
                ...monster
            }
        });
    }

    const handleConditionChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        let targetName = event.target.name;
        conditionState[targetName] = event.target.checked;

        setConditionState(() => {
            return {
                ...conditionState,
            }
        })
    }

    return [
        monster,
        level,
        {
            handleMonsterChange,
            handleLevelChange,
            handleConditionChange,
        }
    ];
};