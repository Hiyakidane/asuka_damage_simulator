import React from "react";

import {
    Stack,
    TableContainer,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    Tooltip,
    Typography,
} from "@mui/material";

import { useAsukaParameter } from "../hooks/useAsukaParameter";

export const Result = (props) => {
    const { characterStatus, selectedWeapon, selectedShield, selectedMonster } = props;

    const [
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
    ] = useAsukaParameter(characterStatus, selectedWeapon, selectedShield, selectedMonster);

    // 通常攻撃のダメージ
    // 会心の一撃のダメージ
    // 各飛び道具のダメージ
    // 被ダメージ
    // 痛恨の一撃の被ダメージ

    return (
        <Stack sx={{ minWidth: 600, minHeight: 600 }}>
            <TableContainer sx={{ width: "500px" }}>
                <Table sx={{
                    "& .MuiTableCell-sizeMedium": {
                        padding: 1
                    },
                }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Tooltip title="アスカがモンスターに与えるダメージ">
                                    <Typography>与ダメージ</Typography>
                                </Tooltip>
                            </TableCell>
                            <TableCell>
                                <Tooltip title="ダメージ幅(攻撃力*0.875)">
                                    <Typography>最小</Typography>
                                </Tooltip>
                            </TableCell>
                            <TableCell>
                                <Tooltip title="ダメージ幅(攻撃力*1)">
                                    <Typography>中間</Typography>
                                </Tooltip>
                            </TableCell>
                            <TableCell>
                                <Tooltip title="ダメージ幅(攻撃力*1.125)">
                                    <Typography>最小</Typography>
                                </Tooltip>
                            </TableCell>
                            <TableCell>
                                <Tooltip title="最小ダメージで何回攻撃すれば倒せるか">
                                    <Typography>確殺数</Typography>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>通常攻撃<br />回復量</TableCell>
                            <TableCell>{normalAttackDamage[0]}<br />{normalAttackTotalHealingAmount[0]}</TableCell>
                            <TableCell>{normalAttackDamage[1]}<br />{normalAttackTotalHealingAmount[1]}</TableCell>
                            <TableCell>{normalAttackDamage[2]}<br />{normalAttackTotalHealingAmount[2]}</TableCell>
                            <TableCell>{displayAsukaNumberOfAttacksRequiredWithNormalAttack}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>会心の一撃(2倍)<br />回復量</TableCell>
                            <TableCell>{criticalHitAttackDamage[0]}<br />{criticalHitAttackTotalHealingAmount[0]}</TableCell>
                            <TableCell>{criticalHitAttackDamage[1]}<br />{criticalHitAttackTotalHealingAmount[1]}</TableCell>
                            <TableCell>{criticalHitAttackDamage[2]}<br />{criticalHitAttackTotalHealingAmount[2]}</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>木の矢</TableCell>
                            <TableCell>{woodenArrowDamage[0]}</TableCell>
                            <TableCell>{woodenArrowDamage[1]}</TableCell>
                            <TableCell>{woodenArrowDamage[2]}</TableCell>
                            <TableCell>{displayAsukaNumberOfAttacksRequiredWithWoodenArrow}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>鉄の矢</TableCell>
                            <TableCell>{ironArrowDamage[0]}</TableCell>
                            <TableCell>{ironArrowDamage[1]}</TableCell>
                            <TableCell>{ironArrowDamage[2]}</TableCell>
                            <TableCell>{displayAsukaNumberOfAttacksRequiredWithIronArrow}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>銀の矢</TableCell>
                            <TableCell>{silverArrowDamage[0]}</TableCell>
                            <TableCell>{silverArrowDamage[1]}</TableCell>
                            <TableCell>{silverArrowDamage[2]}</TableCell>
                            <TableCell>{displayAsukaNumberOfAttacksRequiredWithSilverArrow}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>かまいたちの矢</TableCell>
                            <TableCell>{razorArrowDamage[0]}</TableCell>
                            <TableCell>{razorArrowDamage[1]}</TableCell>
                            <TableCell>{razorArrowDamage[2]}</TableCell>
                            <TableCell>{displayAsukaNumberOfAttacksRequiredWithRazorArrow}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>デブータの石</TableCell>
                            <TableCell>{porkyRockDamage[0]}</TableCell>
                            <TableCell>{porkyRockDamage[1]}</TableCell>
                            <TableCell>{porkyRockDamage[2]}</TableCell>
                            <TableCell>{displayAsukaNumberOfAttacksRequiredWithPorkyRock}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>会心の矢</TableCell>
                            <TableCell>{criticalArrowDamage[0]}</TableCell>
                            <TableCell>{criticalArrowDamage[1]}</TableCell>
                            <TableCell>{criticalArrowDamage[2]}</TableCell>
                            <TableCell>{displayAsukaNumberOfAttacksRequiredWithCriticalHitArrow}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>会心の一撃(1.5倍)</TableCell>
                            <TableCell>{criticalHitArrowDamage[0]}</TableCell>
                            <TableCell>{criticalHitArrowDamage[1]}</TableCell>
                            <TableCell>{criticalHitArrowDamage[2]}</TableCell>
                        </TableRow>
                    </TableBody>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Tooltip title="モンスターがアスカに与えるダメージ">
                                    <Typography>被ダメージ</Typography>
                                </Tooltip>
                            </TableCell>
                            <TableCell>
                                <Tooltip title="ダメージ幅(攻撃力*0.875)">
                                    <Typography>最小</Typography>
                                </Tooltip>
                            </TableCell>
                            <TableCell>
                                <Tooltip title="ダメージ幅(攻撃力*1)">
                                    <Typography>中間</Typography>
                                </Tooltip>
                            </TableCell>
                            <TableCell>
                                <Tooltip title="ダメージ幅(攻撃力*1.125)">
                                    <Typography>最大</Typography>
                                </Tooltip>
                            </TableCell>
                            <TableCell>
                                <Tooltip title="最大ダメージで何回攻撃されたら倒れるか">
                                    <Typography>確殺数</Typography>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>通常攻撃<br />回復量</TableCell>
                            <TableCell>{normalDamageTaken[0]}<br />{normalDamageTakenTotalHealingAmount}</TableCell>
                            <TableCell>{normalDamageTaken[1]}<br />{normalDamageTakenTotalHealingAmount}</TableCell>
                            <TableCell>{normalDamageTaken[2]}<br />{normalDamageTakenTotalHealingAmount}</TableCell>
                            <TableCell>{displayMonsterNumberOfAttacksRequiredWithNormalAttack}</TableCell>
                        </TableRow>
                        {selectedMonster.id === 135 || selectedMonster.id === 136 || selectedMonster.id === 137 ?
                            <TableRow>
                                <TableCell>痛恨の一撃(1.3倍)<br />回復量</TableCell>
                                <TableCell>{criticalHitDamageTakenByTaur[0]}<br />{normalDamageTakenTotalHealingAmount}</TableCell>
                                <TableCell>{criticalHitDamageTakenByTaur[1]}<br />{normalDamageTakenTotalHealingAmount}</TableCell>
                                <TableCell>{criticalHitDamageTakenByTaur[2]}<br />{normalDamageTakenTotalHealingAmount}</TableCell>
                                <TableCell>{displayMonsterNumberOfAttacksRequiredWithCriticalHitAttack}</TableCell>
                            </TableRow>
                            : ""
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Stack direction="row" spacing={1}>
                <Stack>
                    <div>武器の基本値:{displayWeaponBasicValue}</div>
                    <div>盾　の基本値:{displayShieldBasicValue}</div>
                </Stack>
                <Stack>
                    <div>攻撃力:{displayAsukaAttackPower}</div>
                    <div>防御力:{displayAsukaDefencePower}</div>
                </Stack>
            </Stack>
        </Stack>
    )
};