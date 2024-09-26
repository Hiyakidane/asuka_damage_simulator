import React from "react";

import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stack,
    TextField,
    FormControlLabel,
    Checkbox,
    Radio,
    FormLabel,
    RadioGroup,
    Tooltip,
} from "@mui/material";

import { useCharacter } from "../hooks/useCharacter";

export const Character = (props) => {
    const { changeCharacterStatus } = props;

    const [
        levelState,
        HPState,
        powerState,
        friends,
        {
            handleLevelChange,
            handleHPChange,
            handlePowerChange,
            handleFriendsChange,
            handlePowerChangeRadioButton,
            handleStatusChange,
            handleChangeBracelet
        }
    ] = useCharacter(changeCharacterStatus);

    const statusList = [
        { id: 0, name: "イカリ", keyName: "isAngryState", effect: "ダメージが2倍になる" },
        { id: 1, name: "ファイト", keyName: "isFightState", effect: "攻撃力が1.5倍になる" },
        { id: 2, name: "乱舞", keyName: "isWildDanceState", effect: "ダメージが2倍になる。防御力が0になる" },
        { id: 3, name: "錯乱", keyName: "isConfusionState", effect: "攻撃力が1.5倍になる。防御力が0になる。キグニ状態" }
    ]

    const braceletList = [
        { id: 0, name: "まもり1", keyName:"isEquippedProtectBracelet1", effect: "被ダメージを25%軽減する" },
        { id: 1, name: "まもり2", keyName:"isEquippedProtectBracelet2", effect: "被ダメージを25%軽減する。2つ装着すると50%軽減" },
        { id: 2, name: "痛恨", keyName:"isEquippedRegretBracelet", effect: "痛恨ダメージ 1.5倍。タウロス系の痛恨の一撃とは重複しない" },
    ]

    // 仲間の数を表示する
    const displayFriends = () => {
        const list = [];

        // エレキ箱+NPCの最大数は5
        for (let i = 0; i < 6; i++) {
            list.push(
                <MenuItem key={i} value={i}>{i}</MenuItem>
            );
        }

        return list;
    }

    return (
        <Stack spacing={1}>
            <Stack direction="row" spacing={1}>
                <TextField
                    required
                    error={levelState.error}
                    inputProps={{ maxLength: 2 }}
                    value={levelState.level}
                    name="level"
                    sx={{ width: 80 }}
                    //size="small"
                    label="Level"
                    variant="outlined"
                    helperText={levelState.helperText}
                    onChange={(e) => handleLevelChange(e)}
                    onBlur={(e) => handleLevelChange(e)}
                >
                </TextField>
                <TextField
                    required
                    error={HPState.error}
                    inputProps={{ maxLength: 3 }}
                    value={HPState.HP}
                    name="HP"
                    sx={{ width: 90 }}
                    //size="small"
                    label="HP"
                    variant="outlined"
                    helperText={HPState.helperText}
                    onChange={(e) => handleHPChange(e)}
                    onBlur={(e) => handleHPChange(e)}
                >
                </TextField>
                <TextField
                    required
                    error={powerState.error}
                    inputProps={{ maxLength: 2 }}
                    value={powerState.power}
                    name="power"
                    sx={{ width: 90 }}
                    //size="small"
                    label="ちから"
                    variant="outlined"
                    helperText={powerState.helperText}
                    onChange={(e) => handlePowerChange(e)}
                    onBlur={(e) => handlePowerChange(e)}
                >
                </TextField>
                <FormControl>
                    <InputLabel id="select-label">仲間数</InputLabel>
                    <Select
                        sx={{ width: 80 }}
                        labelId="select-label"
                        id="select"
                        label="friends"
                        value={String(friends)}
                        onChange={handleFriendsChange}
                    >
                        {displayFriends()}
                    </Select>
                </FormControl>
            </Stack>

            <Stack>
                <FormControl>
                    <FormLabel id="radio-buttons-group-label">焼き回数によるちからの設定:</FormLabel>
                    <RadioGroup
                        aria-labelledby="radio-buttons-group-label"
                        defaultValue="0"
                        name="radio-buttons-group"
                        onChange={handlePowerChangeRadioButton}
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
                                <FormControlLabel value={8} control={<Radio />} label="0" />
                            </Stack>
                        </Stack>
                    </RadioGroup>
                </FormControl>
            </Stack>
            状態
            <Stack direction="row">
                {
                    statusList.map((row) => (
                        <Tooltip key={row.id} title={row.effect}>
                            <FormControlLabel
                                label={row.name}
                                control={
                                    <Checkbox id={String(row.id)} value={row.name} name={row.keyName} onChange={handleStatusChange} />
                                }
                            />
                        </Tooltip>
                    ))
                }
            </Stack>
            腕輪
            <Stack direction="row">
                {
                    braceletList.map((row) => (
                        <Tooltip key={row.id} title={row.effect}>
                            <FormControlLabel
                                label={row.name}
                                control={
                                    <Checkbox id={String(row.id)} value={row.name} name={row.keyName} onChange={handleChangeBracelet} />
                                }
                            />
                        </Tooltip>
                    ))
                }
            </Stack>

        </Stack >
    )
};