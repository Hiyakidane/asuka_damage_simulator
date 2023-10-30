import { checkResonance } from "../modules/equpimentResonance";



describe("checkResonanceTest", () => {
    test("装備共鳴効果がないとき、各共鳴フラグがtrueでないこと", () => {
        const weaponName = "どうたぬき";
        const shieldName = "鉄甲の盾";
        const result = checkResonance(weaponName, shieldName);
        expect(result.isForgedSetResonance).toBe(false);
        expect(result.isFumaSetResonance).toBe(false);
        expect(result.isDragonSetResonance).toBe(false);
        expect(result.isBeastKingSetResonance).toBe(false);
    });

    test("武器が「鍛えた木刀」、盾が「鍛えた木の盾」のとき、鍛えたセット共鳴フラグがtrueになること", () => {
        const weaponName = "鍛えた木刀";
        const shieldName = "鍛えた木の盾";
        const result = checkResonance(weaponName, shieldName);
        expect(result.isForgedSetResonance).toBe(true);
    });

    test("武器が「火迅風魔刀」、盾が「ラセン風魔の盾」のとき、風魔セット共鳴フラグがtrueになること", () => {
        const weaponName = "火迅風魔刀";
        const shieldName = "ラセン風魔の盾";
        const result = checkResonance(weaponName, shieldName);
        expect(result.isFumaSetResonance).toBe(true);
    });

    test("武器が「ドラゴンキラー」、盾が「ドラゴンシールド」のとき、ドラゴンセット共鳴フラグがtrueになること", () => {
        const weaponName = "ドラゴンキラー";
        const shieldName = "ドラゴンシールド";
        const result = checkResonance(weaponName, shieldName);
        expect(result.isDragonSetResonance).toBe(true);
    });

    test("武器が「成仏のカマ」、盾が「獣王の盾」のとき、獣王セット共鳴フラグがtrueになること", () => {
        const weaponName = "成仏のカマ";
        const shieldName = "獣王の盾";
        const result = checkResonance(weaponName, shieldName);
        expect(result.isBeastKingSetResonance).toBe(true);
    });

    test("武器が「マリンスラッシャー」、盾が「獣王の盾」のとき、獣王セット共鳴フラグがtrueになること", () => {
        const weaponName = "マリンスラッシャー";
        const shieldName = "獣王の盾";
        const result = checkResonance(weaponName, shieldName);
        expect(result.isBeastKingSetResonance).toBe(true);
    });

    test("武器が「1ツ目殺し」、盾が「獣王の盾」のとき、獣王セット共鳴フラグがtrueになること", () => {
        const weaponName = "1ツ目殺し";
        const shieldName = "獣王の盾";
        const result = checkResonance(weaponName, shieldName);
        expect(result.isBeastKingSetResonance).toBe(true);
    });

    test("武器が「ドレインバスター」、盾が「獣王の盾」のとき、獣王セット共鳴フラグがtrueになること", () => {
        const weaponName = "ドレインバスター";
        const shieldName = "獣王の盾";
        const result = checkResonance(weaponName, shieldName);
        expect(result.isBeastKingSetResonance).toBe(true);
    });

    test("武器が「三日月刀」、盾が「獣王の盾」のとき、獣王セット共鳴フラグがtrueになること", () => {
        const weaponName = "三日月刀";
        const shieldName = "獣王の盾";
        const result = checkResonance(weaponName, shieldName);
        expect(result.isBeastKingSetResonance).toBe(true);
    });

    test("武器が「ドラゴンキラー」および「龍神剣」を除く特攻武器でなく、盾が「獣王の盾」のとき、獣王セット共鳴フラグがfalseになること", () => {
        const weaponName = "どうたぬき";
        const shieldName = "獣王の盾";
        const result = checkResonance(weaponName, shieldName);
        expect(result.isBeastKingSetResonance).toBe(false);
    });
});