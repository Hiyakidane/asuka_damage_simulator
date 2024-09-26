import {
    Level,
    HP,
    Power,
    AsukaCondition,
    Bracelet,
    Character,
} from "useCharacter";

import { useState, useEffect, ChangeEvent } from "react";

import { SelectChangeEvent } from "@mui/material";

export const useCharacter = (changeCharacterStatus): Character => {
    // レベル
    const [levelState, setLevelState] = useState<Level>(
        {
            level: "1",
            error: false,
            helperText: ""
        }
    );

    // HP
    const [HPState, setHPState] = useState<HP>(
        {
            HP: "15",
            error: false,
            helperText: "",
        }
    );

    // ちから
    const [powerState, setPowerState] = useState<Power>(
        {
            power: "8",
            error: false,
            helperText: "",
        }
    );

    // 仲間の数
    const [friends, setFriends] = useState<number>(0);

    // 状態異常のチェック状態
    const [conditionState, setConditionState] = useState<AsukaCondition>(
        {
            isAngryState: false,
            isFightState: false,
            isWildDanceState: false,
            isConfusionState: false,
        }
    );

    // 腕輪のチェック状態
    const [braceletState, setBraceletState] = useState<Bracelet>(
        {
            isEquippedProtectBracelet1: false,
            isEquippedProtectBracelet2: false,
            isEquippedRegretBracelet: false,
        }
    )

    useEffect(() => {
        changeCharacterStatus(
            {
                level: levelState.level,
                hp: HPState.HP,
                power: powerState.power,
                friends: friends,
                condition: conditionState,
                bracelet: braceletState
            }
        );

        debugConsoleLog();
    }, [levelState, HPState, powerState, friends, conditionState, braceletState]);

    const debugConsoleLog = () => {
        let isDebug = false;
        if (isDebug) {
            console.log("levelState:" + levelState.level);
            console.log("HPState:" + HPState.HP);
            console.log("powerState:" + powerState.power);
        }
    }

    // 入力値が数値かチェック
    const isInputValueNumeric = (inputValue) => {
        const denyZeroRegex = /[1-9]/;
        const allowZeroRegex = /[0-9]/;

        if (inputValue.length === 1) {
            const firstStr = inputValue.slice(0, 1);
            if (denyZeroRegex.test(firstStr)) {
                return true;
            }
        }

        if (inputValue.length === 2) {
            const secondStr = inputValue.slice(0, 1);
            const firstStr = inputValue.slice(1, 2);
            if (denyZeroRegex.test(secondStr) && allowZeroRegex.test(firstStr)) {
                return true;
            }
        }

        if (inputValue.length === 3) {
            const thirdStr = inputValue.slice(0, 1);
            const secondStr = inputValue.slice(1, 2);
            const firstStr = inputValue.slice(2, 3);

            if (denyZeroRegex.test(thirdStr) && allowZeroRegex.test(secondStr) && allowZeroRegex.test(firstStr)) {
                return true;
            }
        }

        return false;
    }

    // レベルの値を変更
    const handleLevelChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        let targetName = event.target.name;
        let targetError = "error";
        let targetHelperText = "helperText";
        let inputValue = event.target.value;

        if (inputValue === "") {
            levelState[targetName] = inputValue;
            levelState[targetError] = false;
            levelState[targetHelperText] = "";
        }

        if (isInputValueNumeric(inputValue)) {
            levelState[targetName] = inputValue;
            levelState[targetError] = false;
            levelState[targetHelperText] = "";
        } else {
            levelState[targetError] = true;
            levelState[targetHelperText] = "数値のみ";
        }

        setLevelState((levelState) => {
            return {
                ...levelState
            }
        });
    }

    // HPの値を変更
    const handleHPChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        let targetName = event.target.name;
        let targetError = "error";
        let targetHelperText = "helperText";
        let inputValue = event.target.value;

        if (inputValue === "") {
            HPState[targetName] = inputValue;
            HPState[targetError] = false;
            HPState[targetHelperText] = "";
        }

        if (isInputValueNumeric(inputValue)) {
            HPState[targetName] = inputValue;
            HPState[targetError] = false;
            HPState[targetHelperText] = "";
        } else {
            HPState[targetError] = true;
            HPState[targetHelperText] = "数値のみ";
        }

        setHPState((HPState) => {
            return {
                ...HPState
            }
        });
    }

    // ちからの値を変更
    const handlePowerChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        let targetName = event.target.name;
        let targetError = "error";
        let targetHelperText = "helperText";
        let inputValue = event.target.value;

        if (inputValue === "") {
            powerState[targetName] = inputValue;
            powerState[targetError] = false;
            powerState[targetHelperText] = "";
        }

        if (isInputValueNumeric(inputValue)) {
            powerState[targetName] = inputValue;
            powerState[targetError] = false;
            powerState[targetHelperText] = "";
        } else {
            powerState[targetError] = true;
            powerState[targetHelperText] = "数値のみ";
        }

        setPowerState((powerState) => {
            return {
                ...powerState
            }
        });
    }

    // 仲間の数を変更する
    const handleFriendsChange = (event: SelectChangeEvent): void => {
        let friends = event.target.value;

        setFriends(Number(friends));
    }

    // ラジオボタンでちからの値を入力
    const handlePowerChangeRadioButton = (event: ChangeEvent<HTMLInputElement>): void => {
        let power = event.target.value;

        setPowerState(powerState => {
            return {
                ...powerState,
                power: power
            }
        });
    }

    // ステータスを設定する
    const handleStatusChange = (event: ChangeEvent<HTMLInputElement>): void => {
        let targetName = event.target.name;
        conditionState[targetName] = event.target.checked;
        setConditionState(conditionState => {
            return {
                ...conditionState
            }
        });
    }

    // 腕輪の装備状態を変更する
    const handleChangeBracelet = (event: ChangeEvent<HTMLInputElement>): void => {
        let targetName = event.target.name;
        braceletState[targetName] = event.target.checked;
        setBraceletState(braceletState => {
            return {
                ...braceletState
            }
        });
    }

    return [
        levelState,
        HPState,
        powerState,
        friends,
        {
            handleLevelChange,
            handleHPChange,
            handlePowerChange,
            handleFriendsChange,
            handlePowerChangeRadioButton,
            handleStatusChange,
            handleChangeBracelet
        }
    ];
}