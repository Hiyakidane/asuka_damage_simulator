import React from "react";

import {
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from "@mui/material";

export const EquipmentState = (props) => {
    const { equipmentState, handleEquipmentChange } = props;

    const equipmentStateList = [
        { id: 0, name: "なし"},
        { id: 1, name: "祝福"}
    ]

    const displayEquipmentStateList = () => {
        const list = [];

        for (let i = 0; i < equipmentStateList.length; i++) {
            list.push(
                <MenuItem key={equipmentStateList[i].id} value={equipmentStateList[i].id}>{equipmentStateList[i].name}</MenuItem>
            );
        }

        return list;
    }

    return (
        <FormControl>
            <InputLabel id="select-label">状態</InputLabel>
            <Select
                sx={{ width: 80 }}
                labelId="select-label"
                id="select"
                label="equipmentState"
                value={equipmentState.id}
                onChange={handleEquipmentChange}
            >
                {displayEquipmentStateList()}
            </Select>
        </FormControl>
    );
}