import { AsukaCondition } from "useCharacter";
import { DamageWidth } from "./damageConstants";
import { Resonance } from "resonance";
import { SpecialAttackWeaponRuneCount } from "equipmentRune";

export const calculateDamageDealt = (asukaAttackPower: number, monsterDefencePower: number): number[] => {
    // プレイヤー
    // 通常攻撃のダメージ
    let minimumAttackDamage = 0;
    let mediumAttackDamage = 0;
    let maximumAttackDamage = 0;

    const calculateAttackDamage = () => {
        // 与ダメージの計算
        minimumAttackDamage = Math.round(asukaAttackPower * DamageWidth.minimumDamageWidth - monsterDefencePower);
        mediumAttackDamage = Math.round(asukaAttackPower * DamageWidth.mediumDamageWidth - monsterDefencePower);
        maximumAttackDamage = Math.round(asukaAttackPower * DamageWidth.maximumDamageWidth - monsterDefencePower);

        // ダメージ0.5未満はダメージ1に
        // 実際は75%でダメージ1、25%でダメージ2
        if (minimumAttackDamage < 0.5) {
            minimumAttackDamage = 1;
        }

        if (mediumAttackDamage < 0.5) {
            mediumAttackDamage = 1;
        }

        if (maximumAttackDamage < 0.5) {
            maximumAttackDamage = 1;
        }
    }

    calculateAttackDamage();

    return [
        minimumAttackDamage,
        mediumAttackDamage,
        maximumAttackDamage
    ]
}

// 祝福状態のダメージ倍率を計算
// 祝福*イカリ状態+攻撃力27でダイキライ(防御力25)にダメージ5
// 2*1.25*2=5だから切り捨てられてない
export const calculateDamageDealtAffectsByWeaponBlessed = (normalAttackDamage: number[], isWeaponBlessed: boolean): number[] => {
    let tmpNormalAttackDamage = [...normalAttackDamage];

    if (isWeaponBlessed) {
        tmpNormalAttackDamage[0] = tmpNormalAttackDamage[0] * 1.25;
        tmpNormalAttackDamage[1] = tmpNormalAttackDamage[1] * 1.25;
        tmpNormalAttackDamage[2] = tmpNormalAttackDamage[2] * 1.25;
    }

    return tmpNormalAttackDamage;
}

// ダメージに影響を与えるステータス効果を計算
export const calculateDamageDealtAffectsByStatusEffects = (normalAttackDamage: number[], asukaCondition: AsukaCondition): number[] => {
    let tmpNormalAttackDamage = [...normalAttackDamage];

    // イカリ
    if (asukaCondition.isAngryState) {
        tmpNormalAttackDamage[0] = tmpNormalAttackDamage[0] * 2;
        tmpNormalAttackDamage[1] = tmpNormalAttackDamage[1] * 2;
        tmpNormalAttackDamage[2] = tmpNormalAttackDamage[2] * 2;
    }

    // 乱舞
    if (asukaCondition.isWildDanceState) {
        tmpNormalAttackDamage[0] = tmpNormalAttackDamage[0] * 2;
        tmpNormalAttackDamage[1] = tmpNormalAttackDamage[1] * 2;
        tmpNormalAttackDamage[2] = tmpNormalAttackDamage[2] * 2;
    }

    return tmpNormalAttackDamage;
}

// 共鳴効果のダメージ計算
export const calculateDamageDealtAffectsByResonanceEffect = (normalAttackDamage: number[], resonances: Resonance, monsterValidRuneList): number[] => {
    let tmpNormalAttackDamage = [...normalAttackDamage];

    const addResonanceEffectDamage = () => {
        tmpNormalAttackDamage[0] += 20;
        tmpNormalAttackDamage[1] += 20;
        tmpNormalAttackDamage[2] += 20;
    }

    // 共鳴効果によるダメージ追加を加算する
    // 獣王共鳴
    if (resonances.isBeastKingSetResonance) {
        let specialAttackRuneList = ["仏", "水", "目", "ド", "月"];
        let existsValidRune = specialAttackRuneList.filter((validRune) => monsterValidRuneList.includes(validRune)).length;
        if (existsValidRune > 0) {
            addResonanceEffectDamage();
        }
    }

    // 共鳴効果によるダメージ追加を加算する
    // ドラゴンセット共鳴
    if (resonances.isDragonSetResonance) {
        let dragonKillerRuneList = ["竜", "龍"];
        let existsValidRune = dragonKillerRuneList.filter((validRune) => monsterValidRuneList.includes(validRune)).length;
        if (existsValidRune > 0) {
            addResonanceEffectDamage();
        }
    }

    return tmpNormalAttackDamage;
}

