export const checkModifierValue = (modifierValue: string): number => {
    let replacedModifierValue = Number(modifierValue);

    if (modifierValue === "" || modifierValue === "+") {
        replacedModifierValue = 0;
    }
    
    if (modifierValue === "-") {
        replacedModifierValue = -1;
    }

    return replacedModifierValue;
}