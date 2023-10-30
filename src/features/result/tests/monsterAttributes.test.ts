import { checkMonsterAttributes, checkMonsterSpecialAttributes } from "../modules/monsterAttributes";


describe("checkMonsterAttributesTest", () => {
	test("モンスターに属性がないとき、配列が空であること", () => {
        const monsterAttributes = [];
        const result = checkMonsterAttributes(monsterAttributes);
        expect(result.length).toBe(0);
	});
    
	test("モンスターの属性にゴーストが含まれているとき、配列に「仏」が含まれていること", () => {
        const monsterAttributes = ["ゴースト"];
        const result = checkMonsterAttributes(monsterAttributes);
        expect(result.includes("仏")).toBe(true);
	});

    test("モンスターの属性に水棲が含まれているとき、配列に「水」が含まれていること", () => {
        const monsterAttributes = ["水棲"];
        const result = checkMonsterAttributes(monsterAttributes);
        expect(result.includes("水")).toBe(true);
	});

    test("モンスターの属性に一ツ目が含まれているとき、配列に「目」が含まれていること", () => {
        const monsterAttributes = ["一ツ目"];
        const result = checkMonsterAttributes(monsterAttributes);
        expect(result.includes("目")).toBe(true);
	});

    test("モンスターの属性にドレインが含まれているとき、配列に「ド」が含まれていること", () => {
        const monsterAttributes = ["ドレイン"];
        const result = checkMonsterAttributes(monsterAttributes);
        expect(result.includes("ド")).toBe(true);
	});

    test("モンスターの属性に爆弾が含まれているとき、配列に「月」が含まれていること", () => {
        const monsterAttributes = ["爆弾"];
        const result = checkMonsterAttributes(monsterAttributes);
        expect(result.includes("月")).toBe(true);
	});

    test("モンスターの属性にドラゴンが含まれているとき、配列に「竜」「龍」が含まれていること", () => {
        const monsterAttributes = ["ドラゴン"];
        const result = checkMonsterAttributes(monsterAttributes);
        expect(result.includes("竜")).toBe(true);
        expect(result.includes("龍")).toBe(true);
	});

    test("モンスターに特攻属性がないとき、配列が空であること", () => {
        const monsterAttributes = ["浮遊"];
        const result = checkMonsterAttributes(monsterAttributes);
        expect(result.length).toBe(0);
	});

});

describe("checkMonsterSpecialAttributesTest", () => {
	test("モンスターの属性に「被ダメ1変換」が含まれていないとき、結果がfalseであること", () => {
        const monsterAttributes = ["浮遊"];
        const result = checkMonsterSpecialAttributes(monsterAttributes);
        expect(result).toBe(false);
	});

    test("モンスターの属性に「被ダメ1変換」が含まれているとき、結果がtrueであること", () => {
        const monsterAttributes = ["被ダメ1変換"];
        const result = checkMonsterSpecialAttributes(monsterAttributes);
        expect(result).toBe(true);
	});
});