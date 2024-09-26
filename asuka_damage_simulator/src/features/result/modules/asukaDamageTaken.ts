import { Bracelet } from "useCharacter";
import { DamageWidth } from "./damageConstants";

export const calculateDamageTaken = (monsterAttackPower: number, asukaDefencePower: number): number[] => {
    let minimumDamageTaken = 0;
    let mediumDamageTaken = 0;
    let maximumDamageTaken = 0;

    // 被ダメージの計算
    minimumDamageTaken = Math.round((monsterAttackPower * DamageWidth.minimumDamageWidth) - asukaDefencePower);
    mediumDamageTaken = Math.round((monsterAttackPower * DamageWidth.mediumDamageWidth) - asukaDefencePower);
    maximumDamageTaken = Math.round((monsterAttackPower * DamageWidth.maximumDamageWidth) - asukaDefencePower);

    // ダメージ0.5未満はダメージ1に
    // 実際は75%でダメージ1、25%でダメージ2
    if (minimumDamageTaken < 0.5) {
        minimumDamageTaken = 1;
    }

    if (mediumDamageTaken < 0.5) {
        mediumDamageTaken = 1;
    }

    if (maximumDamageTaken < 0.5) {
        maximumDamageTaken = 1;
    }

    return [
        minimumDamageTaken,
        mediumDamageTaken,
        maximumDamageTaken
    ]
}

// 祝福された盾によって軽減されるダメージを計算する
export const calculateDamageTakenReducedByBlessedShield = (normalDamageTaken: number[], isShieldBlessed: boolean): number[] => {
    let tmpNormalDamageTaken = [...normalDamageTaken];

    if (isShieldBlessed) {
        tmpNormalDamageTaken[0] = tmpNormalDamageTaken[0] * 0.75;
        tmpNormalDamageTaken[1] = tmpNormalDamageTaken[1] * 0.75;
        tmpNormalDamageTaken[2] = tmpNormalDamageTaken[2] * 0.75;
    }

    return tmpNormalDamageTaken;
}

// まもりの腕輪によるダメージ軽減
// 防御力1でおうごんマムルから52のダメージ[ゲーム検証]
// 69-(69*0.25)=69-Math.ceil(17.25)=69-18=51≠52
// Math.ceil(69*0.75)=Math.ceil(51.75)=52=52
// 防御力3でおうごんマムルから51のダメージ[ゲーム検証]
// 67-(67*0.25)=67-Math.ceil(16.75)=69-17=52≠51
// Math.ceil(67*0.75)=Math.ceil(50.25)=51=51
// 切り上げ
export const calculateDamageTakenReducedByProtectBracelet = (normalDamageTaken: number[], bracelet: Bracelet): number[] => {
    let tmpNormalDamageTaken = [...normalDamageTaken];

    if (bracelet.isEquippedProtectBracelet1 && bracelet.isEquippedProtectBracelet2) {
        tmpNormalDamageTaken[0] = Math.ceil(tmpNormalDamageTaken[0] * 0.5);
        tmpNormalDamageTaken[1] = Math.ceil(tmpNormalDamageTaken[1] * 0.5);
        tmpNormalDamageTaken[2] = Math.ceil(tmpNormalDamageTaken[2] * 0.5);

        return tmpNormalDamageTaken;
    }

    if (bracelet.isEquippedProtectBracelet1 || bracelet.isEquippedProtectBracelet2) {
        tmpNormalDamageTaken[0] = Math.ceil(tmpNormalDamageTaken[0] * 0.75);
        tmpNormalDamageTaken[1] = Math.ceil(tmpNormalDamageTaken[1] * 0.75);
        tmpNormalDamageTaken[2] = Math.ceil(tmpNormalDamageTaken[2] * 0.75);

        return tmpNormalDamageTaken;
    }

    return tmpNormalDamageTaken;
}

// 痛恨の一撃(タウロス系) ダメージ1.3倍
// タウロス系の痛恨の一撃と痛恨の腕輪による痛恨の一撃のダメージは重複しない(1.3 * 1.5とはならない)[ゲーム検証]
// タウロス系の痛恨の一撃のダメージ倍率が優先される(痛恨確率は上がってそう)[ゲーム検証]
// (50-45)*1.3=6.5 実際のダメージは6なので最終的に切り捨てられている
// まもり装備の計算順番はまもり→痛恨
export const calculateDamageTakenIncreasedByTaurosCriticalHit = (normalDamageTaken: number[], monsterId: number): number[] => {
    let tmpNormalDamageTaken = [...normalDamageTaken];

    if (monsterId === 135 || monsterId === 136 || monsterId === 137) {
        tmpNormalDamageTaken[0] = tmpNormalDamageTaken[0] * 1.3;
        tmpNormalDamageTaken[1] = tmpNormalDamageTaken[1] * 1.3;
        tmpNormalDamageTaken[2] = tmpNormalDamageTaken[2] * 1.3;
    }

    return tmpNormalDamageTaken;
}

// 痛恨の一撃(痛恨の腕輪) ダメージ1.5倍
export const calculateDamageTakenIncreasedByRegretBracelet = (normalDamageTaken: number[], bracelet): number[] => {
    let tmpNormalDamageTaken = [...normalDamageTaken];

    if (bracelet.isEquippedRegretBracelet) {
        tmpNormalDamageTaken[0] = tmpNormalDamageTaken[0] * 1.5;
        tmpNormalDamageTaken[1] = tmpNormalDamageTaken[1] * 1.5;
        tmpNormalDamageTaken[2] = tmpNormalDamageTaken[2] * 1.5;
    }

    return tmpNormalDamageTaken;
}

// 端数切り捨て
export const roundDownDamageTaken = (damageTaken: number[]): number[] => {
    let tmpDamageTaken = [...damageTaken];

    tmpDamageTaken[0] = Math.floor(tmpDamageTaken[0]);
    tmpDamageTaken[1] = Math.floor(tmpDamageTaken[1]);
    tmpDamageTaken[2] = Math.floor(tmpDamageTaken[2]);

    return tmpDamageTaken;
}