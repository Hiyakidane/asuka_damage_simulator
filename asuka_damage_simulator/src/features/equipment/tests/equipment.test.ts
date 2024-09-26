import weaponJson from "../../../../json/weapon/weapon.json";
import shieldJson from "../../../../json/shield/shield.json";

import { 
    Equipment, 
    ModifierValue,
    EquipmentState, 
} from "useEquipment";
import { 
    checkEquipmentSelected,
    changeEquipmentModifierValue,
    changeEquipmentState,
    increaseEquipmentRuneCount,
    decreaseEquipmentRuneCount,
    addRune,
    deleteRune,
} from "../modules/equipment";


describe("", () => {
    test("", () => {

    });
});

describe("checkEquipmentSelectedTest", () => {
    test("装備のIDが0以外のとき、修正値のエラー情報(error/helperText)が設定されないこと", () => {
        const equipmentId = 1;
        const equipmentModifierValue: ModifierValue = {
            value: "",
            error: false,
            helperText: "",
        }
        checkEquipmentSelected(equipmentId, equipmentModifierValue);
        expect(equipmentModifierValue.error).toBe(false);
        expect(equipmentModifierValue.helperText).toBe("");
    });

    test("装備のIDが0のとき、修正値のエラー情報(error/helperText)が設定されること", () => {
        const equipmentId = 0;
        const equipmentModifierValue: ModifierValue = {
            value: "",
            error: false,
            helperText: "",
        }
        checkEquipmentSelected(equipmentId, equipmentModifierValue);
        expect(equipmentModifierValue.error).toBe(true);
        expect(equipmentModifierValue.helperText).toBe("装備を選択してください。");
    });
});

