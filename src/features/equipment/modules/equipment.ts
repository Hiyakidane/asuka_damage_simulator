import {
    Equipment,
    ModifierValue,
    EquipmentState,
} from "useEquipment";

// 装備が選択されているかチェック
export const checkEquipmentSelected = (equipmentId: number, equipmentModifierValue: ModifierValue): void => {
    // 装備が未選択
    if (equipmentId === 0) {
        equipmentModifierValue.error = true;
        equipmentModifierValue.helperText = "装備を選択してください。";
    }
}

// 装備の修正値変更
export const changeEquipmentModifierValue = (inputValue: string, equipment: Equipment, equipmentModifierValue: ModifierValue): void => {
    // 演算子チェック
    const existsSign = (value: string) => {
        const operator = value.slice(0, 1);
        if (operator === "+" || operator === "-") {
            return true;
        }
        return false;
    }

    if (equipment.id === 0) {
        return;
    }

    // 削除時処理
    if (inputValue === "") {
        equipmentModifierValue.value = "";
        equipmentModifierValue.error = true;
        equipmentModifierValue.helperText = "数値を入力してください";
        return;
    }

    // +-のみはスルー
    if (existsSign(inputValue) && inputValue.length === 1) {
        equipmentModifierValue.value = inputValue;
        equipmentModifierValue.error = false;
        equipmentModifierValue.helperText = "";
        return;
    }

    // +-0は0に
    if (existsSign(inputValue)) {
        const firstStr = inputValue.slice(1, 2);
        if (firstStr === "0") {
            equipmentModifierValue.value = "0";
            return;
        }
    }

    const denyZeroRegex = /[1-9]/;
    const allowZeroRegex = /[0-9]/;

    if (existsSign(inputValue)) {
        if (inputValue.length === 2) {
            const firstStr = inputValue.slice(1, 2);

            if (!allowZeroRegex.test(firstStr)) {
                equipmentModifierValue.error = true;
                equipmentModifierValue.helperText = "数値を入力してください";
                return;
            }
        }

        if (inputValue.length === 3) {
            const secondStr = inputValue.slice(1, 2);
            const firstStr = inputValue.slice(2, 3);

            if (!denyZeroRegex.test(secondStr) || !allowZeroRegex.test(firstStr)) {
                equipmentModifierValue.error = true;
                equipmentModifierValue.helperText = "数値を入力してください。";
                return;
            }
        }

        if (inputValue.length > 3) {
            equipmentModifierValue.error = true;
            equipmentModifierValue.helperText = "数値は符号付きで2桁まで入力可能です。";
            return;
        }
    } else {
        if (inputValue.length === 1) {
            const firstStr = inputValue.slice(0, 1);
            if (!allowZeroRegex.test(firstStr)) {
                equipmentModifierValue.error = true;
                equipmentModifierValue.helperText = "数値を入力してください。";
                return;
            }
        }

        if (inputValue.length === 2) {
            const secondStr = inputValue.slice(0, 1);
            const firstStr = inputValue.slice(1, 2);
            if (!denyZeroRegex.test(secondStr) || !allowZeroRegex.test(firstStr)) {
                equipmentModifierValue.error = true;
                equipmentModifierValue.helperText = "数値を入力してください。また、2桁目には0を入力できません。";
                return;
            }
        }

        if (inputValue.length > 2) {
            equipmentModifierValue.error = true;
            equipmentModifierValue.helperText = "数値は符号付きで2桁まで入力可能です。";
            return;
        }
    }

    // 修正値を基本値以上にマイナスに出来ない処理
    const numericInputValue = Number(inputValue);
    if (numericInputValue < -equipment.basicValue) {
        equipmentModifierValue.error = true;
        equipmentModifierValue.helperText = "修正値は装備の基本値をマイナスにした数値より下にすることができません。";
        return;
    }

    equipmentModifierValue.value = inputValue;
    equipmentModifierValue.error = false;
    equipmentModifierValue.helperText = "";
}

// 装備の状態を変更する
export const changeEquipmentState = (stateId: number, equipmentState: EquipmentState): void => {
    equipmentState.id = stateId;

    if (stateId === 1) {
        equipmentState.isBlessed = true;
    } else {
        equipmentState.isBlessed = false;
    }
}

// 装備の印数を増加する
export const increaseEquipmentRuneCount = (equipment: Equipment): void => {
    if (equipment.id === 0) {
        return;
    }

    // 装備に付与可能な印数は16個まで
    if (equipment.runeCount < 16) {
        equipment.runeCount += 1;
    }
}

// 装備の印数を減少する
export const decreaseEquipmentRuneCount = (equipmentJson: object, equipment: Equipment, equipmentSynthesisRunes: string[]): void => {
    if (equipment.id === 0) {
        return;
    }

    // 装備のベース印数未満に下げられない
    if (equipment.runeCount > equipmentJson[equipment.id].runeCount) {
        equipment.runeCount -= 1;
        equipmentSynthesisRunes.pop();
    }
}

