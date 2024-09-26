import { DamageWidth } from "./damageConstants";

// 飛び道具の与ダメージ計算
export const calculateProjectileDealtDamage = (projectileAttackPower: number, levelCorrection: number, powerCorrection: number, monsterDefencePower: number): number[] => {
    const checkProjectileDamage = (projectileDamage: number) => {
        if (projectileDamage < 0.5) {
            projectileDamage = 1;
        } else {
            projectileDamage = Math.round(projectileDamage);
        }

        return projectileDamage;
    }

    let tmpProjectileAttackPower = projectileAttackPower + levelCorrection + powerCorrection;

    let minimumProjectileDamage = checkProjectileDamage((tmpProjectileAttackPower - monsterDefencePower) * DamageWidth.minimumDamageWidth);
    let mediumProjectileDamage = checkProjectileDamage((tmpProjectileAttackPower - monsterDefencePower) * DamageWidth.mediumDamageWidth);
    let maximumProjectileDamage = checkProjectileDamage((tmpProjectileAttackPower - monsterDefencePower) * DamageWidth.maximumDamageWidth);

    return [
        minimumProjectileDamage,
        mediumProjectileDamage,
        maximumProjectileDamage
    ];
}

// 会心の矢の会心ダメージ計算
export const calculateCriticalHitArrowDealtDamage = (projectileAttackPower: number, levelCorrection: number, powerCorrection: number, monsterDefencePower: number): number[] => {
    let criticalArrowDamage = calculateProjectileDealtDamage(projectileAttackPower, levelCorrection, powerCorrection, monsterDefencePower);
    let tmpCriticalArrowDamage = [...criticalArrowDamage];

    tmpCriticalArrowDamage[0] = Math.floor(tmpCriticalArrowDamage[0] * 1.3);
    tmpCriticalArrowDamage[1] = Math.floor(tmpCriticalArrowDamage[1] * 1.3);
    tmpCriticalArrowDamage[2] = Math.floor(tmpCriticalArrowDamage[2] * 1.3);

    return tmpCriticalArrowDamage;
}