describe("changeEquipmentModifierValueTest", () => {
    test("装備のIDが0のとき、修正値が設定されないこと", () => {
        const inputValue = "0";
        const equipment: Equipment = {
            id: 0,
            name: "",
            rune: "",
            basicValue: 0,
            runeCount: 0,
            effect: "",
            category: "",
            commonlyUsed: "",
            hand: ""
        }
        const equipmentModifierValue: ModifierValue = {
            value: "",
            error: false,
            helperText: "",
        }
        changeEquipmentModifierValue(inputValue, equipment, equipmentModifierValue);
        expect(equipmentModifierValue.value).toBe("");
        expect(equipmentModifierValue.error).toBe(false);
        expect(equipmentModifierValue.helperText).toBe("");
    });

    test("修正値が未入力または入力値を全削除されたとき、修正値のエラー情報(error/helperText)が設定されること", () => {
        const inputValue = "";
        const equipment: Equipment = {
            id: 1,
            name: "",
            rune: "",
            basicValue: 0,
            runeCount: 0,
            effect: "",
            category: "",
            commonlyUsed: "",
            hand: ""
        }
        const equipmentModifierValue: ModifierValue = {
            value: "",
            error: false,
            helperText: "",
        }
        changeEquipmentModifierValue(inputValue, equipment, equipmentModifierValue);
        expect(equipmentModifierValue.value).toBe("");
        expect(equipmentModifierValue.error).toBe(true);
        expect(equipmentModifierValue.helperText).toBe("数値を入力してください");
    });

    test("修正値に「+」のみが入力されたとき、修正値のエラー情報(error/helperText)が設定されないこと", () => {
        const inputValue = "+";
        const equipment: Equipment = {
            id: 1,
            name: "",
            rune: "",
            basicValue: 0,
            runeCount: 0,
            effect: "",
            category: "",
            commonlyUsed: "",
            hand: ""
        }
        const equipmentModifierValue: ModifierValue = {
            value: "",
            error: false,
            helperText: "",
        }
        changeEquipmentModifierValue(inputValue, equipment, equipmentModifierValue);
        expect(equipmentModifierValue.value).toBe("+");
        expect(equipmentModifierValue.error).toBe(false);
        expect(equipmentModifierValue.helperText).toBe("");
    });

    test("修正値に「-」のみが入力されたとき、修正値のエラー情報(error/helperText)が設定されないこと", () => {
        const inputValue = "-";
        const equipment: Equipment = {
            id: 1,
            name: "",
            rune: "",
            basicValue: 0,
            runeCount: 0,
            effect: "",
            category: "",
            commonlyUsed: "",
            hand: ""
        }
        const equipmentModifierValue: ModifierValue = {
            value: "",
            error: false,
            helperText: "",
        }
        changeEquipmentModifierValue(inputValue, equipment, equipmentModifierValue);
        expect(equipmentModifierValue.value).toBe("-");
        expect(equipmentModifierValue.error).toBe(false);
        expect(equipmentModifierValue.helperText).toBe("");
    });


    test("修正値に「+0」が入力されたとき、修正値に0が設定されること", () => {
        const inputValue = "+0";
        const equipment: Equipment = {
            id: 1,
            name: "",
            rune: "",
            basicValue: 0,
            runeCount: 0,
            effect: "",
            category: "",
            commonlyUsed: "",
            hand: ""
        }
        const equipmentModifierValue: ModifierValue = {
            value: "",
            error: false,
            helperText: "",
        }
        changeEquipmentModifierValue(inputValue, equipment, equipmentModifierValue);
        expect(equipmentModifierValue.value).toBe("0");
        expect(equipmentModifierValue.error).toBe(false);
        expect(equipmentModifierValue.helperText).toBe("");
    });

    test("修正値に「-0」が入力されたとき、修正値に0が設定されること", () => {
        const inputValue = "-0";
        const equipment: Equipment = {
            id: 1,
            name: "",
            rune: "",
            basicValue: 0,
            runeCount: 0,
            effect: "",
            category: "",
            commonlyUsed: "",
            hand: ""
        }
        const equipmentModifierValue: ModifierValue = {
            value: "",
            error: false,
            helperText: "",
        }
        changeEquipmentModifierValue(inputValue, equipment, equipmentModifierValue);
        expect(equipmentModifierValue.value).toBe("0");
        expect(equipmentModifierValue.error).toBe(false);
        expect(equipmentModifierValue.helperText).toBe("");
    });

    test("修正値に符号を含む2桁の数値が入力されたとき、修正値に入力値が設定されること", () => {
        const inputValue = "-1";
        const equipment: Equipment = {
            "id": 2,
            "name": "こんぼう",
            "rune": "-",
            "basicValue": 3,
            "runeCount": 3,
            "effect": "-",
            "category": "normal",
            "commonlyUsed": "-",
            "hand": "oneHanded"
        }
        const equipmentModifierValue: ModifierValue = {
            value: "",
            error: false,
            helperText: "",
        }
        changeEquipmentModifierValue(inputValue, equipment, equipmentModifierValue);
        expect(equipmentModifierValue.value).toBe("-1");
        expect(equipmentModifierValue.error).toBe(false);
        expect(equipmentModifierValue.helperText).toBe("");
    });

    test("修正値に2桁目が符号、1桁目に数値以外が入力されたとき、修正値のエラー情報(error/helperText)が設定されること", () => {
        const inputValue = "-a";
        const equipment: Equipment = {
            id: 1,
            name: "",
            rune: "",
            basicValue: 0,
            runeCount: 0,
            effect: "",
            category: "",
            commonlyUsed: "",
            hand: ""
        }
        const equipmentModifierValue: ModifierValue = {
            value: "",
            error: false,
            helperText: "",
        }
        changeEquipmentModifierValue(inputValue, equipment, equipmentModifierValue);
        expect(equipmentModifierValue.value).toBe("");
        expect(equipmentModifierValue.error).toBe(true);
        expect(equipmentModifierValue.helperText).toBe("数値を入力してください");
    });

    test("修正値に符号を含む3桁の数値(0以外)が入力されたとき、修正値に入力値が設定されること", () => {
        const inputValue = "-10";
        const equipment: Equipment = {
            "id": 5,
            "name": "どうたぬき",
            "rune": "-",
            "basicValue": 10,
            "runeCount": 6,
            "effect": "-",
            "category": "normal",
            "commonlyUsed": "-",
            "hand": "oneHanded"
        }
        const equipmentModifierValue: ModifierValue = {
            value: "",
            error: false,
            helperText: "",
        }
        changeEquipmentModifierValue(inputValue, equipment, equipmentModifierValue);
        expect(equipmentModifierValue.value).toBe("-10");
        expect(equipmentModifierValue.error).toBe(false);
        expect(equipmentModifierValue.helperText).toBe("");
    });

    test("修正値に3桁目が符号、2桁目が数値、1桁目に数値以外が入力されたとき、修正値のエラー情報(error/helperText)が設定されること", () => {
        const inputValue = "-1a";
        const equipment: Equipment = {
            id: 1,
            name: "",
            rune: "",
            basicValue: 0,
            runeCount: 0,
            effect: "",
            category: "",
            commonlyUsed: "",
            hand: ""
        }
        const equipmentModifierValue: ModifierValue = {
            value: "",
            error: false,
            helperText: "",
        }
        changeEquipmentModifierValue(inputValue, equipment, equipmentModifierValue);
        expect(equipmentModifierValue.value).toBe("");
        expect(equipmentModifierValue.error).toBe(true);
        expect(equipmentModifierValue.helperText).toBe("数値を入力してください。");
    });

    test("修正値に符号を含む4桁以上の数値(0以外)が入力されたとき、修正値のエラー情報(error/helperText)が設定されること", () => {
        const inputValue = "-100";
        const equipment: Equipment = {
            id: 1,
            name: "",
            rune: "",
            basicValue: 0,
            runeCount: 0,
            effect: "",
            category: "",
            commonlyUsed: "",
            hand: ""
        }
        const equipmentModifierValue: ModifierValue = {
            value: "",
            error: false,
            helperText: "",
        }
        changeEquipmentModifierValue(inputValue, equipment, equipmentModifierValue);
        expect(equipmentModifierValue.value).toBe("");
        expect(equipmentModifierValue.error).toBe(true);
        expect(equipmentModifierValue.helperText).toBe("数値は符号付きで2桁まで入力可能です。");
    });


    test("修正値に符号なし1桁の数値が入力されたとき、修正値に入力値が設定されること", () => {
        const inputValue = "1";
        const equipment: Equipment = {
            "id": 5,
            "name": "どうたぬき",
            "rune": "-",
            "basicValue": 10,
            "runeCount": 6,
            "effect": "-",
            "category": "normal",
            "commonlyUsed": "-",
            "hand": "oneHanded"
        }
        const equipmentModifierValue: ModifierValue = {
            value: "",
            error: false,
            helperText: "",
        }
        changeEquipmentModifierValue(inputValue, equipment, equipmentModifierValue);
        expect(equipmentModifierValue.value).toBe("1");
        expect(equipmentModifierValue.error).toBe(false);
        expect(equipmentModifierValue.helperText).toBe("");
    });

    test("修正値に1桁の数値以外の値が入力されたとき、修正値のエラー情報(error/helperText)が設定されること", () => {
        const inputValue = "a";
        const equipment: Equipment = {
            id: 1,
            name: "",
            rune: "",
            basicValue: 0,
            runeCount: 0,
            effect: "",
            category: "",
            commonlyUsed: "",
            hand: ""
        }
        const equipmentModifierValue: ModifierValue = {
            value: "",
            error: false,
            helperText: "",
        }
        changeEquipmentModifierValue(inputValue, equipment, equipmentModifierValue);
        expect(equipmentModifierValue.value).toBe("");
        expect(equipmentModifierValue.error).toBe(true);
        expect(equipmentModifierValue.helperText).toBe("数値を入力してください。");
    });


    test("修正値に符号なしの2桁の数値が入力されたとき、修正値が設定されること", () => {
        const inputValue = "10";
        const equipment: Equipment = {
            "id": 5,
            "name": "どうたぬき",
            "rune": "-",
            "basicValue": 10,
            "runeCount": 6,
            "effect": "-",
            "category": "normal",
            "commonlyUsed": "-",
            "hand": "oneHanded"
        }
        const equipmentModifierValue: ModifierValue = {
            value: "",
            error: false,
            helperText: "",
        }
        changeEquipmentModifierValue(inputValue, equipment, equipmentModifierValue);
        expect(equipmentModifierValue.value).toBe("10");
        expect(equipmentModifierValue.error).toBe(false);
        expect(equipmentModifierValue.helperText).toBe("");
    });

    test("修正値に符号なしの2桁目が数値、1桁目が数値以外の値が入力されたとき、修正値のエラー情報(error/helperText)が設定されること", () => {
        const inputValue = "1a";
        const equipment: Equipment = {
            id: 1,
            name: "",
            rune: "",
            basicValue: 0,
            runeCount: 0,
            effect: "",
            category: "",
            commonlyUsed: "",
            hand: ""
        }
        const equipmentModifierValue: ModifierValue = {
            value: "",
            error: false,
            helperText: "",
        }
        changeEquipmentModifierValue(inputValue, equipment, equipmentModifierValue);
        expect(equipmentModifierValue.value).toBe("");
        expect(equipmentModifierValue.error).toBe(true);
        expect(equipmentModifierValue.helperText).toBe("数値を入力してください。また、2桁目には0を入力できません。");
    });

    test("修正値に符号なしの2桁目に0、1桁目に数値が入力されたとき、修正値のエラー情報(error/helperText)が設定されること", () => {
        const inputValue = "01";
        const equipment: Equipment = {
            id: 1,
            name: "",
            rune: "",
            basicValue: 0,
            runeCount: 0,
            effect: "",
            category: "",
            commonlyUsed: "",
            hand: ""
        }
        const equipmentModifierValue: ModifierValue = {
            value: "",
            error: false,
            helperText: "",
        }
        changeEquipmentModifierValue(inputValue, equipment, equipmentModifierValue);
        expect(equipmentModifierValue.value).toBe("");
        expect(equipmentModifierValue.error).toBe(true);
        expect(equipmentModifierValue.helperText).toBe("数値を入力してください。また、2桁目には0を入力できません。");
    });

    test("修正値に符号なしの3桁の数値が入力されたとき、修正値のエラー情報(error/helperText)が設定されること", () => {
        const inputValue = "101";
        const equipment: Equipment = {
            id: 1,
            name: "",
            rune: "",
            basicValue: 0,
            runeCount: 0,
            effect: "",
            category: "",
            commonlyUsed: "",
            hand: ""
        }
        const equipmentModifierValue: ModifierValue = {
            value: "",
            error: false,
            helperText: "",
        }
        changeEquipmentModifierValue(inputValue, equipment, equipmentModifierValue);
        expect(equipmentModifierValue.value).toBe("");
        expect(equipmentModifierValue.error).toBe(true);
        expect(equipmentModifierValue.helperText).toBe("数値は符号付きで2桁まで入力可能です。");
    });

    test("修正値に選択されている武器の基本値をマイナスにした数値より下の数値が入力されたとき、修正値のエラー情報(error/helperText)が設定されること", () => {
        const inputValue = "-11";
        const equipment: Equipment = {
            "id": 5,
            "name": "どうたぬき",
            "rune": "-",
            "basicValue": 10,
            "runeCount": 6,
            "effect": "-",
            "category": "normal",
            "commonlyUsed": "-",
            "hand": "oneHanded"
        }
        const equipmentModifierValue: ModifierValue = {
            value: "",
            error: false,
            helperText: "",
        }
        changeEquipmentModifierValue(inputValue, equipment, equipmentModifierValue);
        expect(equipmentModifierValue.value).toBe("");
        expect(equipmentModifierValue.error).toBe(true);
        expect(equipmentModifierValue.helperText).toBe("修正値は装備の基本値をマイナスにした数値より下にすることができません。");
    });
});

