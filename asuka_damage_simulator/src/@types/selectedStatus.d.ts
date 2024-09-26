export type CharacterStatus = {
    level: number,
    hp: number,
    power: number,
    friends: number,
    condition: {
        isAngryState: boolean,
        isFightState: boolean,
        isWildDanceState: boolean,
        isConfusionState: boolean,
    },
    bracelet: {
        isEquippedProtectBracelet1: boolean,
        isEquippedProtectBracelet2: boolean,
        isEquippedRegretBracelet: boolean,
    }
}

export type SelectedMonster = {
    id: number,
    name: string,
    hp: number,
    attackPower: number,
    defencePower: number,
    attributes: string[],
    condition: {
        isAngryState: boolean,
        isConfusionState: boolean,
    }
}

export type SelectedWeapon = {
    id: number,
    name: string,
    baseRune: string,
    synthesisRunes: string[],
    basicValue: number,
    modifierValue: number,
    isWeaponBlessingState: boolean
}

export type SelectedShield = {
    id: number,
    name: string,
    baseRune: string,
    synthesisRunes: string[],
    basicValue: number,
    modifierValue: number,
    isShieldBlessingState: boolean
}