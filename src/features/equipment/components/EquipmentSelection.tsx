import React from "react";

import {
    InputLabel,
    Select,
    MenuItem,
    FormControl,
} from "@mui/material";

export const EquipmentSelection = (props) => {
    const { equipment, equipmentJson, handleEquipmentChange } = props;

    // useEquipmentにまとめたいが
    // 処理順番の関係（？）でエラーになる（？）
    // 武器一覧を表示する
    const displayEquipmentList = () => {
        const list = [];

        for (let i = 0; i < equipmentJson.length; i++) {
            list.push(
                <MenuItem key={equipmentJson[i].id} value={equipmentJson[i].id}>{equipmentJson[i].name}</MenuItem>
            );
        }

        return list;
    }

    return (
        <FormControl>
            <InputLabel id="select-label">装備</InputLabel>
            <Select
                sx={{ width: 220 }}
                labelId="select-label"
                id="select"
                label="equipment"
                value={equipment.id}
                onChange={handleEquipmentChange}
            >
                {displayEquipmentList()}
            </Select>
        </FormControl>
    );
};