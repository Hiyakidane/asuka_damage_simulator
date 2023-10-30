import { GridColDef } from "@mui/x-data-grid";

export const monsterColumns: GridColDef[] = [
    {
        field: "id",
        headerName: "ID",
        headerAlign: "center",
        align: "center",
        width: 100,
    },
    {
        field: "name",
        headerName: "モンスター名",
        headerAlign: "center",
        align: "center",
        width: 200,
    },
    {
        field: "hp",
        headerName: "HP",
        headerAlign: "center",
        align: "center",
        width: 100,
    },
    {
        field: "attackPower",
        headerName: "攻撃力",
        headerAlign: "center",
        align: "center",
        width: 100,
    },
    {
        field: "defencePower",
        headerName: "防御力",
        headerAlign: "center",
        align: "center",
        width: 100,
    },
    {
        field: "attributes",
        headerName: "属性",
        headerAlign: "center",
        align: "left",
        width: 300,
    },
];

export const weaponColumns: GridColDef[] = [
    {
        field: "id",
        headerName: "ID",
        headerAlign: "center",
        align: "center",
        width: 100,
    },
    {
        field: "name",
        headerName: "武器名",
        headerAlign: "center",
        align: "center",
        width: 200,
    },
    {
        field: "attackPower",
        headerName: "攻撃力",
        headerAlign: "center",
        align: "center",
        width: 100,
    },
    {
        field: "defencePower",
        headerName: "防御力",
        headerAlign: "center",
        align: "center",
        width: 100,
    },
    {
        field: "attributes",
        headerName: "属性",
        headerAlign: "center",
        align: "left",
        width: 300,
    },
];
