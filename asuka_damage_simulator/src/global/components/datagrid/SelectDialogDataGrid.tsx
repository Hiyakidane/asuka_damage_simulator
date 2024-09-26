import React from "react";
import { useState, useCallback } from "react";

import {
    DataGrid,
    GridCellParams,
    GridColDef,
    GridFilterModel,
    GridRowSpacingParams,
    GridToolbarContainer,
    GridToolbarFilterButton,
} from "@mui/x-data-grid";

import {
    Box,
    Button,
    Dialog,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack
} from "@mui/material";

import { jaJP } from "./jaJP";

export const SelectDialogDataGrid = (props) => {
    const {
        item,
        itemJson,
        dataGridColumns,
        handleItemChange,
        filterTargets,
        filterTargetField,
        inputLabelName,
    } = props;

    const [rows, setRows] = useState(itemJson);

    const [columns, setColumns] = useState<GridColDef[]>(dataGridColumns);

    const [filterModel, setFilterModel] = useState<GridFilterModel>({
        items: [
        ]
    })

    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    const onFilterChange = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        let value = event.currentTarget.value;

        if (value === "リセット") {
            value = null;
        }

        setFilterModel(
            {
                items: [
                    {
                        columnField: filterTargetField,
                        value: value,
                        operatorValue: 'contains'
                    },
                ]
            }
        )
    }

    const openDialog = () => {
        setDialogIsOpen(true);
    }

    const closeDialog = () => {
        setDialogIsOpen(false);
    };

    const onCellClickHandler = (params: GridCellParams) => {
        handleItemChange(params.row.id);
        closeDialog();
    }

    const CustomToolbar = () => {
        return (
            <GridToolbarContainer>
                <GridToolbarFilterButton placeholder="フィルター" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                {
                    <Stack direction="row">
                        {filterTargets.map((value, index) => (
                            <Button key={index} value={value} onClick={onFilterChange}>{value}</Button>
                        ))}
                    </Stack>
                }
            </GridToolbarContainer>
        )
    }

    const getRowSpacing = useCallback((params: GridRowSpacingParams) => {
        return {
            top: 10,
        };
    }, []);

    return (
        <React.Fragment>
            <FormControl>
                <InputLabel id="item-select-label">{inputLabelName}</InputLabel>
                <Select
                    onClick={() => openDialog()}
                    label="item"
                    labelId="item-select-label"
                    id="item-select"
                    value={item.id.toString()}
                    sx={{ width: 220, height: 56 }}
                    disabled
                >
                    {rows.map((row) => (
                        <MenuItem key={row.id} value={row.id}>{row.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Dialog
                open={dialogIsOpen}
                onClose={closeDialog}
                maxWidth="xl"
                fullWidth
            >

                <Box sx={{ height: 800 }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        rowsPerPageOptions={[100]}
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                        getRowHeight={() => "auto"}
                        getRowSpacing={getRowSpacing}
                        filterModel={filterModel}
                        onFilterModelChange={(model) => setFilterModel(model)}
                        localeText={jaJP.components.MuiDataGrid.defaultProps.localeText}
                        components={{
                            Toolbar: CustomToolbar,
                        }}
                        onCellClick={(event) => onCellClickHandler(event)}
                    />
                </Box>
            </Dialog>
        </React.Fragment>
    )
}
