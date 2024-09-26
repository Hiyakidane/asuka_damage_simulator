import React from "react";

import {
    Stack,
    Button,
} from "@mui/material";

export const EquipmentData = (props) => {
    const { equipment, modifierValue, handleRuneCountIncrease, handleRuneCountDecrease } = props;

    // 装備名の横の+表示
    const displayOperator = () => {
        const list = [];

        if (modifierValue.value === "") {
            return;
        }

        if (Number(modifierValue.value) >= 0) {
            list.push("+");
        }

        return list;
    }

    return (
        <Stack>
            <Stack spacing={2} direction="row">
                <div>名前:{equipment.name}{displayOperator()}{modifierValue.value}</div>
            </Stack>
            <Stack>
                <div>基本値:{equipment.basicValue}</div>
            </Stack>
            <Stack spacing={4} direction="row">
                <div>印:{equipment.rune}</div>
                <div>印数:{equipment.runeCount}</div>
                <Button size="small" sx={{ padding: 0, paddingTop: 0.5 }} onClick={() => handleRuneCountIncrease()}>印数増加</Button>
                <Button size="small" sx={{ padding: 0, paddingTop: 0.5 }} onClick={() => handleRuneCountDecrease()}>印数減少</Button>
            </Stack>
        </Stack>
    );
};