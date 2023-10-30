import React from "react";

import {
    Box,
    Stack,
    Typography,
} from "@mui/material";

import { EquipmentSelection } from "./EquipmentSelection";
import { EquipmentModifierValue } from "./EquipmentModifierValue";
import { EquipmentState } from "./EquipmentState";
import { EquipmentData } from "./EquipmentData";
import { EquipmentSynthesisRune } from "./EquipmentSynthesisRune";
import { EquipmentSpecialAttackRune } from "./EquipmentSpecialAttackRune";
import { EquipmentSpecialAbilityRune } from "./EquipmentSpecialAbilityRune";
import { EquipmentDifferentAbilityRune } from "./EquipmentDifferentAbilityRune";

// custom hooks
import { useEquipment } from "../hooks/useEquipment";

// loading files
import weaponJson from "../../../../json/weapon/weapon.json";
import weaponOtherJson from "../../../../json/weapon/other.json";
import shieldJson from "../../../../json/shield/shield.json";
import shieldOtherJson from "../../../../json/shield/other.json";

export const Equipment = (props) => {
    const { changeSelectedWeapon, changeSelectedShield } = props;

    const [
        weapon,
        weaponModifierValue,
        weaponSynthesisRunes,
        weaponState,
        shield,
        shieldModifierValue,
        shieldSynthesisRunes,
        shieldState,
        {
            handleWeaponChange,
            handleShieldChange,
            handleCheckWeaponSelected,
            handleCheckShieldSelected,
            handleWeaponModifierValueChange,
            handleShieldModifierValueChange,
            handleWeaponStateChange,
            handleShieldStateChange,
            handleWeaponRuneCountIncrease,
            handleWeaponRuneCountDecrease,
            handleShieldRuneCountIncrease,
            handleShieldRuneCountDecrease,
            addWeaponRune,
            deleteWeaponRune,
            addShieldRune,
            deleteShieldRune,
        }
    ] = useEquipment(
        changeSelectedWeapon,
        changeSelectedShield,
    );

    return (
        <Stack>
            <Box sx={{ minWidth: 400, minHeight: 400 }}>
                <Stack spacing={1} direction="row">
                    <EquipmentSelection
                        equipment={weapon}
                        equipmentJson={weaponJson}
                        handleEquipmentChange={handleWeaponChange}
                    />
                    <EquipmentModifierValue
                        modifierValue={weaponModifierValue}
                        handleCheckSelectedEquipment={handleCheckWeaponSelected}
                        handleModifierValueChange={handleWeaponModifierValueChange}
                    />
                    <EquipmentState
                        equipmentState={weaponState}
                        handleEquipmentChange={handleWeaponStateChange}
                    />
                </Stack>
                <Typography sx={{ color: "red" }}>{weaponModifierValue.helperText}</Typography>
                <EquipmentData
                    equipment={weapon}
                    modifierValue={weaponModifierValue}
                    handleRuneCountIncrease={handleWeaponRuneCountIncrease}
                    handleRuneCountDecrease={handleWeaponRuneCountDecrease}
                />
                <EquipmentSynthesisRune
                    equipment={weapon}
                    synthesisRunes={weaponSynthesisRunes}
                    deleteRune={deleteWeaponRune}
                />
                <EquipmentSpecialAttackRune
                    equipmentJson={weaponJson}
                    addRune={addWeaponRune}
                />
                <EquipmentSpecialAbilityRune
                    equipmentJson={weaponJson}
                    addRune={addWeaponRune}
                />
                <EquipmentDifferentAbilityRune
                    otherJson={weaponOtherJson}
                    addRune={addWeaponRune}
                />
            </Box>
            <Box sx={{ minWidth: 400, minHeight: 400 }}>
                <Stack spacing={1} direction="row">
                    <EquipmentSelection
                        equipment={shield}
                        equipmentJson={shieldJson}
                        handleEquipmentChange={handleShieldChange}
                    />
                    <EquipmentModifierValue
                        modifierValue={shieldModifierValue}
                        handleCheckSelectedEquipment={handleCheckShieldSelected}
                        handleModifierValueChange={handleShieldModifierValueChange}
                    />
                    <EquipmentState
                        equipmentState={shieldState}
                        handleEquipmentChange={handleShieldStateChange}
                    />
                </Stack>
                <Typography sx={{ color: "red" }}>{shieldModifierValue.helperText}</Typography>
                <EquipmentData
                    equipment={shield}
                    modifierValue={shieldModifierValue}
                    handleRuneCountIncrease={handleShieldRuneCountIncrease}
                    handleRuneCountDecrease={handleShieldRuneCountDecrease}
                />
                <EquipmentSynthesisRune
                    equipment={shield}
                    synthesisRunes={shieldSynthesisRunes}
                    deleteRune={deleteShieldRune}
                />
                <EquipmentSpecialAbilityRune
                    equipmentJson={shieldJson}
                    addRune={addShieldRune}
                />
                <EquipmentDifferentAbilityRune
                    otherJson={shieldOtherJson}
                    addRune={addShieldRune}
                />
            </Box>
        </Stack>
    )
};