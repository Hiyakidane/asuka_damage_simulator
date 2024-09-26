import React from "react";

import {
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    Tooltip,
} from "@mui/material";
import { useMonster } from "../hooks/useMonster";
import { SelectDialogDataGrid } from "../../../global/components/datagrid/SelectDialogDataGrid";

import monsterJson from "../../../../json/monster/monster.json";
import { monsterColumns } from "../../../global/components/datagrid/DataGridColumnsDefine";

export const Monster = (props) => {
    const { changeSelectedMonster } = props;

    const statusList = [
        { id: 0, name: "イカリ", keyName: "isAngryState", effect: "攻撃力が2倍になる" },
        { id: 1, name: "錯乱", keyName: "isConfusionState", effect: "攻撃力が1.5倍になる。防御力が0になる。キグニ状態" }
    ]

    const monsterAttributes = ["ゴースト", "水棲", "一ツ目", "ドレイン",  "爆弾", "ドラゴン", "リセット"];

    const [
        monster,
        level,
        {
            handleMonsterChange,
            handleLevelChange,
            handleConditionChange,
        }
    ] = useMonster(
        changeSelectedMonster
    );

    const displayAttributes = () => {
        const list = [];

        for (let i = 0; i < monster.attributes.length; i++) {
            list.push(monster.attributes[i]);
            list.push(",");
        }

        list.pop();

        return (list);
    }

    // 選択されたモンスターが火炎入道やキグニ族、ンドゥバの場合レベルを表示する
    const displayLevel = () => {
        const list = [];

        for (let i = 1; i < 100; i++) {
            list.push(
                <MenuItem key={i} value={i}>{i}</MenuItem>
            );
        }

        return list;
    }

    return (
        <Stack>
            <Stack spacing={1} direction="row">
                <SelectDialogDataGrid
                    item={monster}
                    itemJson={monsterJson}
                    dataGridColumns={monsterColumns}
                    handleItemChange={handleMonsterChange}
                    filterTargets={monsterAttributes}
                    filterTargetField="attributes"
                    inputLabelName="モンスター"
                />
                {monster.id === 144 || monster.id === 145 || monster.id === 146 ?
                    <FormControl>
                        <InputLabel id="select-label">レベル</InputLabel>
                        <Select
                            sx={{ width: 100 }}
                            labelId="select-label"
                            id="select"
                            label="Level"
                            value={level.toString()}
                            onChange={handleLevelChange}
                        >
                            {displayLevel()}
                        </Select>
                    </FormControl>
                    : ""
                }
            </Stack>
            <div>名前:{monster.name}{level !== 1 ? level : ""}</div>
            <div>HP:{monster.hp}</div>
            <div>攻撃力:{monster.attackPower}</div>
            <div>防御力:{monster.defencePower}</div>
            <div>属性:{displayAttributes()}</div>
            <div>状態</div>
            <Stack direction="row">
                {
                    statusList.map((row) => (
                        <Tooltip key={row.id} title={row.effect}>
                            <FormControlLabel
                                label={row.name}
                                control={
                                    <Checkbox value={row.name} name={row.keyName} onChange={handleConditionChange} />
                                }
                            />
                        </Tooltip>
                    ))
                }
            </Stack>
        </Stack>
    )
};