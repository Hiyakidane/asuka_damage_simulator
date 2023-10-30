import monsterJson from "../../../../json/monster/monster.json";
import { Monster } from "useMonster";
import { calculateIncreasedStatusByMonsterLevelUp } from "../modules/monsterLevel";


describe("calculateIncreasedStatusByMonsterLevelUpTest", () => {
	test("モンスターのIDが144/145/146以外のとき、モンスターのステータスが変わらないこと", () => {
        const monster: Monster = monsterJson[1];
        const level = 1;
        calculateIncreasedStatusByMonsterLevelUp(monster, level);
        expect(monster.hp).toBe(5);
        expect(monster.attackPower).toBe(2);
        expect(monster.defencePower).toBe(2);
	});
});

describe("calculateInfernoDemonStatusTest", () => {
	test("モンスターのIDが144で、レベルが1のとき、火炎入道のステータスが変わらないこと", () => {
        const monster: Monster = monsterJson[144];
        const level = 1;
        calculateIncreasedStatusByMonsterLevelUp(monster, level);
        expect(monster.hp).toBe(62);
        expect(monster.attackPower).toBe(28);
        expect(monster.defencePower).toBe(10);
	});

    test("モンスターのIDが144で、レベルが20のとき、火炎入道20のステータスと一致すること", () => {
        const monster: Monster = monsterJson[144];
        const level = 20;
        calculateIncreasedStatusByMonsterLevelUp(monster, level);
        expect(monster.hp).toBe(138);
        expect(monster.attackPower).toBe(47);
        expect(monster.defencePower).toBe(18);
	});

    test("モンスターのIDが144で、レベルが30のとき、火炎入道30のステータスと一致すること", () => {
        const monster: Monster = monsterJson[144];
        const level = 30;
        calculateIncreasedStatusByMonsterLevelUp(monster, level);
        expect(monster.hp).toBe(178);
        expect(monster.attackPower).toBe(57);
        expect(monster.defencePower).toBe(22);
	});

    test("モンスターのIDが144で、レベルが40のとき、火炎入道40のステータスと一致すること", () => {
        const monster: Monster = monsterJson[144];
        const level = 40;
        calculateIncreasedStatusByMonsterLevelUp(monster, level);
        expect(monster.hp).toBe(218);
        expect(monster.attackPower).toBe(67);
        expect(monster.defencePower).toBe(26);
	});

    test("モンスターのIDが144で、レベルが50のとき、火炎入道50のステータスと一致すること", () => {
        const monster: Monster = monsterJson[144];
        const level = 50;
        calculateIncreasedStatusByMonsterLevelUp(monster, level);
        expect(monster.hp).toBe(258);
        expect(monster.attackPower).toBe(77);
        expect(monster.defencePower).toBe(30);
	});

    test("モンスターのIDが144で、レベルが99のとき、火炎入道99のステータスと一致すること", () => {
        const monster: Monster = monsterJson[144];
        const level = 99;
        calculateIncreasedStatusByMonsterLevelUp(monster, level);
        expect(monster.hp).toBe(454);
        expect(monster.attackPower).toBe(126);
        expect(monster.defencePower).toBe(49);
	});
});

describe("calculateKiguniTribeStatusTest", () => {
    test("モンスターのIDが145で、レベルが1のとき、キグニ族のステータスと一致すること", () => {
        const monster: Monster = monsterJson[145];
        const level = 1;
        calculateIncreasedStatusByMonsterLevelUp(monster, level);
        expect(monster.hp).toBe(60);
        expect(monster.attackPower).toBe(28);
        expect(monster.defencePower).toBe(13);
	});

    test("モンスターのIDが145で、レベルが20のとき、キグニ族20のステータスと一致すること", () => {
        const monster: Monster = monsterJson[145];
        const level = 20;
        calculateIncreasedStatusByMonsterLevelUp(monster, level);
        expect(monster.hp).toBe(136);
        expect(monster.attackPower).toBe(66);
        expect(monster.defencePower).toBe(21);
	});
    
    test("モンスターのIDが145で、レベルが30のとき、キグニ族30のステータスと一致すること", () => {
        const monster: Monster = monsterJson[145];
        const level = 30;
        calculateIncreasedStatusByMonsterLevelUp(monster, level);
        expect(monster.hp).toBe(176);
        expect(monster.attackPower).toBe(86);
        expect(monster.defencePower).toBe(25);
	});
    
    test("モンスターのIDが145で、レベルが40のとき、キグニ族40のステータスと一致すること", () => {
        const monster: Monster = monsterJson[145];
        const level = 40;
        calculateIncreasedStatusByMonsterLevelUp(monster, level);
        expect(monster.hp).toBe(216);
        expect(monster.attackPower).toBe(106);
        expect(monster.defencePower).toBe(29);
	});
    
    test("モンスターのIDが145で、レベルが50のとき、キグニ族50のステータスと一致すること", () => {
        const monster: Monster = monsterJson[145];
        const level = 50;
        calculateIncreasedStatusByMonsterLevelUp(monster, level);
        expect(monster.hp).toBe(256);
        expect(monster.attackPower).toBe(126);
        expect(monster.defencePower).toBe(33);
	});
    
    test("モンスターのIDが145で、レベルが99のとき、キグニ族99のステータスと一致すること", () => {
        const monster: Monster = monsterJson[145];
        const level = 99;
        calculateIncreasedStatusByMonsterLevelUp(monster, level);
        expect(monster.hp).toBe(452);
        expect(monster.attackPower).toBe(224);
        expect(monster.defencePower).toBe(52);
	});
});

