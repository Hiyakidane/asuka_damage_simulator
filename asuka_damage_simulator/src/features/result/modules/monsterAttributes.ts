// モンスターの属性をチェックして有効な特攻印を抽出
export const checkMonsterAttributes = (monsterAttributes: string[]): string[]  => {
    let monsterValidRuneList = [];

    // モンスターの属性をチェックして有効な特攻印を抽出する
    for (let i = 0; i < monsterAttributes.length; i++) {
        switch (monsterAttributes[i]) {
            case "ゴースト":
                monsterValidRuneList.push("仏");
                break;
            case "水棲":
                monsterValidRuneList.push("水");
                break;
            case "一ツ目":
                monsterValidRuneList.push("目");
                break;
            case "ドレイン":
                monsterValidRuneList.push("ド");
                break;
            case "爆弾":
                monsterValidRuneList.push("月");
                break;
            case "ドラゴン":
                monsterValidRuneList.push("竜");
                monsterValidRuneList.push("龍");
                break;
            default:
                break;
        }
    }

    return monsterValidRuneList;
}

// モンスターの属性をチェックして特殊な属性を抽出
export const checkMonsterSpecialAttributes = (monsterAttributes: string[]):boolean => {
    let isConvertAllDamageOneAttribute = false;

    for (let i = 0; i < monsterAttributes.length; i++) {
        switch (monsterAttributes[i]) {
            case "被ダメ1変換":
                isConvertAllDamageOneAttribute = true;
                break;
            default:
                break;
        }
    }

    return isConvertAllDamageOneAttribute;
}