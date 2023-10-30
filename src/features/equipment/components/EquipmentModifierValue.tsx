import React from "react";

import {
    TextField,
} from "@mui/material";

export const EquipmentModifierValue = (props) => {
    const { modifierValue, handleCheckSelectedEquipment, handleModifierValueChange } = props;

    return (
        <TextField
            sx={{ width: 80 }}
            value={modifierValue.value}
            error={modifierValue.error}
            label="修正値"
            variant="outlined"
            onFocus={() => handleCheckSelectedEquipment()}
            onChange={(e) => handleModifierValueChange(e)}
            onBlur={(e) => handleModifierValueChange(e)}
        >
        </TextField>
    );
};