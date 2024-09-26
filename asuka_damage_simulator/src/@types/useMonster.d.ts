import { ChangeEvent } from "react"

export type Monster = {
    id: number,
    name: string,
    hp: number,
    attackPower: number,
    defencePower: number,
    attributes: string[]
}

export type MonsterCondition = {
    isAngryState: boolean,
    isConfusionState: boolean
}

export type ExtractionAttribute = {
    ghostAttribute: boolean,
    aquaticAttribute: boolean,
    cyclopsAttribute: boolean,
    bombAttribute: boolean,
    drainAttribute: boolean,
    dragonAttribute: boolean,
}

type Functions = {
    handleMonsterChange: (monsterId: number) => void,
    handleLevelChange: (event: ChangeEvent<HTMLInputElement>) => void,
    handleConditionChange: (event: ChangeEvent<HTMLInputElement>) => void,
}

export type MonsterType = [Monster, number,Functions];
