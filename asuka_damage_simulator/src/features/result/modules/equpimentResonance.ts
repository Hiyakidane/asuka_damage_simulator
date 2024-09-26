import {
    Resonance
} from "resonance";

// 装備が共鳴しているかチェック
export const checkResonance = (weaponName: string, shieldName: string): Resonance => {
    let resonances = {
        isForgedSetResonance: false,
        isFumaSetResonance: false,
        isDragonSetResonance: false,
        isBeastKingSetResonance: false
    }

    // 共鳴
    // 鍛えたセット
    let isForgedSetResonance = false;
    // 火迅風魔刀+ラセン風魔の盾
    let isFumaSetResonance = false;
    // ドラゴンキラー+ドラゴンシールド
    let isDragonSetResonance = false;
    // 特攻武器+獣王の盾
    let isBeastKingSetResonance = false;

    // 剣盾の共鳴効果チェック
    if (weaponName === "鍛えた木刀" && shieldName === "鍛えた木の盾") {
        isForgedSetResonance = true;
    } else {
        isForgedSetResonance = false;
    }

    if (weaponName === "火迅風魔刀" && shieldName === "ラセン風魔の盾") {
        isFumaSetResonance = true;
    } else {
        isFumaSetResonance = false;
    }

    if (weaponName === "ドラゴンキラー" && shieldName === "ドラゴンシールド") {
        isDragonSetResonance = true;
    } else {
        isDragonSetResonance = false;
    }

    if (shieldName === "獣王の盾") {
        switch (weaponName) {
            case "成仏のカマ":
            case "マリンスラッシャー":
            case "1ツ目殺し":
            case "ドレインバスター":
            case "三日月刀":
                isBeastKingSetResonance = true;
                break;
            default:
                isBeastKingSetResonance = false;
                break;
        }
    }

    resonances.isForgedSetResonance = isForgedSetResonance;
    resonances.isFumaSetResonance = isFumaSetResonance;
    resonances.isDragonSetResonance = isDragonSetResonance;
    resonances.isBeastKingSetResonance = isBeastKingSetResonance;

    return resonances;
}