import { checkModifierValue } from "../modules/equipmentModifierValue";

// checkModifierValue = (modifierValue: string): number
describe("checkModifierValueTest", () => {
    test("修正値が空白のとき、修正値に0が設定されること", () => {
        const modifierValue = "";
        const result = checkModifierValue(modifierValue);
        expect(result).toBe(0);
    });

    test("修正値が+だけのとき、修正値に0が設定されること", () => {
        const modifierValue = "+";
        const result = checkModifierValue(modifierValue);
        expect(result).toBe(0);
    });

    test("修正値が-だけのとき、修正値に-1が設定されること", () => {
        const modifierValue = "-";
        const result = checkModifierValue(modifierValue);
        expect(result).toBe(-1);
    });
});