describe("changeEquipmentStateTest", () => {
    test("装備の状態に「なし」が選択されたとき、装備が祝福状態でないこと", () => {
        const stateId = 0;
        const equipmentState: EquipmentState = {
            id: 0,
            isBlessed: false,
        }
        changeEquipmentState(stateId, equipmentState);
        expect(equipmentState.id).toBe(0);
        expect(equipmentState.isBlessed).toBe(false);
    });

    test("装備の状態に「祝福」が選択されたとき、装備が祝福状態であること", () => {
        const stateId = 1;
        const equipmentState: EquipmentState = {
            id: 0,
            isBlessed: false,
        }
        changeEquipmentState(stateId, equipmentState);
        expect(equipmentState.id).toBe(1);
        expect(equipmentState.isBlessed).toBe(true);
    });
});

describe("increaseEquipmentRuneCountTest", () => {
    test("装備が未選択(idが0)のとき、装備の印数が増加していないこと", () => {
        const equipment: Equipment = {
            id: 0,
            name: "",
            rune: "",
            basicValue: 0,
            runeCount: 0,
            effect: "",
            category: "",
            commonlyUsed: "",
            hand: ""
        }
        increaseEquipmentRuneCount(equipment);
        expect(equipment.runeCount).toBe(0);
    });

    test("装備が選択されていて、印数が16未満のとき、装備の印数が増加していること", () => {
        const equipment: Equipment = {
            "id": 5,
            "name": "どうたぬき",
            "rune": "-",
            "basicValue": 10,
            "runeCount": 6,
            "effect": "-",
            "category": "normal",
            "commonlyUsed": "-",
            "hand": "oneHanded"
        }
        increaseEquipmentRuneCount(equipment);
        expect(equipment.runeCount).toBe(7);
    });

    test("装備が選択されていて、印数が16以上のとき、装備の印数が増加しないこと", () => {
        const equipment: Equipment = {
            "id": 5,
            "name": "どうたぬき",
            "rune": "-",
            "basicValue": 10,
            "runeCount": 16,
            "effect": "-",
            "category": "normal",
            "commonlyUsed": "-",
            "hand": "oneHanded"
        }
        increaseEquipmentRuneCount(equipment);
        expect(equipment.runeCount).toBe(16);
    });
});

