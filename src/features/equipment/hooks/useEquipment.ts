import React, { useState, useEffect } from "react";

import {
    Equipment,
    ModifierValue,
    EquipmentState,
    EquipmentType,
} from "useEquipment";

import {
    SelectChangeEvent,
} from "@mui/material";

import {
    changeEquipmentModifierValue,
    checkEquipmentSelected,
    increaseEquipmentRuneCount,
    decreaseEquipmentRuneCount,
    addRune,
    checkShieldSpecialSynthesisRune,
    checkWeaponSpecialSynthesisRune,
    deleteRune,
    changeEquipmentState
} from "../modules/equipment";

import weaponJson from "../../../../json/weapon/weapon.json";
import shieldJson from "../../../../json/shield/shield.json";

export const useEquipment = (changeSelectedWeapon, changeSelectedShield): EquipmentType => {
    // 武器
    const [weapon, setWeapon] = useState<Equipment>(
        {
            id: 0,
            name: "装備なし",
            rune: "-",
            basicValue: 0,
            runeCount: 0,
            effect: "-",
            category: "",
            commonlyUsed: "-",
            hand: ""
        }
    );

    // 盾
    const [shield, setShield] = useState<Equipment>(
        {
            id: 0,
            name: "装備なし",
            rune: "-",
            basicValue: 0,
            runeCount: 0,
            effect: "-",
            category: "",
            commonlyUsed: "-",
            hand: ""
        }
    );

    // 武器の修正値
    const [weaponModifierValue, setWeaponModifierValue] = useState<ModifierValue>(
        {
            value: "",
            error: false,
            helperText: ""
        }
    );

    // 盾の修正値
    const [shieldModifierValue, setShieldModifierValue] = useState<ModifierValue>(
        {
            value: "",
            error: false,
            helperText: ""
        }
    );

    // 武器の合成印
    const [weaponSynthesisRunes, setWeaponSynthesisRunes] = useState<string[]>([]);

    // 盾の合成印
    const [shieldSynthesisRunes, setShieldSynthesisRunes] = useState<string[]>([]);

    // 武器の状態[なし,祝福]
    const [weaponState, setWeaponState] = useState<EquipmentState>(
        {
            id: 0,
            isBlessed: false
        }
    );

    // 盾の状態[なし,祝福]
    const [shieldState, setShieldState] = useState<EquipmentState>(
        {
            id: 0,
            isBlessed: false
        }
    );

    useEffect(() => {
        changeSelectedWeapon(
            {
                id: weapon.id,
                name: weapon.name,
                baseRune: weapon.rune,
                synthesisRunes: weaponSynthesisRunes,
                basicValue: weapon.basicValue,
                modifierValue: weaponModifierValue.value,
                isWeaponBlessed: weaponState.isBlessed
            }
        );

        changeSelectedShield(
            {
                id: shield.id,
                name: shield.name,
                baseRune: shield.rune,
                synthesisRunes: shieldSynthesisRunes,
                basicValue: shield.basicValue,
                modifierValue: shieldModifierValue.value,
                isShieldBlessed: shieldState.isBlessed
            }
        );

        debugConsoleLog();
    }, [weapon, weaponModifierValue, weaponSynthesisRunes, shield, shieldModifierValue, shieldSynthesisRunes]);

    const debugConsoleLog = () => {
        let isDebug = false;
        if (isDebug) {
            console.log("weapon.id:" + weapon.id);
            console.log("weapon.name:" + weapon.name);
            console.log("weapon.baseRune:" + weapon.rune);
            console.log("weaponSynthesisRunes:" + weaponSynthesisRunes);

            console.log("shield.id:" + shield.id);
            console.log("shield.name:" + shield.name);
            console.log("shield.baseRune:" + shield.rune);
            console.log("shieldSynthesisRunes:" + shieldSynthesisRunes);
        }
    }

    // 武器を変更する
    const handleWeaponChange = (event: SelectChangeEvent): void => {
        const equipmentId = Number(event.target.value);
        changeWeaponByEquipmentId(equipmentId);
    }

    const changeWeaponByEquipmentId = (equipmentId: number): void => {
        // 両手持ち武器の場合は盾を外す
        if (weaponJson[equipmentId].hand === "twoHanded") {
            setShield(shieldJson[0]);
            setShieldModifierValue(() => {
                return {
                    value: "",
                    error: false,
                    helperText: ""
                }
            })
            setShieldSynthesisRunes([]);
        }

        // 武器の変更
        // 直接weaponJsonをセットするとweaponJsonの参照が設定される
        let equipmentData = {...weaponJson[equipmentId]};

        setWeapon(equipmentData);

        // 修正値のリセット
        setWeaponModifierValue(() => {
            return {
                value: "",
                error: false,
                helperText: ""
            }
        });

        // 合成印のリセット
        setWeaponSynthesisRunes([]);

        // 祝福状態のリセット
        setWeaponState(() => {
            return {
                id: 0,
                isBlessed: false
            }
        });
    }

    // 盾を変更する
    const handleShieldChange = (event: SelectChangeEvent): void => {
        const equipmentId = Number(event.target.value);
        changeShieldByEquipmentId(equipmentId);
    }

    const changeShieldByEquipmentId = (equipmentId: number): void => {
        // 両手持ち盾の場合は武器を外す
        if (shieldJson[equipmentId].hand === "twoHanded") {
            setWeapon(weaponJson[0]);
            setWeaponModifierValue(() => {
                return {
                    value: "",
                    error: false,
                    helperText: ""
                }
            })
            setWeaponSynthesisRunes([]);
        }

        // 盾の変更
        // 直接shieldJsonをセットするとshieldJsonの参照が設定される
        let equipmentData = {...shieldJson[equipmentId]};

        setShield(equipmentData);

        // 修正値のリセット
        setShieldModifierValue(() => {
            return {
                value: "",
                error: false,
                helperText: ""
            }
        });

        // 合成印のリセット
        setShieldSynthesisRunes([]);

        // 祝福状態のリセット
        setShieldState(() => {
            return {
                id: 0,
                isBlessed: false
            }
        });
    }

    // 武器が選択されているかチェック
    const handleCheckWeaponSelected = () => {
        checkEquipmentSelected(weapon.id, weaponModifierValue);

        setWeaponModifierValue(() => {
            return {
                ...weaponModifierValue
            }
        });
    }

    // 盾が選択されているかチェック
    const handleCheckShieldSelected = () => {
        checkEquipmentSelected(shield.id, shieldModifierValue);

        setShieldModifierValue(() => {
            return {
                ...shieldModifierValue
            }
        });
    }

    // 武器の修正値変更
    const handleWeaponModifierValueChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const inputValue = event.target.value;

        changeEquipmentModifierValue(inputValue, weapon, weaponModifierValue);

        setWeaponModifierValue(() => {
            return {
                ...weaponModifierValue
            }
        })
    }

    // 盾の修正値変更
    const handleShieldModifierValueChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const inputValue = event.target.value;

        changeEquipmentModifierValue(inputValue, shield, shieldModifierValue);

        setShieldModifierValue(() => {
            return {
                ...shieldModifierValue
            }
        });
    }

    // 武器の状態を変更する
    const handleWeaponStateChange = (event: SelectChangeEvent): void => {
        const stateId = Number(event.target.value);

        changeEquipmentState(stateId, weaponState);

        setWeaponState(() => {
            return {
                ...weaponState
            }
        });
    }

    // 盾の状態を変更する
    const handleShieldStateChange = (event: SelectChangeEvent): void => {
        const stateId = Number(event.target.value);

        changeEquipmentState(stateId, shieldState);

        setShieldState(() => {
            return {
                ...shieldState
            }
        });
    }

    // 武器の印数を増加する
    const handleWeaponRuneCountIncrease = (): void => {
        increaseEquipmentRuneCount(weapon);
  
        setWeapon(() => {
            return {
                ...weapon,
                runeCount: weapon.runeCount
            }
        })
    }

    // 武器の印数を減少する
    const handleWeaponRuneCountDecrease = (): void => {
        decreaseEquipmentRuneCount(weaponJson, weapon, weaponSynthesisRunes);
        setWeapon(() => {
            return {
                ...weapon,
                runeCount: weapon.runeCount
            }
        })
    }

    // 盾の印数を増加する
    const handleShieldRuneCountIncrease = (): void => {
        increaseEquipmentRuneCount(shield);
        setShield(() => {
            return {
                ...shield,
                runeCount: shield.runeCount
            }
        })
    }

    // 盾の印数を減少する
    const handleShieldRuneCountDecrease = (): void => {
        decreaseEquipmentRuneCount(shieldJson, shield, shieldSynthesisRunes);
        setShield(() => {
            return {
                ...shield,
                runeCount: shield.runeCount
            }
        })
    }

    // 武器に印を追加する
    const addWeaponRune = (json: object, id: string): void => {
        addRune(json, id, weapon, weaponSynthesisRunes);
        setWeaponSynthesisRunes([...weaponSynthesisRunes]);

        let equipmentId = checkWeaponSpecialSynthesisRune(weapon.id, weapon.name, weaponSynthesisRunes);
        if (equipmentId !== weapon.id) {
            changeWeaponByEquipmentId(equipmentId);
        }
    }

    // 武器に追加された印を削除する
    const deleteWeaponRune = (index: number): void => {
        deleteRune(index, weaponSynthesisRunes);
        setWeaponSynthesisRunes([...weaponSynthesisRunes]);
    }

    // 盾に印を追加する
    const addShieldRune = (json: object, id: string): void => {
        addRune(json, id, shield, shieldSynthesisRunes);
        setShieldSynthesisRunes([...shieldSynthesisRunes]);

        let equipmentId = checkShieldSpecialSynthesisRune(shield.id, shield.name, shieldSynthesisRunes);
        if (equipmentId !== shield.id) {
            changeShieldByEquipmentId(equipmentId);
        }
    }

    // 盾に追加された印を削除する
    const deleteShieldRune = (index: number): void => {
        deleteRune(index, shieldSynthesisRunes);
        setShieldSynthesisRunes([...shieldSynthesisRunes]);
    }

    return [
        weapon,
        weaponModifierValue,
        weaponSynthesisRunes,
        weaponState,
        shield,
        shieldModifierValue,
        shieldSynthesisRunes,
        shieldState,
        {
            handleWeaponChange,
            handleShieldChange,
            handleCheckWeaponSelected,
            handleCheckShieldSelected,
            handleWeaponModifierValueChange,
            handleShieldModifierValueChange,
            handleWeaponStateChange,
            handleShieldStateChange,
            handleWeaponRuneCountIncrease,
            handleWeaponRuneCountDecrease,
            handleShieldRuneCountIncrease,
            handleShieldRuneCountDecrease,
            addWeaponRune,
            deleteWeaponRune,
            addShieldRune,
            deleteShieldRune,
        }
    ];
}