import React, { useState } from "react";

import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
} from "@mui/material";
import { Box } from "@mui/system";

export const Bangle = () => {
    const bangleList = [
        { id: 1, name: "ちからの腕輪", effect: "力が3上がる" },
        { id: 2, name: "会心の腕輪", effect: "1/4の確率で会心の一撃が出るようになる" },
        { id: 3, name: "痛恨の腕輪", effect: "モンスターから受ける攻撃が痛恨の一撃になることがある" },
        { id: 4, name: "まもりの腕輪", effect: "ダメージを25%軽減する" }
    ]

    const [bangle, setBangle] = useState({ id: 0, name: "", effect: "" });

    const handleChange = (event: SelectChangeEvent) => {
        const bangleId = Number(event.target.value) - 1;
        setBangle(bangleList[bangleId]);
    }

    return (
        <Stack>
            <Box sx={{ minWidth: 150 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">腕輪</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Bangle"
                        defaultValue=""
                        onChange={handleChange}
                    >
                        {bangleList.map((row) => (
                            <MenuItem key={row.id} value={row.id}>{row.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <h1>名前:{bangle.name}</h1>
            <h1>効果:{bangle.effect}</h1>
        </Stack>
    )
};