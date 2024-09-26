import React from "react";

import {
    Stack,
    Tooltip,
    Avatar,
    Button,
} from "@mui/material";

export const EquipmentDifferentAbilityRune = (props) => {
    const { otherJson, addRune } = props;

    // 装備に追加可能な印(メイン)の一覧を表示する(異種能力印)
    const displayMainDifferentAbilityRune = () => {
        const list = [];

        for (let i = 0; i < otherJson.length; i++) {
            if (otherJson[i].commonlyUsed === "main") {
                list.push(
                    <Tooltip key={i} title={otherJson[i].effect}>
                        <Avatar sx={{ width: 24, height: 24 }}>
                            <Button onClick={() => addRune(otherJson, i)}>
                                {otherJson[i].rune}
                            </Button>
                        </Avatar>
                    </Tooltip>
                );
            }
        }

        return list;
    }

    // 装備に追加可能な印の一覧(サブ)を表示する(異種能力印)
    const displaySubDifferentAbilityRune = () => {
        const list = [];

        for (let i = 0; i < otherJson.length; i++) {
            if (otherJson[i].commonlyUsed === "sub") {
                list.push(
                    <Tooltip key={i} title={otherJson[i].effect}>
                        <Avatar sx={{ width: 24, height: 24 }}>
                            <Button onClick={() => addRune(otherJson, i)}>
                                {otherJson[i].rune}
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
            異種印:
            <Stack direction="row">
                {displayMainDifferentAbilityRune()}
            </Stack>
            <Stack direction="row">
                {displaySubDifferentAbilityRune()}
            </Stack>
        </React.Fragment>
    );
};