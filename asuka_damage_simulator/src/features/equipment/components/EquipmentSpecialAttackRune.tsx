import React from "react";

import {
    Stack,
    Tooltip,
    Avatar,
    Button,
} from "@mui/material";

export const EquipmentSpecialAttackRune = (props) => {
    const { equipmentJson, addRune } = props;

    // 装備に追加可能な印の一覧を表示する(特殊能力印)
    const displaySpecialAbilityRune = () => {
        const list = [];

        for (let i = 0; i < equipmentJson.length; i++) {
            // 特攻印
            if (equipmentJson[i].category === "specialAttack") {
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
            特攻印:
            <Stack direction="row">
                {displaySpecialAbilityRune()}
            </Stack>
        </React.Fragment>
    );
};