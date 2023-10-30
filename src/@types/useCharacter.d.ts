import { SelectChangeEvent } from "@mui/material"

export type Level = {
    level: string,
    error: boolean,
    helperText: string
}

export type HP = {
    HP: string,
    error: boolean,
    helperText: string
}

export type Power = {
    power: string,
    error: boolean,
    helperText: string
}

export type AsukaCondition = {
    isAngryState: boolean,
    isFightState: boolean,
    isWildDanceState: boolean,
    isConfusionState: boolean
}

export type Bracelet = {
    isEquippedProtectBracelet1: boolean,
    isEquippedProtectBracelet2: boolean,
    isEquippedRegretBracelet: boolean,
}

type Functions = {
    handleLevelChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleHPChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handlePowerChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleFriendsChange: (event: SelectChangeEvent) => void;
    handlePowerChangeRadioButton: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleStatusChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleChangeBracelet: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export type Character = [Level, HP, Power, number, Functions];