describe("decreaseEquipmentRuneCountTest", () => {
    test("装備が未選択(idが0)のとき、装備の印数が減少していないこと", () => {
        const equipment: Equipment = {
            id: 0,
            name: "",
            rune: "",
            basicValue: 0,
            runeCount: 0,
            effect: "",
            category: "",
            commonlyUsed: "",
            hand: ""
        }
        const weaponSynthesisRunes = [];
        decreaseEquipmentRuneCount(weaponJson, equipment, weaponSynthesisRunes);
        expect(equipment.runeCount).toBe(0);
        expect(weaponSynthesisRunes.length).toBe(0);
    });

    test("印数が装備のベースの印数以上のとき、装備の印数が減少すること", () => {
        const equipment: Equipment = {
            "id": 5,
            "name": "どうたぬき",
            "rune": "-",
            "basicValue": 10,
            "runeCount": 16,
            "effect": "-",
            "category": "normal",
            "commonlyUsed": "-",
            "hand": "oneHanded"
        }
        const weaponSynthesisRunes = [];
        decreaseEquipmentRuneCount(weaponJson, equipment, weaponSynthesisRunes);
        expect(equipment.runeCount).toBe(15);
        expect(weaponSynthesisRunes.length).toBe(0);
    });

    test("印数が装備のベースの印数未満のとき、装備の印数が減少しないこと", () => {
        const equipment: Equipment = {
            "id": 5,
            "name": "どうたぬき",
            "rune": "-",
            "basicValue": 10,
            "runeCount": 6,
            "effect": "-",
            "category": "normal",
            "commonlyUsed": "-",
            "hand": "oneHanded"
        }
        const weaponSynthesisRunes = [];
        decreaseEquipmentRuneCount(weaponJson, equipment, weaponSynthesisRunes);
        expect(equipment.runeCount).toBe(6);
        expect(weaponSynthesisRunes.length).toBe(0);
    });

    test("装備の印数全部に印が埋まっている状態で印数を減少したとき、装備の最後の印が削除されること", () => {
        const equipment: Equipment = {
            "id": 5,
            "name": "どうたぬき",
            "rune": "-",
            "basicValue": 10,
            "runeCount": 8,
            "effect": "-",
            "category": "normal",
            "commonlyUsed": "-",
            "hand": "oneHanded"
        }
        const weaponSynthesisRunes = ["弟", "弟", "弟", "弟", "弟", "弟", "弟", "薬", "弟"];
        decreaseEquipmentRuneCount(weaponJson, equipment, weaponSynthesisRunes);
        expect(equipment.runeCount).toBe(7);
        expect(weaponSynthesisRunes.length).toBe(8);
        expect(weaponSynthesisRunes[7]).toBe("薬");
    });
});

