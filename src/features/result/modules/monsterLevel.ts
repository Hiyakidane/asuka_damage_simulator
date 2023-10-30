import { Monster } from "useMonster";

export const calculateIncreasedStatusByMonsterLevelUp = (monster: Monster, level: number): void => {
    // 火炎入道
    if (monster.id === 144) {
        calculateInfernoDemonStatus(monster, level);
    }

    // キグニ族
    if (monster.id === 145) {
        calculateKiguniTribeStatus(monster, level);
    }

    // ンドゥバ
    if (monster.id === 146) {
        calculateNdoobaStatus(monster, level);
    }
}

// 火炎入道のレベル毎のステータスを加算
const calculateInfernoDemonStatus = (monster: Monster, level: number): void => {
    // 火炎入道0のステータス
    let baseHP = 62;
    let baseAttackPower = 28;
    let baseDefencePower = 10;
    let plusDefencePowerCount = 0;
    let tmpLevel = level;

    // レベル2毎に防御力が1→レベル3毎に防御力が1上がるという順番ではなく
    // レベル3毎に防御力が1→レベル2毎に防御力が1上がるという順番(新事実)
    while (true) {
        if (tmpLevel >= 3) {
            tmpLevel -= 3;
            ++plusDefencePowerCount;
        } else {
            break;
        }

        if (tmpLevel >= 2) {
            tmpLevel -= 2;
            ++plusDefencePowerCount;
        } else {
            break;
        }
    }

    if (level > 1) {
        baseHP += ((level - 1) * 4);
        baseAttackPower += level - 1;
    }

    monster.hp = baseHP;
    monster.attackPower = baseAttackPower;
    monster.defencePower = baseDefencePower + plusDefencePowerCount;
}

// キグニ族のレベル毎のステータスを加算
const calculateKiguniTribeStatus = (monster: Monster, level: number): void => {
    // キグニ族0のステータス
    let baseHP = 60;
    let baseAttackPower = 28;
    let baseDefencePower = 13;
    let plusDefencePowerCount = 0;
    let tmpLevel = level;

    // レベル2毎に防御力が1→レベル3毎に防御力が1上がるという繰り返しではなく
    // レベル3毎に防御力が1→レベル2毎に防御力が1上がるという繰り返し(新事実)
    while (true) {
        if (tmpLevel >= 3) {
            tmpLevel -= 3;
            ++plusDefencePowerCount;
        } else {
            break;
        }

        if (tmpLevel >= 2) {
            tmpLevel -= 2;
            ++plusDefencePowerCount;
        } else {
            break;
        }
    }

    if (level > 1) {
        baseHP += ((level - 1) * 4);
        baseAttackPower += (level - 1) * 2;
    }

    monster.hp = baseHP;
    monster.attackPower = baseAttackPower;
    monster.defencePower = baseDefencePower + plusDefencePowerCount;
}

// ンドゥバのレベル毎のステータスを加算
const calculateNdoobaStatus = (monster: Monster, level: number): void => {
    // ンドゥバのステータス
    let baseHP = 15;
    let baseAttackPower = 5;
    let baseDefencePower = 5;
    let addDefencePowerCount = 0;
    let tmpLevel = level;

    if (level > 1 && level < 70) {
        while (true) {
            if (tmpLevel >= 5) {
                tmpLevel -= 5;
                ++addDefencePowerCount;
            } else {
                break;
            }
        }

        baseHP += ((level - 1) * 3);
        baseAttackPower += level - 1;
        baseDefencePower += addDefencePowerCount;
    }

    // 70からいきなり法則が崩れる
    // 69の防御力は18…
    if (level === 70) {
        baseHP = 222;
        baseAttackPower = 74;
        baseDefencePower = 15;
    }

    // 70からレベル2上がる毎に防御が1減るはずだが何故か71からレベル2上がる毎に防御が1減っている(新事実)
    if (level > 70 && level < 95) {
        baseHP = 222;
        baseAttackPower = 74;
        baseDefencePower = 14;
        tmpLevel = level - 71;

        while (true) {
            if (tmpLevel >= 2) {
                tmpLevel -= 2;
                ++addDefencePowerCount;
            } else {
                break;
            }
        }

        baseHP -= ((level - 70) * 5) + 2;
        baseAttackPower -= (level - 70) * 2;
        baseDefencePower -= addDefencePowerCount;
    }

    // 95からHPが10ずつ減っていく(新事実)
    if (level >= 95) {
        baseHP = 90;
        baseAttackPower = 24;
        baseDefencePower = 2;
        tmpLevel = level - 95;

        while (true) {
            if (tmpLevel >= 2) {
                tmpLevel -= 2;
                ++addDefencePowerCount;
            } else {
                break;
            }
        }

        baseHP -= (level - 95) * 10;
        baseAttackPower -= (level - 95) * 2;
        baseDefencePower -= addDefencePowerCount;
    }

    monster.hp = baseHP;
    monster.attackPower = baseAttackPower;
    monster.defencePower = baseDefencePower;
}