// 装備に印を追加する
export const addRune = (equipmentJson: object, equipmentId: string, equipment: Equipment, equipmentSynthesisRunes: string[]): void => {
    if (equipment.runeCount > equipmentSynthesisRunes.length) {
        equipmentSynthesisRunes.push(equipmentJson[equipmentId].rune);
    }
}

// 装備に追加された印を削除する
export const deleteRune = (index: number, equipmentSynthesisRunes: string[]): void => {
    for (let i = 0; i < equipmentSynthesisRunes.length; i++) {
        if (index === i) {
            equipmentSynthesisRunes.splice(index, 1);
        }
    }
}

// 特殊合成装備の条件が揃ったら状態をリセットして出来上がった装備を選択する
export const checkWeaponSpecialSynthesisRune = (equipmentId: number, equipmentName: string, weaponSynthesisRunes: string[]): number => {
    let weaponRuneLength = 0;

    // 回復の剣
    let healingSwordRunes = ["薬", "弟", "命"];
    let healingSwordRunesLength = healingSwordRunes.length;
    while (healingSwordRunes.length > 0) {
        let targetRune = healingSwordRunes.shift();
        for (let j = 0; j < weaponSynthesisRunes.length; j++) {
            if (targetRune === weaponSynthesisRunes[j]) {
                weaponRuneLength++;
                break;
            }
        }
    }

    if (weaponRuneLength === healingSwordRunesLength) {
        equipmentId = 28;
    } else {
        weaponRuneLength = 0;
    }

    // 秘剣カブラステギ
    let secretSwordKaburasutegiRunes = ["仏", "水", "目", "月", "竜", "回", "捨", "木"];
    let secretSwordKaburasutegiRunesLength = secretSwordKaburasutegiRunes.length;
    if (equipmentName === "剛剣マンジカブラ") {
        while (secretSwordKaburasutegiRunes.length > 0) {
            let targetRune = secretSwordKaburasutegiRunes.shift();
            for (let j = 0; j < weaponSynthesisRunes.length; j++) {
                if (targetRune === weaponSynthesisRunes[j]) {
                    weaponRuneLength++;
                    break;
                }
            }
        }

        if (weaponRuneLength === secretSwordKaburasutegiRunesLength) {
            equipmentId = 9;
        } else {
            weaponRuneLength = 0;
        }
    }

    // 龍神剣
    let dragonGodSwordRunes = ["竜", "竜", "竜"];
    if (equipmentName === "ドラゴンキラー") {
        weaponRuneLength = weaponSynthesisRunes.filter((rune) => dragonGodSwordRunes.includes(rune)).length;

        if (weaponRuneLength === dragonGodSwordRunes.length) {
            equipmentId = 16;
        } else {
            weaponRuneLength = 0;
        }
    }

    // サトリのつるはし
    let wonderPickaxeRunes = ["堀", "堀", "堀", "堀", "堀"];
    if (equipmentName === "つるはし") {
        weaponRuneLength = weaponSynthesisRunes.filter((rune) => wonderPickaxeRunes.includes(rune)).length;

        if (weaponRuneLength === wonderPickaxeRunes.length) {
            equipmentId = 31;
        } else {
            weaponRuneLength = 0;
        }
    }

    return equipmentId;
}

// 特殊合成装備の条件が揃ったら状態をリセットして出来上がった装備を選択する
export const checkShieldSpecialSynthesisRune = (equipmentId: number, equipmentName: string, shieldSynthesisRunes: string[]): number => {
    let shieldRuneLength = 0;

    // ラセン風魔の盾
    let rasenFumaShieldRunes = ["金", "山", "識", "眠", "う", "見", "飯", "身"];
    let rasenFumaShiledRunesLength = rasenFumaShieldRunes.length;
    if (equipmentName === "風魔の盾") {
        while (rasenFumaShieldRunes.length > 0) {
            let targetRune = rasenFumaShieldRunes.shift();
            for (let j = 0; j < shieldSynthesisRunes.length; j++) {
                if (targetRune === shieldSynthesisRunes[j]) {
                    shieldRuneLength++;
                    break;
                }
            }
        }

        if (shieldRuneLength === rasenFumaShiledRunesLength) {
            equipmentId = 8;
        }
    }

    // サトリの盾
    let enlightenmentShieldRunes = ["重", "重", "重"];
    if (equipmentName === "重装の盾") {
        shieldRuneLength = shieldSynthesisRunes.filter((rune) => enlightenmentShieldRunes.includes(rune)).length;
        if (shieldRuneLength === enlightenmentShieldRunes.length) {
            equipmentId = 9;
        }
    }

    return equipmentId;
}