import { useCallback, useEffect, useMemo, useState } from "react";

import arrowJson from "../../../../json/projectile/arrow.json";

import { checkResonance } from "../modules/equpimentResonance";
import {
    checkHealingSwordRune,
    checkSpecialAttackWeaponRuneCount,
    checkSpecialAbilityWeaponRuneCount,
    checkDifferentAbilityWeaponRuneCount,
    checkDifferentAbilityShieldRuneCount,
    checkFestivalRune,
    checkFrontWarriorRune,
} from "../modules/equipmentRune";
import {
    calculateLevelCorrection,
    calculatePowerCorrection,
    calculateWeaponTilt,
    calculateWeaponSection,
    calculateWeaponCorrection,
    calculateFractionalAttackPower,
    calculateAttackPower,
    calculateAttackPowerAffectsByStatusEffects,
} from "../modules/asukaAttackPower";
import {
    calculateShieldTilt,
    calculateShieldSection,
    calculateFractionalDefencePower,
    calculateDefencePower,
    calculateDefencePowerAffectsByRuneEffects,
    calculateDefencePowerAffectsByStatusEffects
} from "../modules/asukaDefencePower";
import {
    calculateDamageDealt,
    calculateDamageDealtAffectsByWeaponBlessed,
    calculateDamageDealtAffectsByStatusEffects,
    calculateSpecialAttackWeaponDealtDamage,
    calculateCriticalHitDealtDamage,
    roundDownDealtDamage,
    calculateDamageDealtAffectsByResonanceEffect
} from "../modules/asukaDamageDealt";
import {
    calculateDamageTakenIncreasedByRegretBracelet,
    calculateDamageTakenIncreasedByTaurosCriticalHit,
    calculateDamageTaken,
    calculateDamageTakenReducedByProtectBracelet,
    calculateDamageTakenReducedByBlessedShield as calcShieldBlessingState,
    roundDownDamageTaken
} from "../modules/asukaDamageTaken";
import {
    checkMonsterAttributes,
    checkMonsterSpecialAttributes
} from "../modules/monsterAttributes";
import {
    calculateCriticalHitArrowDealtDamage,
    calculateProjectileDealtDamage
} from "../modules/asukaProjectileDamageDealt";

import {
    calculateEquipmentBasicValueByResonancesEffect,
    calculateSpecialAbilityWeaponRuneEffect,
    calculateDifferentAbilityWeaponRuneEffect,
    calculateSpecialAbilityShieldRuneEffect,
    calculateDifferentAbilityShieldRuneEffect,
    checkHalberdShield
} from "../modules/equipmentBasicValue";

import {
    calculateHerbHealingAmount,
    calculateOtogirisoHealingAmount,
    calculateHealingSwordHealingAmount,
    calculateWeaponTotalHealingAmount,
    calculateShieldTotalHealingAmount
} from "../modules/equipmentHealingAmount";

import { calculateMonsterConditionAffectsAttackPower } from "../modules/monsterAttackPower";
import { calculateMonsterConditionAffectsDefencePower } from "../modules/monsterDefencePower";
import { checkModifierValue } from "../modules/equipmentModifierValue";

// @types
import {
    AsukaCondition,
    Bracelet
} from "useCharacter";
import { 
    SpecialAttackWeaponRuneCount,
    SpecialAbilityWeaponRuneCount,
    DifferentAbilityWeaponRuneCount,
    DifferentAbilityShieldRuneCount,
} from "equipmentRune";
import { Resonance } from "resonance";
import { MonsterCondition } from "useMonster";
import { calculateAsukaNumberOfAttacksRequired, calculateMonsterNumberOfAttacksRequired } from "../modules/numberOfAttacksRequired";

