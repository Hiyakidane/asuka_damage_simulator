import { SelectChangeEvent } from "@mui/material"

export type Equipment = {
    id: number,
    name: string,
    rune: string,
    basicValue: number,
    runeCount: number,
    effect: string,
    category: string,
    commonlyUsed: string,
    hand: string
}

export type ModifierValue = {
    value: string,
    error: boolean,
    helperText: string
}

export type EquipmentState = {
    id: number,
    isBlessed: boolean
}

type Functions = {
    handleWeaponChange: (event: SelectChangeEvent) => void,
    handleShieldChange: (event: SelectChangeEvent) => void,
    handleCheckWeaponSelected: () => void,
    handleCheckShieldSelected: () => void,
    handleWeaponModifierValueChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    handleShieldModifierValueChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    handleWeaponStateChange: (event: SelectChangeEvent) => void,
    handleShieldStateChange: (event: SelectChangeEvent) => void,
    handleWeaponRuneCountIncrease: () => void,
    handleWeaponRuneCountDecrease: () => void,
    handleShieldRuneCountIncrease: () => void,
    handleShieldRuneCountDecrease: () => void,
    addWeaponRune: (json: object, id: string) => void,
    deleteWeaponRune: (index: number) => void,
    addShieldRune: (json: object, id: string) => void,
    deleteShieldRune: (index: number) => void
}

export type EquipmentType = [Equipment, ModifierValue, string[], EquipmentState, Equipment, ModifierValue, string[], EquipmentState, Functions];
