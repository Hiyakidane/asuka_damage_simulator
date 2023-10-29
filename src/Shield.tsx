import React, { useState } from "react";

import {
    Avatar,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";

export const Shield = () => {
    const shieldList1 = [
        { id: 0, name: "装備なし", seal: "-", defencePower: 0, seals: 0, category: "通常盾", effect: "-" },
        { id: 1, name: "鍛えた木の盾", seal: "-", defencePower: 2, seals: 1, category: "通常盾", effect: "-" },
        { id: 2, name: "みやびやかな盾", seal: "-", defencePower: 2, seals: 7, category: "通常盾", effect: "-" },
        { id: 3, name: "青銅甲の盾", seal: "-", defencePower: 5, seals: 5, category: "通常盾", effect: "-" },
        { id: 4, name: "鉄甲の盾", seal: "-", defencePower: 9, seals: 5, category: "通常盾", effect: "-" },
        { id: 5, name: "獣王の盾", seal: "-", defencePower: 12, seals: 4, category: "通常盾", effect: "-" },
        { id: 6, name: "風魔の盾", seal: "-", defencePower: 16, seals: 6, category: "通常盾", effect: "-" },
        { id: 7, name: "星神輿ノ盾", seal: "-", defencePower: 30, seals: 10, category: "通常盾", effect: "失っても倒れたダンジョンの同じ階、または星華の大筒の最下層の左側に復活している" },
        { id: 8, name: "ラセン風魔の盾", seal: "-", defencePower: 99, seals: 8, category: "通常盾", effect: "特殊合成盾。風魔の盾に[金山識眠う見飯身]の印をつけると作成できる（順不同）" },
        { id: 9, name: "皮の盾", seal: "皮", defencePower: 2, seals: 5, category: "特殊能力盾", effect: "おなかの減るスピードが半分になる" },
        { id: 10, name: "見切りの盾", seal: "見", defencePower: 2, seals: 5, category: "特殊能力盾", effect: "敵の攻撃をかわしやすくなる" },
        { id: 11, name: "やまびこの盾", seal: "山", defencePower: 3, seals: 5, category: "特殊能力盾", effect: "魔法をはね返す" },
        { id: 12, name: "トドの盾", seal: "ト", defencePower: 4, seals: 6, category: "特殊能力盾", effect: "盗みを働くモンスターから、ギタンやアイテムを守ることができる" },
        { id: 13, name: "金の盾", seal: "金", defencePower: 4, seals: 4, category: "特殊能力盾", effect: "盾がサビなくなる" },
        { id: 14, name: "地雷ナバリの盾", seal: "爆", defencePower: 5, seals: 5, category: "特殊能力盾", effect: "地雷などの、爆発によるダメージを50%軽減する" },
        { id: 15, name: "どんぶりの盾", seal: "丼", defencePower: 5, seals: 3, category: "特殊能力盾", effect: "ダメージを受けると、満腹度が1%回復する" },
        { id: 16, name: "身かわしの盾", seal: "身", defencePower: 5, seals: 4, category: "特殊能力盾", effect: "飛んできたアイテムをよける" },
        { id: 17, name: "うろこの盾", seal: "う", defencePower: 6, seals: 5, category: "特殊能力盾", effect: "毒を受けなくなる" },
        { id: 18, name: "ドラゴンシールド", seal: "竜", defencePower: 10, seals: 3, category: "特殊能力盾", effect: "炎によるダメージを50%軽減" },
        { id: 19, name: "矛の盾", seal: "-", defencePower: 7, seals: 5, category: "両手持ち盾", effect: "防御力の分だけ攻撃力も上がる" },
        { id: 20, name: "グランドカウンター", seal: "-", defencePower: 9, seals: 9, category: "両手持ち盾", effect: "敵から受けたダメージを全て相手にはね返す" },
        { id: 21, name: "黄泉巫女神ノ盾", seal: "-", defencePower: 50, seals: 16, category: "両手持ち盾", effect: "様々な良い効果がある" },
    ]

    const shieldList2 = [
        { id: 22, name: "サトリの盾", seal: "サ", defencePower: 1, seals: 1, category: "特殊能力盾", effect: "おなかが減らなくなる。ただし、一度でも装備すると最大満腹度が1％になってしまい、装備を外しても元に戻らない。特殊合成盾。重装の盾に[重重重]の印を合成すると作成できる" },
        { id: 23, name: "おまつりの盾", seal: "祭", defencePower: 4, seals: 5, category: "特殊能力盾", effect: "仲間・エレキ箱1体につき基本守備力が+10される" },
        { id: 24, name: "ゴムバンの盾", seal: "ゴ", defencePower: 5, seals: 3, category: "特殊能力盾", effect: "電撃攻撃を無効にできる" },
        { id: 25, name: "ガマラの盾", seal: "銭", defencePower: 5, seals: 5, category: "特殊能力盾", effect: "ダメージを受けると、ダメージの10%だけギタンがもらえる" },
        { id: 26, name: "バトルカウンター", seal: "バ", defencePower: 5, seals: 6, category: "特殊能力盾", effect: "敵から受けたダメージの一部を相手にはね返す" },
        { id: 27, name: "しあわせの盾", seal: "幸", defencePower: 6, seals: 5, category: "特殊能力盾", effect: "ダメージを受けると、ダメージの20%だけ経験値がもらえる" },
        { id: 28, name: "不動の盾", seal: "不", defencePower: 8, seals: 3, category: "特殊能力盾", effect: "自分の意思以外で動かなくなる、おなかの減るスピードが2倍になる" },
        { id: 29, name: "重装の盾", seal: "重", defencePower: 12, seals: 5, category: "特殊能力盾", effect: "おなかの減るスピードが2倍になる" },
        { id: 30, name: "正面戦士の盾", seal: "正", defencePower: 30, seals: 5, category: "特殊能力盾", effect: "正面3方向への防御力が2倍になる。ただし、それ以外の5方向への防御力は0になり、さらに2倍のダメージを受ける" },
        { id: 31, name: "使い捨ての盾", seal: "捨", defencePower: 40, seals: 3, category: "特殊能力盾", effect: "ダメージを受けるたび、盾の強さが1減っていく" },
    ]

    const shieldList = shieldList1.concat(shieldList2);

    const arrowList = [
        { id: 1, name: "銀の矢", seal: "銀", defencePower: 0, seals: 0, category: "矢", effect: "投げたときに遠投効果" },
    ]

    const foodList = [
        { id: 1, name: "おにぎり", seal: "飯", defencePower: 0, seals: 0, category: "食料", effect: "ダメージを受けると、確率で自分がおにぎりに変化する" },
    ]

    const grassList = [
        { id: 1, name: "薬草", seal: "薬", defencePower: 0, seals: 0, category: "草", effect: "ダメージを受けると、HPが2回復する" },
        { id: 2, name: "命の草", seal: "命", defencePower: 0, seals: 0, category: "草", effect: "盾の基本守備力が+3される" },
        { id: 3, name: "毒消し草", seal: "消", defencePower: 0, seals: 0, category: "草", effect: "毒をうけない" },
        { id: 4, name: "超不幸の種", seal: "超", defencePower: 0, seals: 0, category: "草", effect: "ダメージを受けると、レベルが1ダウンする" },
        { id: 5, name: "弟切草", seal: "弟", defencePower: 0, seals: 0, category: "草", effect: "攻撃時にHPが4回復する" },
        { id: 6, name: "ドラゴン草", seal: "火", defencePower: 0, seals: 0, category: "草", effect: "炎のダメージが減る" },
        { id: 7, name: "しあわせ草", seal: "幸", defencePower: 0, seals: 0, category: "草", effect: "ダメージを受けると、経験値がもらえる" },
        { id: 8, name: "不幸の種", seal: "不", defencePower: 0, seals: 0, category: "草", effect: "基本守備力が3低下する" },
        { id: 9, name: "天使の種", seal: "天", defencePower: 0, seals: 0, category: "草", effect: "ダメージを受けると、経験値が多めにもらえる" },
    ]

    const scrollList = [
        { id: 1, name: "識別の巻物", seal: "識", defencePower: 0, seals: 0, category: "巻物", effect: "ダメージを受けると、敵の正体がわかる" },
        { id: 2, name: "引き上げの巻物", seal: "帰", defencePower: 0, seals: 0, category: "巻物", effect: "倒れても印がついた装備がなくならない(1回のみ)" },
        { id: 3, name: "おはらいの巻物", seal: "祓", defencePower: 0, seals: 0, category: "巻物", effect: "装備品が呪われなくなる" },
        { id: 4, name: "バクスイの巻物", seal: "眠", defencePower: 0, seals: 0, category: "巻物", effect: "ダメージを受けると、1/16で敵を眠らせる" },
    ]

    const [shield, setShield] = useState({ id: 0, name: "", seal: "-", defencePower: 0, seals: 0, effect: "" });
    const [synthsisSeals, setSynthsisSeals] = useState([]);
    const [correctionValue, setCorrectionValue] = useState("");
    const [correctionValueError, setCorrectionValueError] = useState(false);
    const [correctionValueHelperText, setCorrectionValueErrorHelperText] = useState("");

    const handleChange = (event: SelectChangeEvent) => {
        resetShieldSettings();

        const shieldId = Number(event.target.value);

        setShield(shieldList[shieldId]);
    }

    const changeCorrection = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const inputValue = event.target.value;

        const existsSign = (value) => {
            let result = false;
            const firstStr = value.slice(0, 1);
            if (firstStr === "+" || firstStr === "-") {
                result = true;
                return result;
            }
        }

        // 盾が未選択
        if (shield.id === 0) {
            setCorrectionValueErrorHelperText("盾を選択してください。");
            return;
        }

        // 削除時処理
        if (inputValue === "") {
            setCorrectionValue("");
            setCorrectionValueErrorHelperText("");
            return;
        }

        // +-のみはスルー
        if (existsSign(inputValue) && inputValue.length === 1) {
            setCorrectionValue(inputValue);
            setCorrectionValueErrorHelperText("");
            return;
        }

        const secondNumericRegex = /[1-9]/;
        const firstNumericRegex = /[0-9]/;

        if (existsSign(inputValue)) {
            const secondStr = inputValue.slice(1, 2);
            const firstStr = inputValue.slice(2, 3);

            if (!secondNumericRegex.test(secondStr) && inputValue.length > 1) {
                setCorrectionValueError(true);
                setCorrectionValueErrorHelperText("数値を入力してください。また、2桁目には0を入力できません。");
                return;
            }

            if (!firstNumericRegex.test(firstStr) && inputValue.length === 3) {
                setCorrectionValueError(true);
                setCorrectionValueErrorHelperText("数値を入力してください。また、2桁目には0を入力できません。");
                return;
            }

            if (inputValue.length > 3) {
                setCorrectionValueError(true);
                setCorrectionValueErrorHelperText("数値は2桁まで入力可能です。");
                return;
            }
        } else {
            const secondStr = inputValue.slice(0, 1);
            const firstStr = inputValue.slice(1, 2);
            if (!secondNumericRegex.test(secondStr)) {
                setCorrectionValueError(true);
                setCorrectionValueErrorHelperText("数値を入力してください。また、2桁目には0を入力できません。");
                return;
            }

            if (!firstNumericRegex.test(firstStr) && inputValue.length === 2) {
                setCorrectionValueError(true);
                setCorrectionValueErrorHelperText("数値を入力してください。また、2桁目には0を入力できません。");
                return;
            }

            if (inputValue.length > 2) {
                setCorrectionValueError(true);
                setCorrectionValueErrorHelperText("数値は2桁まで入力可能です。");
                return;
            }
        }

        // 修正値を基本値以上にマイナスに出来ない処理
        const numericInputValue = parseInt(inputValue);
        if (numericInputValue < -shield.defencePower) {
            setCorrectionValueError(true);
            setCorrectionValueErrorHelperText("修正値を武器の攻撃力未満にできません。");
            return;
        }

        if (numericInputValue > -1) {
            setCorrectionValue("+" + numericInputValue);
        } else {
            setCorrectionValue(inputValue);
        }

        setCorrectionValueError(false);
        setCorrectionValueErrorHelperText("");
    }

    // 盾一覧を表示する
    const displayShieldList = () => {
        const list = [];

        for (let i = 0; i < shieldList.length; i++) {
            list.push(
                <MenuItem key={shieldList[i].id} value={shieldList[i].id}>{shieldList[i].name}</MenuItem>
            );
        }

        return (
            list
        );
    }

    // 印数に印を追加する
    const addSeal = (array, id: number) => {
        if (shield.seals > synthsisSeals.length) {
            synthsisSeals.push(array[id].seal);

            const list = [];

            for (let i = 0; i < synthsisSeals.length; i++) {
                list.push(synthsisSeals[i]);
            }

            setSynthsisSeals(list);
        }
    }

    // 盾に追加された印を削除する
    const deleteSeal = (i: number) => {
        synthsisSeals.map((seal, index) => {
            if (index === i) {
                synthsisSeals.splice(index, 1);
            }
        })
        setSynthsisSeals([...synthsisSeals]);
    }

    // ベースの盾に合成した印を表示する
    const displaySynthsisSeals = () => {
        const list = [];

        for (let i = 0; i < synthsisSeals.length; i++) {
            list.push(
                <Avatar key={i} sx={{ width: 24, height: 24 }}>
                    <Button onClick={() => deleteSeal(i)}>
                        {synthsisSeals[i]}
                    </Button>
                </Avatar>
            );
        }

        return (
            list
        );
    }

    // 合成可能印を表示する
    const displaySyntheticPossibleSeals = (array) => {
        const list = [];

        for (let i = 0; i < array.length; i++) {
            if (array[i].seal !== "-") {
                list.push(
                    <Tooltip title={array[i].effect}>
                        <Avatar key={i} sx={{ width: 24, height: 24 }}>
                            <Button onClick={() => addSeal(array, i)}>
                                {array[i].seal}
                            </Button>
                        </Avatar>
                    </Tooltip>
                );
            }
        }

        return (
            list
        );
    }

    // 盾に設定された修正値と合成印を消去する
    const resetShieldSettings = () => {
        setShield({ id: 0, name: "", seal: "-", defencePower: 0, seals: 0, effect: "" });
        setCorrectionValue("");
        setSynthsisSeals([]);
    }

    return (
        <Stack>
            <FormControl fullWidth>
                <Stack direction="row">
                    <InputLabel id="demo-simple-select-label">盾</InputLabel>
                    <Select
                        sx={{ width: 300 }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="shield"
                        value={shield.id.toString()}
                        onChange={handleChange}
                    >
                        {displayShieldList()}
                    </Select>
                    <TextField
                        error={correctionValueError}
                        label="修正値"
                        variant="outlined"
                        value={correctionValue}
                        sx={{ width: 100 }}
                        //inputProps={{ maxLength: 3 }}
                        onChange={(e) => changeCorrection(e)}
                    >
                    </TextField>
                </Stack>
            </FormControl>
            <Typography sx={{ color: "red" }}>{correctionValueHelperText}</Typography>
            <Stack>
                <Stack direction="row">
                    名前:{shield.name}{correctionValue}
                </Stack>
                <h1>防御力:{shield.defencePower}</h1>
                <h1>印:{shield.seal}</h1>
                <h1>印数:{shield.seals}</h1>
            </Stack>
            <Stack direction="row">
                合成印:{displaySynthsisSeals()}
            </Stack>
            合成可能印
            <Stack>
                <Stack direction="row">
                    特能印:{displaySyntheticPossibleSeals(shieldList1)}
                </Stack>
                <Stack direction="row">
                    特能印:{displaySyntheticPossibleSeals(shieldList2)}
                </Stack>
                <Stack direction="row">
                    異種印:
                    {displaySyntheticPossibleSeals(grassList)}
                </Stack>
                <Stack direction="row">
                    異種印:
                    {displaySyntheticPossibleSeals(arrowList)}
                    {displaySyntheticPossibleSeals(foodList)}
                    {displaySyntheticPossibleSeals(scrollList)}
                </Stack>
            </Stack>
        </Stack>
    )
};