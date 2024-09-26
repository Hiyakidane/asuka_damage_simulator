import React, { useState } from "react";

import {
    Box,
    Stack,
} from "@mui/material";
import { Character } from "../../character/components/Character";
import { Equipment } from "../../equipment/components/Equipment";
import { Monster } from "../../monster/components/Monster";
import { Result } from "../../result/components/Result";
import { CharacterStatus, SelectedMonster, SelectedShield, SelectedWeapon } from "selectedStatus";

export const Content = () => {
    const [characterStatus, setCharacterStatus] = useState<CharacterStatus>(
        {
            level: 1,
            hp: 15,
            power: 8,
            friends: 0,
            condition: {
                isAngryState: false,
                isFightState: false,
                isWildDanceState: false,
                isConfusionState: false,
            },
            bracelet: {
                isEquippedProtectBracelet1: false,
                isEquippedProtectBracelet2: false,
                isEquippedRegretBracelet: false,
            }
        }
    )

    const [selectedMonster, setSelectedMonster] = useState<SelectedMonster>(
        {
            id: 0,
            name: "",
            hp: 0,
            attackPower: 0,
            defencePower: 0,
            attributes: ["-"],
            condition: {
                isAngryState: false,
                isConfusionState: false,
            }
        }
    )

    const [selectedWeapon, setSelectedWeapon] = useState<SelectedWeapon>(
        {
            id: 0,
            name: "",
            baseRune: "",
            synthesisRunes: [],
            basicValue: 0,
            modifierValue: 0,
            isWeaponBlessingState: false
        }
    )

    const [selectedShield, setSelectedShield] = useState<SelectedShield>(
        {
            id: 0,
            name: "",
            baseRune: "",
            synthesisRunes: [],
            basicValue: 0,
            modifierValue: 0,
            isShieldBlessingState: false
        }
    )

    const changeCharacterStatus = (status: CharacterStatus) => {
        setCharacterStatus(status);
        //console.log("character");
    }

    const changeSelectedMonster = (monster: SelectedMonster) => {
        setSelectedMonster(monster);
        //console.log("monster");
    }

    const changeSelectedWeapon = (weapon: SelectedWeapon) => {
        setSelectedWeapon(weapon);
        //console.log("weapon");
    }

    const changeSelectedShield = (shield: SelectedShield) => {
        setSelectedShield(shield);
        //console.log("shield");
    }

    return (
        <Box>
            <Stack spacing={1} direction="row">
                <Box sx={{ width: 20 }}>

                </Box>

                <Box sx={{ minWidth: 400 }}>
                    <Stack>
                        <Box sx={{ height: 400 }}>
                            <Character
                                changeCharacterStatus={changeCharacterStatus}
                            />
                        </Box>
                        <Box sx={{ height: 400 }}>
                            <Monster
                                changeSelectedMonster={changeSelectedMonster}
                            />
                        </Box>
                    </Stack>
                </Box>

                <Box>
                    <Equipment
                        changeSelectedWeapon={changeSelectedWeapon}
                        changeSelectedShield={changeSelectedShield}
                    />
                </Box>

                <Box>
                    <Stack>
                        <Result
                            characterStatus={characterStatus}
                            selectedWeapon={selectedWeapon}
                            selectedShield={selectedShield}
                            selectedMonster={selectedMonster}
                        />
                    </Stack>
                </Box>
            </Stack>
        </Box>
    )
};