describe("addRuneTest", () => {
    test("合成印の数が装備の印数未満のとき、指定された印が装備に追加されること", () => {
        const equipment: Equipment = {
            "id": 5,
            "name": "どうたぬき",
            "rune": "-",
            "basicValue": 10,
            "runeCount": 6,
            "effect": "-",
            "category": "normal",
            "commonlyUsed": "-",
            "hand": "oneHanded"
        }
        const weaponSynthesisRunes = [];
        const equipmentId = "10";
        addRune(weaponJson, equipmentId, equipment, weaponSynthesisRunes);
        expect(weaponSynthesisRunes[0]).toBe("仏");
    });

    test("合成印の数が装備の印数以上のとき、指定された印が装備に追加されないこと", () => {
        const equipment: Equipment = {
            "id": 5,
            "name": "どうたぬき",
            "rune": "-",
            "basicValue": 10,
            "runeCount": 6,
            "effect": "-",
            "category": "normal",
            "commonlyUsed": "-",
            "hand": "oneHanded"
        }
        const weaponSynthesisRunes = ["弟", "弟", "弟", "弟", "弟", "弟"];
        const equipmentId = "10";
        addRune(weaponJson, equipmentId, equipment, weaponSynthesisRunes);
        expect(weaponSynthesisRunes.length).toBe(6);
    });
});

describe("deleteRuneTest", () => {
    test("指定された場所の装備の合成印が削除されていること", () => {
        const weaponSynthesisRunes = ["仏", "水", "目", "ド", "目", "竜"];
        const index = 0;
        deleteRune(index, weaponSynthesisRunes);
        expect(weaponSynthesisRunes[0]).toBe("水");
    });
});
