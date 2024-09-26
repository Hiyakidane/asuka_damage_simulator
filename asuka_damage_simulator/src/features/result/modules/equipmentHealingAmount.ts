export const calculateHerbHealingAmount = (HerbRuneCount: number): number => {
    return Math.ceil(HerbRuneCount * 1.5);
}

export const calculateOtogirisoHealingAmount = (otogirisoRuneCount: number): number => {
    return Math.ceil(otogirisoRuneCount * 3.5);    
}

export const calculateHealingSwordHealingAmount = (hasHealingSwordRune: boolean, attackDamage: number[]): number[] => {
    let healingAmount = [0, 0, 0];
    let tmpAttackDamage = [...attackDamage];

    if (hasHealingSwordRune) {
        if (tmpAttackDamage[0] > 2) {
            healingAmount[0] = Math.floor(tmpAttackDamage[0] / 3);
        } else {
            healingAmount[0] = 0;
        }

        if (tmpAttackDamage[1] > 2) {
            healingAmount[1] = Math.floor(tmpAttackDamage[1] / 3);
        } else {
            healingAmount[1] = 0;
        }

        if (tmpAttackDamage[2] > 2) {
            healingAmount[2] = Math.floor(tmpAttackDamage[2] / 3);
        } else {
            healingAmount[2] = 0;
        }
    }

    return healingAmount;
}

export const calculateWeaponTotalHealingAmount = (herbHealingAmount: number, otogirisoHealingAmount: number, healingSwordHealingAmount: number[]): number[] => {
    let tmpHealingAmount = [0, 0, 0];

    tmpHealingAmount[0] = herbHealingAmount + otogirisoHealingAmount + healingSwordHealingAmount[0];
    tmpHealingAmount[1] = herbHealingAmount + otogirisoHealingAmount + healingSwordHealingAmount[1];
    tmpHealingAmount[2] = herbHealingAmount + otogirisoHealingAmount + healingSwordHealingAmount[2];

    return tmpHealingAmount;
}

export const calculateShieldTotalHealingAmount = (herbHealingAmount: number, otogirisoHealingAmount: number): number => {
    return herbHealingAmount + otogirisoHealingAmount;
}