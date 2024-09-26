import React from "react";

import {
    Stack,
    Avatar,
    Button,
    Typography,
} from "@mui/material";

export const EquipmentSynthesisRune = (props) => {
    const { equipment, synthesisRunes, deleteRune } = props;

    // ベースの剣に合成した印を表示する
    const displaySynthsisRune = () => {
        const list = [];

        if (synthesisRunes.length === 0) {
            list.push(
                <Avatar key={0} sx={{ width: 24, height: 24 }}>
                    <Typography />
                </Avatar>
            );
        } else {
            for (let i = 0; i < synthesisRunes.length; i++) {
                list.push(
                    <Avatar key={i} sx={{ width: 24, height: 24 }}>
                        <Button onClick={() => deleteRune(i)}>
                            {synthesisRunes[i]}
                        </Button>
                    </Avatar>
                );
            }

            for (let i = synthesisRunes.length; i < equipment.runeCount; i++) {
                list.push(
                    <Avatar key={i} sx={{ width: 24, height: 24 }}>
                        <Typography />
                    </Avatar>
                );
            }
        }

        return list;
    }

    return (
        <React.Fragment>
            合成印:
            <Stack direction="row">
                {displaySynthsisRune()}
            </Stack>
        </React.Fragment>
    );
};