export const calculateSpecialAttackWeaponDealtDamage = (normalAttackDamage: number[], weaponSpecialAttackRuneCount: SpecialAttackWeaponRuneCount, monsterValidRuneList: string[]): number[] => {
    // 特攻武器のダメージ倍率
    // 龍神剣以外
    const specialAttackWeaponDamageMultiplier = [1.5, 1.86, 2.23, 2.6, 2.96, 3.33, 3.7, 4.06, 4.43, 4.8, 5.16, 5.53, 5.9, 6.26, 6.63, 7, 14];
    // 龍神剣
    const dragonGodSwordDamageMultiplier = [2, 2.53, 3.06, 3.6, 4.13, 4.66, 5.2, 5.73, 6.26, 6.8, 7.33, 7.86, 8.4, 8.93, 9.46, 10, 20];

    let tmpNormalAttackDamage = [...normalAttackDamage];

    // 特攻武器のダメージ倍率を加味したダメージの計算
    const calcAttackDamage = (damageMultiplier: number[], index: number) => {
        tmpNormalAttackDamage[0] = Math.floor(tmpNormalAttackDamage[0] * damageMultiplier[index]);
        tmpNormalAttackDamage[1] = Math.floor(tmpNormalAttackDamage[1] * damageMultiplier[index]);
        tmpNormalAttackDamage[2] = Math.floor(tmpNormalAttackDamage[2] * damageMultiplier[index]);
    }

    // 成仏のカマ
    if (monsterValidRuneList.includes("仏") && weaponSpecialAttackRuneCount.ghostSickleRuneCount > 0) {
        calcAttackDamage(specialAttackWeaponDamageMultiplier, weaponSpecialAttackRuneCount.ghostSickleRuneCount - 1);
    }

    // マリンスラッシャー
    if (monsterValidRuneList.includes("水") && weaponSpecialAttackRuneCount.marineSlasherRuneCount > 0) {
        calcAttackDamage(specialAttackWeaponDamageMultiplier, weaponSpecialAttackRuneCount.marineSlasherRuneCount - 1);
    }

    // 1ツ目殺し
    if (monsterValidRuneList.includes("目") && weaponSpecialAttackRuneCount.cyclopsKillerRuneCount > 0) {
        calcAttackDamage(specialAttackWeaponDamageMultiplier, weaponSpecialAttackRuneCount.cyclopsKillerRuneCount - 1);
    }

    // ドレインバスター
    if (monsterValidRuneList.includes("ド") && weaponSpecialAttackRuneCount.drainBusterRuneCount > 0) {
        calcAttackDamage(specialAttackWeaponDamageMultiplier, weaponSpecialAttackRuneCount.drainBusterRuneCount - 1);
    }

    // 三日月刀
    if (monsterValidRuneList.includes("月") && weaponSpecialAttackRuneCount.crescentArmRuneCount > 0) {
        calcAttackDamage(specialAttackWeaponDamageMultiplier, weaponSpecialAttackRuneCount.crescentArmRuneCount - 1);
    }

    // ドラゴンキラー
    if (monsterValidRuneList.includes("竜") && weaponSpecialAttackRuneCount.dragonKillerRuneCount > 0) {
        calcAttackDamage(specialAttackWeaponDamageMultiplier, weaponSpecialAttackRuneCount.dragonKillerRuneCount - 1);
    }

    // 龍神剣
    if (monsterValidRuneList.includes("龍") && weaponSpecialAttackRuneCount.dragonGodSwordRuneCount > 0) {
        calcAttackDamage(dragonGodSwordDamageMultiplier, weaponSpecialAttackRuneCount.dragonGodSwordRuneCount - 1);
    }

    return tmpNormalAttackDamage;
}

// 会心の一撃 ダメージ2倍
export const calculateCriticalHitDealtDamage = (normalAttackDamage: number[]): number[] => {
    let tmpNormalAttackDamage = [...normalAttackDamage];

    tmpNormalAttackDamage[0] = tmpNormalAttackDamage[0] * 2;
    tmpNormalAttackDamage[1] = tmpNormalAttackDamage[1] * 2;
    tmpNormalAttackDamage[2] = tmpNormalAttackDamage[2] * 2;

    return tmpNormalAttackDamage;
}

// 端数切り捨て
export const roundDownDealtDamage = (attackDamage: number[]): number[] => {
    let tmpAttackDamage = [...attackDamage];

    tmpAttackDamage[0] = Math.floor(tmpAttackDamage[0]);
    tmpAttackDamage[1] = Math.floor(tmpAttackDamage[1]);
    tmpAttackDamage[2] = Math.floor(tmpAttackDamage[2]);

    return tmpAttackDamage;
}