export const useAsukaParameter = (characterStatus, selectedWeapon, selectedShield, selectedMonster) => {
    // 武器の基本値(トータル)
    const [displayWeaponBasicValue, setDisplayWeaponBasicValue] = useState<number>(0);
    // 盾の基本値(トータル)
    const [displayShieldBasicValue, setDisplayShieldBasicValue] = useState<number>(0);
    // アスカの攻撃力
    const [displayAsukaAttackPower, setDisplayAsukaAttackPower] = useState<number>(0);
    // アスカの防御力
    const [displayAsukaDefencePower, setDisplayAsukaDefencePower] = useState<number>(0);

    // アスカの与ダメージ(通常攻撃)
    const [normalAttackDamage, setNormalAttackDamage] = useState<number[]>([0, 0, 0]);
    // アスカの通常攻撃時の総回復量
    const [normalAttackTotalHealingAmount, setNormalAttackTotalHealingAmount] = useState<number[]>([0, 0, 0]);
    // アスカの与ダメージ(会心の一撃)
    const [criticalHitAttackDamage, setCriticalHitAttackDamage] = useState<number[]>([0, 0, 0]);
    // アスカの会心の一撃時の総回復量
    const [criticalHitAttackTotalHealingAmount, setCriticalHitAttackTotalHealingAmount] = useState<number[]>([0, 0, 0]);
    // 木の矢
    const [woodenArrowDamage, setWoodenArrowDamage] = useState<number[]>([0, 0, 0]);
    // 鉄の矢
    const [ironArrowDamage, setIronArrowDamage] = useState<number[]>([0, 0, 0]);
    // 銀の矢
    const [silverArrowDamage, setSilverArrowDamage] = useState<number[]>([0, 0, 0]);
    // 会心の矢
    const [criticalArrowDamage, setCriticalArrowDamage] = useState<number[]>([0, 0, 0]);
    const [criticalHitArrowDamage, setCriticalHitArrowDamage] = useState<number[]>([0, 0, 0]);
    // かまいたちの矢
    const [razorArrowDamage, setRazorArrowDamage] = useState<number[]>([0, 0, 0]);
    // デブータの石
    const [porkyRockDamage, setPorkyRockDamage] = useState<number[]>([0, 0, 0]);
    // アスカの被ダメージ(通常攻撃)
    const [normalDamageTaken, setNormalDamageTaken] = useState<number[]>([0, 0, 0]);
    // アスカの被ダメージ時の総回復量
    const [normalDamageTakenTotalHealingAmount, setNormalDamageTakenTotalHealingAmount] = useState<number>(0);
    // アスカの被ダメージ(痛恨の一撃 1.3倍)
    const [criticalHitDamageTakenByTaur, setCriticalHitDamageTakenByTaur] = useState<number[]>([0, 0, 0]);

    // 確殺数
    // アスカが通常攻撃でモンスターを倒すのに必要な攻撃回数
    const [displayAsukaNumberOfAttacksRequiredWithNormalAttack, setDisplayAsukaNumberOfAttacksRequiredWithNormalAttack] = useState<number>(0);
    // アスカが木の矢でモンスターを倒すのに必要な攻撃回数
    const [displayAsukaNumberOfAttacksRequiredWithWoodenArrow, setDisplayAsukaNumberOfAttacksRequiredWithWoodenArrow] = useState<number>(0);
    // アスカが鉄の矢でモンスターを倒すのに必要な攻撃回数
    const [displayAsukaNumberOfAttacksRequiredWithIronArrow, setDisplayAsukaNumberOfAttacksRequiredWithIronArrow] = useState<number>(0);
    // アスカが銀の矢でモンスターを倒すのに必要な攻撃回数
    const [displayAsukaNumberOfAttacksRequiredWithSilverArrow, setDisplayAsukaNumberOfAttacksRequiredWithSilverArrow] = useState<number>(0);
    // アスカが会心の矢でモンスターを倒すのに必要な攻撃回数
    const [displayAsukaNumberOfAttacksRequiredWithCriticalHitArrow, setDisplayAsukaNumberOfAttacksRequiredWithCriticalHitArrow] = useState<number>(0);
    // アスカがかまいたちの矢でモンスターを倒すのに必要な攻撃回数
    const [displayAsukaNumberOfAttacksRequiredWithRazorArrow, setDisplayAsukaNumberOfAttacksRequiredWithRazorArrow] = useState<number>(0);
    // アスカがデブータの石でモンスターを倒すのに必要な攻撃回数
    const [displayAsukaNumberOfAttacksRequiredWithPorkyRock, setDisplayAsukaNumberOfAttacksRequiredWithPorkyRock] = useState<number>(0);

    // モンスターが通常攻撃でアスカを倒すのに必要な攻撃回数
    const [displayMonsterNumberOfAttacksRequiredWithNormalAttack, setDisplayMonsterNumberOfAttacksRequiredWithNormalAttack] = useState<number>(0);
    // モンスターが痛恨の一撃でアスカを倒すのに必要な攻撃回数
    const [displayMonsterNumberOfAttacksRequiredWithCriticalHitAttack, setDisplayMonsterNumberOfAttacksRequiredWithCriticalHitAttack] = useState<number>(0);

    // アスカ
    // レベル
    let asukaLevel = 0;
    // HP
    let asukaHP = 0;
    // ちから
    let asukaPower = 0;
    // 仲間の数
    let friends = 0;
    // 状態
    let asukaCondition: AsukaCondition = {
        isAngryState: false,
        isFightState: false,
        isWildDanceState: false,
        isConfusionState: false,
    };
    // 腕輪の装備状態
    let bracelet: Bracelet = {
        isEquippedProtectBracelet1: false,
        isEquippedProtectBracelet2: false,
        isEquippedRegretBracelet: false
    };
    // レベル補正
    let levelCorrection = 0;
    // ちから補正
    let powerCorrection = 0;
    // 計算中の与ダメージ(通常攻撃)
    let tmpNormalAttackDamage = [];
    // 計算中の与ダメージ(会心の一撃)
    let tmpCriticalHitAttackDamage = [];
    // 計算中の被ダメージ(通常攻撃)
    let tmpNormalDamageTaken = [];
    // 計算中の被ダメージ(タウロス系の痛恨の一撃)
    let tmpCriticalHitDamageTakenByTaur = [];

    // 確殺数
    // アスカが通常攻撃でモンスターを倒すのに必要な攻撃回数
    let asukaNumberOfAttacksRequiredWithNormal = 0;
    // アスカが木の矢でモンスターを倒すのに必要な攻撃回数
    let asukaNumberOfAttacksRequiredWithWoodenArrow = 0;
    // アスカが鉄の矢でモンスターを倒すのに必要な攻撃回数
    let asukaNumberOfAttacksRequiredWithIronArrow = 0;
    // アスカが銀の矢でモンスターを倒すのに必要な攻撃回数
    let asukaNumberOfAttacksRequiredWithSilverArrow = 0;
    // アスカが会心の矢でモンスターを倒すのに必要な攻撃回数
    let asukaNumberOfAttacksRequiredWithCriticalHitArrow = 0;
    // アスカがかまいたちの矢でモンスターを倒すのに必要な攻撃回数
    let asukaNumberOfAttacksRequiredWithRazorArrow = 0;
    // アスカがデブータの石でモンスターを倒すのに必要な攻撃回数
    let asukaNumberOfAttacksRequiredWithPorkyRock = 0;

    // モンスターが通常攻撃でアスカを倒すのに必要な攻撃回数
    let monsterNumberOfAttacksRequiredWithNormal = 0;
    // モンスターが痛恨の一撃でアスカを倒すのに必要な攻撃回数
    let monsterNumberOfAttacksRequiredWithCriticalHit = 0;

    // モンスター
    // モンスターのID
    let monsterId = 0;
    // モンスター名
    let monsterName = "";
    // モンスターのHP
    let monsterHP = 0;
    // モンスターの攻撃力
    let monsterAttackPower = 0;
    // モンスターの防御力
    let monsterDefencePower = 0;
    // モンスターの属性
    let monsterAttributes = [];
    // モンスターの状態
    let monsterCondition: MonsterCondition = {
        isAngryState: false,
        isConfusionState: false,
    };
    // モンスターの特別な属性
    let isConvertAllDamageOneAttribute = false;

    // 武器
    // 武器名
    let weaponName = "";
    // ベース印
    let weaponBaseRune = "";
    // 合成印
    let weaponSynthesisRunes = [];
    // ベース印+合成印
    let weaponRune = [];
    // 武器攻撃力(基本値)
    let weaponBasicValue = 0;
    // 武器修正値
    let weaponModifierValue = 0;
    // 武器の状態
    let isWeaponBlessed = false;
    // 武器傾き
    let weaponTilt = 0.0;
    // 武器切片
    let weaponSection = 0.0;
    // 武器補正
    let weaponCorrection = 0.0;
    // 端数攻撃力
    let fractionalAttackPower = 0.0;
    // 攻撃力
    let asukaAttackPower = 0;

    // 武器印
    // 回印フラグ
    let hasHealingSwordRune = false;
    // 各特攻武器印の数
    let weaponSpecialAttackRuneCount: SpecialAttackWeaponRuneCount = {
        ghostSickleRuneCount: 0,
        marineSlasherRuneCount: 0,
        cyclopsKillerRuneCount: 0,
        drainBusterRuneCount: 0,
        crescentArmRuneCount: 0,
        dragonKillerRuneCount: 0,
        dragonGodSwordRuneCount: 0,
    };
    // 各特殊能力印の数
    let weaponSpecialAbilityRuneCount: SpecialAbilityWeaponRuneCount = {
        ironFanRuneCount: 0,
    }
    // 各異種能力印の数
    let weaponDifferentAbilityRuneCount: DifferentAbilityWeaponRuneCount = {
        strengthGrassRuneCount: 0,
        unluckyGrassRuneCount: 0,
        herbRuneCount: 0,
        otogirisoRuneCount: 0,
    }
    // モンスターに有効な印
    let monsterValidRuneList: string[] = [];
    // 薬印の回復量
    let tmpWeaponHerbHealingAmount = 0;
    // 弟印の回復量
    let tmpWeaponOtogirisoHealingAmount = 0;
    // 回印の回復量(通常攻撃)
    let tmpNormalAttackHealingAmount = [];
    // 回印の回復量(会心の一撃)
    let tmpCriticalHitAttackHealingAmount = [];
    // 薬+弟+回印の総回復量(通常攻撃)
    let tmpNormalAttackTotalHealingAmount = [];
    // 薬+弟+回印の総回復量(会心の一撃)
    let tmpCriticalHitAttackTotalHealingAmount = [];

    // 盾
    // 盾名
    let shieldName = "";
    // ベース印
    let shieldBaseRune = "";
    // 合成印
    let shieldSynthesisRunes = [];
    // ベース印+合成印
    let shieldRune = [];
    // 盾防御力(基本値)
    let shieldBasicValue = 0;
    // 盾修正値
    let shieldModifierValue = 0;
    // 盾の状態
    let isShieldBlessed = false;
    // 防具傾き
    let shieldTilt = 0.0;
    // 防具切片
    let shieldSection = 0.0;
    // 端数防御力
    let fractionalDefencePower = 0.0;
    // アスカの防御力
    let asukaDefencePower = 0;

    // 盾印
    // 祭印フラグ
    let hasFestivalRune = false;
    // 正印フラグ
    let hasFrontWarriorRune = false;
    // 各異種能力印の数
    let shieldDifferentAbilityRuneCount: DifferentAbilityShieldRuneCount = {
        lifeGrassRuneCount: 0,
        unluckyGrassRuneCount: 0,
        herbRuneCount: 0,
        otogirisoRuneCount: 0,
    }
    // 薬印の回復量
    let tmpShieldHerbHealingAmount = 0;
    // 弟印の回復量
    let tmpShieldOtogirisoHealingAmount = 0;
    // 薬+弟印の総回復量
    let tmpShieldTotalHealingAmount = 0;

    // 共鳴
    let resonances: Resonance = {
        isForgedSetResonance: false,
        isFumaSetResonance: false,
        isDragonSetResonance: false,
        isBeastKingSetResonance: false,
    };

    // 飛び道具
    // 木の矢
    let tmpWoodenArrowDamage = [];
    // 鉄の矢
    let tmpIronArrowDamage = [];
    // 銀の矢
    let tmpSilverArrowDamage = [];
    // 会心の矢
    let tmpCriticalArrowDamage = [];
    // 会心の矢 ダメージ1.3倍
    let tmpCriticalArrowCriticalHitDamage = [];
    // かまいたちの矢
    let tmpRazorArrowDamage = [];
    // デブータの石
    let tmpPorkyRockDamage = [];

    useEffect(() => {
        setCharacterData();
        setWeaponData();
        setShieldData();
        setEquipmentBasicValue();
        setResonance();
        setMonsterData();
        setMonsterAttackPower();
        setMonsterDefencePower();

        setAsukaAttackPower();
        setAsukaDefencePower();
        setAsukaDamageDealt();
        setAsukaDamageTaken();
        setProjectileDamage();
        convertAllDamageTakenOne();

        setWeaponHealingAmount();
        setShieldHealingAmount();
        setWeaponTotalHealingAmount();
        setShieldTotalHealingAmount();

        setAsukaNumberOfAttacksRequired();
        setMonsterNumberOfAttacksRequired();

        displayResult();

        debugConsoleLog();
    }, [characterStatus, selectedWeapon, selectedShield, selectedMonster]);

    const debugConsoleLog = () => {
        let isDebug = false;
        let isAsukaStatus = false;
        let isMonsterStatus = false;
        let isWeaponStatus = false;
        let isShieldStatus = false;
        let isProjectileStatus = false;
        if (isDebug) {
            if (isAsukaStatus) {
                console.log("----------Asuka----------:");
                console.log("asukaLevel:" + asukaLevel);
                console.log("asukaPower:" + asukaPower);
                console.log("friends:" + friends);
                console.log("asukaCondition:" + asukaCondition);
                console.log("bracelet:" + bracelet);
                console.log("levelCorrection:" + levelCorrection);
                console.log("powerCorrection:" + powerCorrection);
                console.log("tmpCriticalHitAttackDamage:" + tmpCriticalHitAttackDamage);
                console.log("tmpNormalDamageTaken:" + tmpNormalDamageTaken);
                console.log("tmpCriticalHitDamageTakenByTaur:" + tmpCriticalHitDamageTakenByTaur);
            }

            if (isMonsterStatus) {
                console.log("----------Monster----------:");
                console.log("monsterId:" + monsterId);
                console.log("monsterHP:" + monsterHP);
                console.log("monsterAttackPower:" + monsterAttackPower);
                console.log("monsterDefencePower:" + monsterDefencePower);
                console.log("monsterAttributes:" + monsterAttributes);
                console.log("monsterCondition:" + monsterCondition);
                console.log("isConvertAllDamageOneAttribute:" + isConvertAllDamageOneAttribute);
            }

            if (isWeaponStatus) {
                console.log("----------Weapon----------:");
                console.log("weaponName:" + weaponName);
                console.log("weaponBaseRune:" + weaponBaseRune);
                console.log("weaponSynthesisRunes:" + weaponSynthesisRunes);
                console.log("weaponRune:" + weaponRune);
                console.log("weaponBasicValue:" + weaponBasicValue);
                console.log("isWeaponBlessed:" + isWeaponBlessed);
                console.log("weaponTilt:" + weaponTilt);
                console.log("weaponSection:" + weaponSection);
                console.log("weaponCorrection:" + weaponCorrection);
                console.log("fractionalAttackPower:" + fractionalAttackPower);
                console.log("asukaAttackPower:" + asukaAttackPower);
                console.log("validSpecialAttackWeaponRuneList:" + monsterValidRuneList);
                console.log("tmpWeaponHerbHealingAmount:" + tmpWeaponHerbHealingAmount);
                console.log("tmpWeaponOtogirisoHealingAmount:" + tmpWeaponOtogirisoHealingAmount);
                console.log("tmpNormalAttackHealingAmount:" + tmpNormalAttackHealingAmount);
                console.log("tmpCriticalHitAttackHealingAmount:" + tmpCriticalHitAttackHealingAmount);
                console.log("tmpNormalAttackTotalHealingAmount:" + tmpNormalAttackTotalHealingAmount);
                console.log("tmpCriticalHitAttackTotalHealingAmount:" + tmpCriticalHitAttackTotalHealingAmount);
                console.log("----------Resonance----------:");
                console.log("resonances:" + resonances);
            }

            if (isShieldStatus) {
                console.log("----------Shield----------:");
                console.log("shieldName:" + shieldName);
                console.log("shieldBaseRune:" + shieldBaseRune);
                console.log("shieldSynthesisRunes:" + shieldSynthesisRunes);
                console.log("shieldRune:" + shieldRune);
                console.log("shieldBasicValue:" + shieldBasicValue);
                console.log("shieldModifierValue:" + shieldModifierValue);
                console.log("isShieldBlessed:" + isShieldBlessed);
                console.log("shieldTilt:" + shieldTilt);
                console.log("shieldSection:" + shieldSection);
                console.log("fractionalDefencePower:" + fractionalDefencePower);
                console.log("asukaDefencePower:" + asukaDefencePower);
                console.log("tmpShieldHerbHealingAmount:" + tmpShieldHerbHealingAmount);
                console.log("tmpShieldOtogirisoHealingAmount:" + tmpShieldOtogirisoHealingAmount);
                console.log("tmpShieldTotalHealingAmount:" + tmpShieldTotalHealingAmount);
                console.log("----------Resonance----------:");
                console.log("resonances:" + resonances);
            }

            if (isProjectileStatus) {
                console.log("----------Projectile----------:");
                console.log("tmpWoodenArrowDamage:" + tmpWoodenArrowDamage);
                console.log("tmpIronArrowDamage:" + tmpIronArrowDamage);
                console.log("tmpSilverArrowDamage:" + tmpSilverArrowDamage);
                console.log("tmpCriticalArrowDamage:" + tmpCriticalArrowDamage);
                console.log("tmpCriticalArrowCriticalHitDamage:" + tmpCriticalArrowCriticalHitDamage);
                console.log("tmpRazorArrowDamage:" + tmpRazorArrowDamage);
                console.log("tmpPorkyRockDamage:" + tmpPorkyRockDamage);
            }
        }
    }

    const setCharacterData = () => {
        asukaLevel = characterStatus.level;
        asukaHP = characterStatus.hp;
        asukaPower = characterStatus.power;
        friends = characterStatus.friends;
        asukaCondition = characterStatus.condition;
        bracelet = characterStatus.bracelet;
    }

    const setMonsterData = () => {
        monsterId = selectedMonster.id;
        monsterName = selectedMonster.name;
        monsterHP = selectedMonster.hp;
        monsterAttackPower = selectedMonster.attackPower;
        monsterDefencePower = selectedMonster.defencePower;
        monsterAttributes = selectedMonster.attributes;
        monsterCondition = selectedMonster.condition;
        monsterValidRuneList = checkMonsterAttributes(monsterAttributes);
        isConvertAllDamageOneAttribute = checkMonsterSpecialAttributes(monsterAttributes);
    }

    const setWeaponData = () => {
        weaponName = selectedWeapon.name;
        weaponBaseRune = selectedWeapon.baseRune;
        weaponSynthesisRunes = selectedWeapon.synthesisRunes;
        weaponRune = [weaponBaseRune, ...weaponSynthesisRunes];
        weaponBasicValue = selectedWeapon.basicValue;
        weaponModifierValue = checkModifierValue(selectedWeapon.modifierValue);
        hasHealingSwordRune = checkHealingSwordRune(weaponRune);
        weaponSpecialAttackRuneCount = checkSpecialAttackWeaponRuneCount(weaponRune);
        weaponSpecialAbilityRuneCount = checkSpecialAbilityWeaponRuneCount(weaponRune);
        weaponDifferentAbilityRuneCount = checkDifferentAbilityWeaponRuneCount(weaponRune);
        isWeaponBlessed = selectedWeapon.isWeaponBlessed;
    }

    const setShieldData = () => {
        shieldName = selectedShield.name;
        shieldBaseRune = selectedShield.baseRune;
        shieldSynthesisRunes = selectedShield.synthesisRunes;
        shieldRune = [shieldBaseRune, ...shieldSynthesisRunes];
        shieldBasicValue = selectedShield.basicValue;
        shieldModifierValue = checkModifierValue(selectedShield.modifierValue);
        hasFestivalRune = checkFestivalRune(shieldRune);
        hasFrontWarriorRune = checkFrontWarriorRune(shieldRune);
        shieldDifferentAbilityRuneCount = checkDifferentAbilityShieldRuneCount(shieldRune);
        isShieldBlessed = selectedShield.isShieldBlessed;
    }

    const setResonance = () => {
        resonances = checkResonance(weaponName, shieldName);
    }

    const setEquipmentBasicValue = () => {
        let equipmentBasicValue = {
            weaponBasicValue: weaponBasicValue,
            shieldBasicValue: shieldBasicValue,
        }

        equipmentBasicValue = calculateEquipmentBasicValueByResonancesEffect(equipmentBasicValue, resonances);
        equipmentBasicValue = calculateSpecialAbilityWeaponRuneEffect(equipmentBasicValue, weaponSpecialAbilityRuneCount);
        equipmentBasicValue = calculateDifferentAbilityWeaponRuneEffect(equipmentBasicValue, weaponDifferentAbilityRuneCount);
        equipmentBasicValue = calculateSpecialAbilityShieldRuneEffect(equipmentBasicValue, hasFestivalRune, friends);
        equipmentBasicValue = calculateDifferentAbilityShieldRuneEffect(equipmentBasicValue, shieldDifferentAbilityRuneCount);
        equipmentBasicValue = checkHalberdShield(equipmentBasicValue, shieldName);

        weaponBasicValue = equipmentBasicValue.weaponBasicValue;
        shieldBasicValue = equipmentBasicValue.shieldBasicValue;
    }

    const setAsukaAttackPower = () => {
        levelCorrection = calculateLevelCorrection(asukaLevel);
        powerCorrection = calculatePowerCorrection(asukaPower);
        weaponTilt = calculateWeaponTilt(weaponBasicValue);
        weaponSection = calculateWeaponSection(weaponBasicValue);
        weaponCorrection = calculateWeaponCorrection(weaponBasicValue, weaponModifierValue, weaponTilt, weaponSection);
        fractionalAttackPower = calculateFractionalAttackPower(levelCorrection, powerCorrection, weaponCorrection);
        asukaAttackPower = calculateAttackPower(fractionalAttackPower);
        asukaAttackPower = calculateAttackPowerAffectsByStatusEffects(asukaAttackPower, asukaCondition);
    }

    const setAsukaDefencePower = () => {
        shieldTilt = calculateShieldTilt(shieldBasicValue);
        shieldSection = calculateShieldSection(shieldBasicValue);
        fractionalDefencePower = calculateFractionalDefencePower(shieldBasicValue, shieldModifierValue, shieldTilt, shieldSection);
        asukaDefencePower = calculateDefencePower(shieldBasicValue, shieldModifierValue, shieldSection, fractionalDefencePower);
        asukaDefencePower = calculateDefencePowerAffectsByRuneEffects(asukaDefencePower, hasFrontWarriorRune);
        asukaDefencePower = calculateDefencePowerAffectsByStatusEffects(asukaDefencePower, asukaCondition);
    }

    const setMonsterAttackPower = () => {
        // モンスターのステータス効果を計算
        monsterAttackPower = calculateMonsterConditionAffectsAttackPower(monsterAttackPower, monsterCondition);
    }

    const setMonsterDefencePower = () => {
        // モンスターのステータス効果を計算
        monsterDefencePower = calculateMonsterConditionAffectsDefencePower(monsterDefencePower, monsterCondition);
    }

    // 通常攻撃ダメージ→祝福→ステータス効果→共鳴効果の処理順番？
    // 共鳴効果と特攻ダメージ倍率が最後なのはダメージから確定
    // (イカリ+獣王共鳴で62ダメージではなく(1*2+20)*1.5=33ダメージだったため)
    const setAsukaDamageDealt = () => {
        // 攻撃力から通常攻撃の与ダメージを算出
        tmpNormalAttackDamage = calculateDamageDealt(asukaAttackPower, monsterDefencePower);
        // 祝福倍率を計算
        tmpNormalAttackDamage = calculateDamageDealtAffectsByWeaponBlessed(tmpNormalAttackDamage, isWeaponBlessed);
        // ステータス効果を計算
        tmpNormalAttackDamage = calculateDamageDealtAffectsByStatusEffects(tmpNormalAttackDamage, asukaCondition);
        // 共鳴効果の計算
        tmpNormalAttackDamage = calculateDamageDealtAffectsByResonanceEffect(tmpNormalAttackDamage, resonances, monsterValidRuneList);
        // 特攻武器のダメージ倍率を算出して計算
        tmpNormalAttackDamage = calculateSpecialAttackWeaponDealtDamage(tmpNormalAttackDamage, weaponSpecialAttackRuneCount, monsterValidRuneList);
        // 会心の一撃のダメージ
        tmpCriticalHitAttackDamage = calculateCriticalHitDealtDamage(tmpNormalAttackDamage);

        tmpNormalAttackDamage = roundDownDealtDamage(tmpNormalAttackDamage);
        tmpCriticalHitAttackDamage = roundDownDealtDamage(tmpCriticalHitAttackDamage);
    }

    const setAsukaDamageTaken = () => {
        // 防御力から通常攻撃の被ダメージを算出
        tmpNormalDamageTaken = calculateDamageTaken(monsterAttackPower, asukaDefencePower);
        // 祝福倍率を計算
        tmpNormalDamageTaken = calcShieldBlessingState(tmpNormalDamageTaken, isShieldBlessed);
        // まもりの腕輪によるダメージ低減
        tmpNormalDamageTaken = calculateDamageTakenReducedByProtectBracelet(tmpNormalDamageTaken, bracelet);
        // タウロス系の痛恨の一撃
        tmpCriticalHitDamageTakenByTaur = calculateDamageTakenIncreasedByTaurosCriticalHit(tmpNormalDamageTaken, monsterId);
        // 痛恨の腕輪による痛恨の一撃
        tmpNormalDamageTaken = calculateDamageTakenIncreasedByRegretBracelet(tmpNormalDamageTaken, bracelet);

        tmpNormalDamageTaken = roundDownDamageTaken(tmpNormalDamageTaken);
        tmpCriticalHitDamageTakenByTaur = roundDownDamageTaken(tmpCriticalHitDamageTakenByTaur);
    }

    // 各飛び道具の与ダメージを算出
    const setProjectileDamage = () => {
        tmpWoodenArrowDamage = calculateProjectileDealtDamage(arrowJson[0].attackPower, levelCorrection, powerCorrection, monsterDefencePower);
        tmpIronArrowDamage = calculateProjectileDealtDamage(arrowJson[1].attackPower, levelCorrection, powerCorrection, monsterDefencePower);
        tmpSilverArrowDamage = calculateProjectileDealtDamage(arrowJson[2].attackPower, levelCorrection, powerCorrection, monsterDefencePower);
        tmpCriticalArrowDamage = calculateProjectileDealtDamage(arrowJson[3].attackPower, levelCorrection, powerCorrection, monsterDefencePower);
        tmpCriticalArrowCriticalHitDamage = calculateCriticalHitArrowDealtDamage(arrowJson[3].attackPower, levelCorrection, powerCorrection, monsterDefencePower);
        tmpRazorArrowDamage = calculateProjectileDealtDamage(arrowJson[4].attackPower, levelCorrection, powerCorrection, monsterDefencePower);
        tmpPorkyRockDamage = calculateProjectileDealtDamage(arrowJson[5].attackPower, levelCorrection, powerCorrection, monsterDefencePower);
    }

    // 被ダメ1変換持ちの場合は全てのダメージを1に設定する
    const convertAllDamageTakenOne = () => {
        if (isConvertAllDamageOneAttribute) {
            tmpNormalAttackDamage = [1, 1, 1];
            tmpCriticalHitAttackDamage = [1, 1, 1];
            tmpWoodenArrowDamage = [1, 1, 1];
            tmpIronArrowDamage = [1, 1, 1];
            tmpSilverArrowDamage = [1, 1, 1];
            tmpCriticalArrowDamage = [1, 1, 1];
            tmpCriticalArrowCriticalHitDamage = [1, 1, 1];
            tmpRazorArrowDamage = [1, 1, 1];
            tmpPorkyRockDamage = [1, 1, 1];
        }
    }

    // 武器の印の回復量を計算
    // 薬/弟印は小数点切り上げ
    // 回復剣は小数点切り捨て(3未満のダメージは回復しない)
    const setWeaponHealingAmount = () => {
        tmpWeaponHerbHealingAmount = calculateHerbHealingAmount(weaponDifferentAbilityRuneCount.herbRuneCount);
        tmpWeaponOtogirisoHealingAmount = calculateOtogirisoHealingAmount(weaponDifferentAbilityRuneCount.otogirisoRuneCount);
        tmpNormalAttackHealingAmount = calculateHealingSwordHealingAmount(hasHealingSwordRune, tmpNormalAttackDamage);
        tmpCriticalHitAttackHealingAmount = calculateHealingSwordHealingAmount(hasHealingSwordRune, tmpCriticalHitAttackDamage);
    }

    // 盾の印の回復量を計算
    const setShieldHealingAmount = () => {
        tmpShieldHerbHealingAmount = calculateHerbHealingAmount(shieldDifferentAbilityRuneCount.herbRuneCount);
        tmpShieldOtogirisoHealingAmount = calculateOtogirisoHealingAmount(shieldDifferentAbilityRuneCount.otogirisoRuneCount);
    }

    // 武器の総回復量を計算
    const setWeaponTotalHealingAmount = () => {
        tmpNormalAttackTotalHealingAmount = calculateWeaponTotalHealingAmount(tmpWeaponHerbHealingAmount, tmpWeaponOtogirisoHealingAmount, tmpNormalAttackHealingAmount);
        tmpCriticalHitAttackTotalHealingAmount = calculateWeaponTotalHealingAmount(tmpWeaponHerbHealingAmount, tmpWeaponOtogirisoHealingAmount, tmpCriticalHitAttackHealingAmount);
    }

    // 盾の総回復量を計算
    const setShieldTotalHealingAmount = () => {
        tmpShieldTotalHealingAmount = calculateShieldTotalHealingAmount(tmpShieldHerbHealingAmount, tmpShieldOtogirisoHealingAmount);
    }

    // アスカ→モンスターの確殺数
    const setAsukaNumberOfAttacksRequired = () => {
        asukaNumberOfAttacksRequiredWithNormal = calculateAsukaNumberOfAttacksRequired(tmpNormalAttackDamage, monsterHP);
        asukaNumberOfAttacksRequiredWithWoodenArrow = calculateAsukaNumberOfAttacksRequired(tmpWoodenArrowDamage, monsterHP);
        asukaNumberOfAttacksRequiredWithIronArrow = calculateAsukaNumberOfAttacksRequired(tmpIronArrowDamage, monsterHP);
        asukaNumberOfAttacksRequiredWithSilverArrow = calculateAsukaNumberOfAttacksRequired(tmpSilverArrowDamage, monsterHP);
        asukaNumberOfAttacksRequiredWithCriticalHitArrow = calculateAsukaNumberOfAttacksRequired(tmpCriticalArrowDamage, monsterHP);
        asukaNumberOfAttacksRequiredWithRazorArrow = calculateAsukaNumberOfAttacksRequired(tmpRazorArrowDamage, monsterHP);
        asukaNumberOfAttacksRequiredWithPorkyRock = calculateAsukaNumberOfAttacksRequired(tmpPorkyRockDamage, monsterHP);
    }

    // モンスター→アスカの確殺数
    const setMonsterNumberOfAttacksRequired = () => {
        monsterNumberOfAttacksRequiredWithNormal = calculateMonsterNumberOfAttacksRequired(tmpNormalDamageTaken, asukaHP);
        monsterNumberOfAttacksRequiredWithCriticalHit = calculateMonsterNumberOfAttacksRequired(tmpCriticalHitDamageTakenByTaur, asukaHP);
    }

    const displayResult = () => {
        setDisplayWeaponBasicValue(weaponBasicValue);
        setDisplayShieldBasicValue(shieldBasicValue);
        setDisplayAsukaAttackPower(asukaAttackPower);
        setDisplayAsukaDefencePower(asukaDefencePower);
        
        setNormalAttackDamage(tmpNormalAttackDamage);
        setNormalAttackTotalHealingAmount(tmpNormalAttackTotalHealingAmount);
        setCriticalHitAttackDamage(tmpCriticalHitAttackDamage);
        setCriticalHitAttackTotalHealingAmount(tmpCriticalHitAttackTotalHealingAmount);

        setWoodenArrowDamage(tmpWoodenArrowDamage);
        setIronArrowDamage(tmpIronArrowDamage);
        setSilverArrowDamage(tmpSilverArrowDamage);
        setCriticalArrowDamage(tmpCriticalArrowDamage);
        setCriticalHitArrowDamage(tmpCriticalArrowCriticalHitDamage);
        setRazorArrowDamage(tmpRazorArrowDamage);
        setPorkyRockDamage(tmpPorkyRockDamage);

        setNormalDamageTaken(tmpNormalDamageTaken);
        setNormalDamageTakenTotalHealingAmount(tmpShieldTotalHealingAmount);
        setCriticalHitDamageTakenByTaur(tmpCriticalHitDamageTakenByTaur);

        setDisplayAsukaNumberOfAttacksRequiredWithNormalAttack(asukaNumberOfAttacksRequiredWithNormal);
        setDisplayAsukaNumberOfAttacksRequiredWithWoodenArrow(asukaNumberOfAttacksRequiredWithWoodenArrow);
        setDisplayAsukaNumberOfAttacksRequiredWithIronArrow(asukaNumberOfAttacksRequiredWithIronArrow);
        setDisplayAsukaNumberOfAttacksRequiredWithSilverArrow(asukaNumberOfAttacksRequiredWithSilverArrow);
        setDisplayAsukaNumberOfAttacksRequiredWithCriticalHitArrow(asukaNumberOfAttacksRequiredWithCriticalHitArrow);
        setDisplayAsukaNumberOfAttacksRequiredWithRazorArrow(asukaNumberOfAttacksRequiredWithRazorArrow);
        setDisplayAsukaNumberOfAttacksRequiredWithPorkyRock(asukaNumberOfAttacksRequiredWithPorkyRock);
        setDisplayMonsterNumberOfAttacksRequiredWithNormalAttack(monsterNumberOfAttacksRequiredWithNormal);
        setDisplayMonsterNumberOfAttacksRequiredWithCriticalHitAttack(monsterNumberOfAttacksRequiredWithCriticalHit);
    }

    return [
        displayWeaponBasicValue,
        displayShieldBasicValue,
        displayAsukaAttackPower,
        displayAsukaDefencePower,
        normalAttackDamage,
        normalAttackTotalHealingAmount,
        criticalHitAttackDamage,
        criticalHitAttackTotalHealingAmount,
        woodenArrowDamage,
        ironArrowDamage,
        silverArrowDamage,
        criticalArrowDamage,
        criticalHitArrowDamage,
        razorArrowDamage,
        porkyRockDamage,
        normalDamageTaken,
        normalDamageTakenTotalHealingAmount,
        criticalHitDamageTakenByTaur,
        displayAsukaNumberOfAttacksRequiredWithNormalAttack,
        displayAsukaNumberOfAttacksRequiredWithWoodenArrow,
        displayAsukaNumberOfAttacksRequiredWithIronArrow,
        displayAsukaNumberOfAttacksRequiredWithSilverArrow,
        displayAsukaNumberOfAttacksRequiredWithCriticalHitArrow,
        displayAsukaNumberOfAttacksRequiredWithRazorArrow,
        displayAsukaNumberOfAttacksRequiredWithPorkyRock,
        displayMonsterNumberOfAttacksRequiredWithNormalAttack,
        displayMonsterNumberOfAttacksRequiredWithCriticalHitAttack,
    ]
}