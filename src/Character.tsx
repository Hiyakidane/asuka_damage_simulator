import React, { useRef, useState } from "react";

import {
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stack,
    SelectChangeEvent,
    TextField,
    Slider,
    FormControlLabel,
    Checkbox,
    Radio,
    FormLabel,
    RadioGroup,
    Dialog,
    Button,
} from "@mui/material";

export const Character = () => {
    const statusList = [
        { id: 1, name: "イカリ" },
        { id: 2, name: "ファイト" },
        { id: 3, name: "乱舞" },
        { id: 4, name: "錯乱" }
    ]

    const regex = /^[0-9\b]+$/;

    const [level, setLevel] = useState<string>("");
    const [HP, setHP] = useState<string>("");
    const [power, setPower] = useState<string>("");

    const [levelError, setLevelError] = useState(false);
    const [HPError, setHPError] = useState(false);
    const [powerError, setPowerError] = useState(false);

    const [levelHelperText, setLevelHelperText] = useState("");
    const [HPHelperText, setHPHelperText] = useState("");
    const [PowerHelperText, setPowerHelperText] = useState("");

    const changeLevel = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event.target.value === '' || regex.test(event.target.value)) {
            setLevel(event.target.value)
            setLevelError(false);
        } else {
            setLevelError(true);
            setLevelHelperText("数値のみ");
        }
    }

    const changeHP = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event.target.value === '' || regex.test(event.target.value)) {
            setHP(event.target.value)
            setHPError(false);
        } else {
            setHPError(true);
            setHPHelperText("数値のみ");
        }
    }

    const changePower = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event.target.value === '' || regex.test(event.target.value)) {
            setPower(event.target.value)
            setPowerError(false);
        } else {
            setPowerError(true);
            setPowerHelperText("数値のみ");
        }
    }

    const handleChangePower = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPower(event.target.value);
    }

    return (
        <Stack spacing={1}>
            <h1>アスカ</h1>
            <Stack direction="row" spacing={1}>
                <TextField
                    required
                    error={levelError}
                    inputProps={{ maxLength: 2 }}
                    value={level}
                    sx={{ width: 100 }}
                    size="small"
                    label="Level"
                    variant="outlined"
                    helperText={levelHelperText}
                    onChange={(e) => changeLevel(e)}
                >
                </TextField>
                <TextField
                    required
                    error={HPError}
                    inputProps={{ maxLength: 3 }}
                    value={HP}
                    sx={{ width: 100 }}
                    size="small"
                    label="HP"
                    variant="outlined"
                    helperText={HPHelperText}
                    onChange={(e) => changeHP(e)}
                >
                </TextField>
                <TextField
                    required
                    error={powerError}
                    inputProps={{ maxLength: 3 }}
                    value={power}
                    sx={{ width: 100 }}
                    size="small"
                    label="ちから"
                    variant="outlined"
                    helperText={PowerHelperText}
                    onChange={(e) => changePower(e)}
                >
                </TextField>
            </Stack>

            <Stack>
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">焼き回数によるちからの設定:</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="0"
                        name="radio-buttons-group"
                        onChange={handleChangePower}
                    >
                        <Stack>
                            <Stack direction="row">
                                <FormControlLabel value={18} control={<Radio />} label="1" />
                                <FormControlLabel value={28} control={<Radio />} label="2" />
                                <FormControlLabel value={38} control={<Radio />} label="3" />
                                <FormControlLabel value={48} control={<Radio />} label="4" />
                                <FormControlLabel value={58} control={<Radio />} label="5" />
                            </Stack>
                            <Stack direction="row">
                                <FormControlLabel value={68} control={<Radio />} label="6" />
                                <FormControlLabel value={78} control={<Radio />} label="7" />
                                <FormControlLabel value={88} control={<Radio />} label="8" />
                                <FormControlLabel value={98} control={<Radio />} label="9" />
                                <FormControlLabel value={108} control={<Radio />} label="10" />
                            </Stack>
                        </Stack>
                    </RadioGroup>
                </FormControl>
            </Stack>
            状態
            <Stack direction="row">
                {
                    statusList.map((row) => (
                        <FormControlLabel key={row.id} control={<Checkbox />} label={row.name} />
                    ))
                }
            </Stack>
        </Stack >
    )
};