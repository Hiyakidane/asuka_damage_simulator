import React from "react";

import {
    Stack,
    Tooltip,
    Avatar,
    Button,
} from "@mui/material";

export const EquipmentSpecialAbilityRune = (props) => {
    const { equipmentJson, addRune } = props;

    // 装備に追加可能な印(メイン)の一覧を表示する(特殊能力印)
    const displayMainSpecialAbilityRune = () => {
        const list = [];

        for (let i = 0; i < equipmentJson.length; i++) {
            if (equipmentJson[i].category === "specialAbilities" && equipmentJson[i].commonlyUsed === "main") {
                list.push(
                    <Tooltip key={i} title={equipmentJson[i].effect}>
                        <Avatar sx={{ width: 24, height: 24 }}>
                            <Button onClick={() => addRune(equipmentJson, i)}>
                                {equipmentJson[i].rune}
                            </Button>
                        </Avatar>
                    </Tooltip>
                );
            }
        }

        return list;
    }

    // 装備に追加可能な印の一覧(サブ)を表示する(特殊能力印)
    const displaySubSpecialAbilityRune = () => {
        const list = [];

        for (let i = 0; i < equipmentJson.length; i++) {
            if (equipmentJson[i].category === "specialAbilities" && equipmentJson[i].commonlyUsed === "sub") {
                list.push(
                    <Tooltip key={i} title={equipmentJson[i].effect}>
                        <Avatar sx={{ width: 24, height: 24 }}>
                            <Button onClick={() => addRune(equipmentJson, i)}>
                                {equipmentJson[i].rune}
                            </Button>
                        </Avatar>
                    </Tooltip>
                );
            }
        }

        return list;
    }

    return (
        <React.Fragment>
            特能印:
            <Stack direction="row">
                {displayMainSpecialAbilityRune()}
            </Stack>
            <Stack direction="row">
                {displaySubSpecialAbilityRune()}
            </Stack>
        </React.Fragment>
    );
};