describe("calculateNdoobaStatusTest", () => {
    test("モンスターのIDが146で、レベルが1のとき、ンドゥバのステータスと一致すること", () => {
        const monster: Monster = monsterJson[146];
        const level = 1;
        calculateIncreasedStatusByMonsterLevelUp(monster, level);
        expect(monster.hp).toBe(15);
        expect(monster.attackPower).toBe(5);
        expect(monster.defencePower).toBe(5);
	});

    test("モンスターのIDが146で、レベルが20のとき、ンドゥバはたちのステータスと一致すること", () => {
        const monster: Monster = monsterJson[146];
        const level = 20;
        calculateIncreasedStatusByMonsterLevelUp(monster, level);
        expect(monster.hp).toBe(72);
        expect(monster.attackPower).toBe(24);
        expect(monster.defencePower).toBe(9);
	});

    test("モンスターのIDが146で、レベルが30のとき、ンドゥバみそじのステータスと一致すること", () => {
        const monster: Monster = monsterJson[146];
        const level = 30;
        calculateIncreasedStatusByMonsterLevelUp(monster, level);
        expect(monster.hp).toBe(102);
        expect(monster.attackPower).toBe(34);
        expect(monster.defencePower).toBe(11);
	});

    test("モンスターのIDが146で、レベルが60のとき、ンドゥバかんれきのステータスと一致すること", () => {
        const monster: Monster = monsterJson[146];
        const level = 60;
        calculateIncreasedStatusByMonsterLevelUp(monster, level);
        expect(monster.hp).toBe(192);
        expect(monster.attackPower).toBe(64);
        expect(monster.defencePower).toBe(17);
	});

    test("モンスターのIDが146で、レベルが70のとき、ンドゥバこきのステータスと一致すること", () => {
        const monster: Monster = monsterJson[146];
        const level = 70;
        calculateIncreasedStatusByMonsterLevelUp(monster, level);
        expect(monster.hp).toBe(222);
        expect(monster.attackPower).toBe(74);
        expect(monster.defencePower).toBe(15);
	});

    
    test("モンスターのIDが146で、レベルが77のとき、ンドゥバきじゅのステータスと一致すること", () => {
        const monster: Monster = monsterJson[146];
        const level = 77;
        calculateIncreasedStatusByMonsterLevelUp(monster, level);
        expect(monster.hp).toBe(185);
        expect(monster.attackPower).toBe(60);
        expect(monster.defencePower).toBe(11);
	});

    test("モンスターのIDが146で、レベルが88のとき、ンドゥバべいじゅのステータスと一致すること", () => {
        const monster: Monster = monsterJson[146];
        const level = 88;
        calculateIncreasedStatusByMonsterLevelUp(monster, level);
        expect(monster.hp).toBe(130);
        expect(monster.attackPower).toBe(38);
        expect(monster.defencePower).toBe(6);
	});

    test("モンスターのIDが146で、レベルが90のとき、ンドゥバそつじゅのステータスと一致すること", () => {
        const monster: Monster = monsterJson[146];
        const level = 90;
        calculateIncreasedStatusByMonsterLevelUp(monster, level);
        expect(monster.hp).toBe(120);
        expect(monster.attackPower).toBe(34);
        expect(monster.defencePower).toBe(5);
	});

    test("モンスターのIDが146で、レベルが99のとき、ンドゥバはくじゅのステータスと一致すること", () => {
        const monster: Monster = monsterJson[146];
        const level = 99;
        calculateIncreasedStatusByMonsterLevelUp(monster, level);
        expect(monster.hp).toBe(50);
        expect(monster.attackPower).toBe(16);
        expect(monster.defencePower).toBe(0);
	});
});