import React, { useState } from "react";

import {
    Box,
    Stack,
} from "@mui/material";
import { Character } from "./Character";
import { Weapon } from "./Weapon";
import { Shield } from "./Shield";
import { Monster } from "./Monster";
import { Result } from "./Result";


export const Main = () => {
    const [selectedWeapon, setSelectedWeapon] = useState({});
    const [shield, setShield] = useState({ id: 0, name: "", seal: "-", attackPower: 0, seals: 0, category: "", effect: "" });

    return (
        <React.Fragment>
            <Box>
                <Stack direction="row">
                    <Box sx={{ width: 150 }}>
                        アフィアフィね
                    </Box>
                    <Box sx={{ minWidth: 400 }}>
                        <Stack spacing={1}>
                            <Character />
                            <Monster />
                        </Stack>
                    </Box>
                    <Box>
                        <Stack spacing={2}>
                            <Weapon setSelectedWeapon={setSelectedWeapon} />
                            <Shield />
                        </Stack>
                    </Box>
                    <Box>
                        <Stack>
                            <Result />
                        </Stack>
                    </Box>
                    <Box sx={{ width: 150 }}>
                        アフィアフィよ
                    </Box>
                </Stack>
            </Box>
        </React.Fragment >
    )
};