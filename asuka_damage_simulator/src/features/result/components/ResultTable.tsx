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
import { SelectDialogDataGrid } from "../../../global/components/datagrid/SelectDialogDataGrid";

import monsterJson from "../../../../json/monster/monster.json";
import { monsterColumns } from "../../../global/components/datagrid/DataGridColumnsDefine";

export const ResultTable = (props) => {
    const monsterAttributes = ["ゴースト", "水棲", "一ツ目", "ドレイン", "爆弾", "ドラゴン", "リセット"];

    return (
        <Stack>
            <SelectDialogDataGrid
                itemJson={monsterJson}
                dataGridColumns={monsterColumns}
                filterTargets={monsterAttributes}
                filterTargetField="attributes"
                inputLabelName="モンスター"
            />
        </Stack>
    )
};