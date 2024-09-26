
// アスカからモンスター
export const calculateAsukaNumberOfAttacksRequired = (attackDamage: number[], monsterHP: number): number => {
    // アスカからモンスターは最低ダメージで考慮
    return calculateNumberOfAttacksRequired(attackDamage[0], monsterHP);
}

// モンスターからアスカ
export const calculateMonsterNumberOfAttacksRequired = (attackDamage: number[], asukaHP: number): number => {
    // モンスターからアスカは最大ダメージで考慮
    return calculateNumberOfAttacksRequired(attackDamage[2], asukaHP);
}

const calculateNumberOfAttacksRequired = (attackDamage: number, hp: number): number => {
    let numberOfAttacksRequired = 0;
    let tmpHP = hp;

    while (true) {
        tmpHP -= attackDamage;        
        numberOfAttacksRequired++;
        if (tmpHP <= 0) {
            break;
        }
    }

    return numberOfAttacksRequired;
}