import React, { useState } from "react";

import {
    Avatar,
    Button,
    Dialog,
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
import { Box } from "@mui/system";

export const Weapon = (props) => {
    const { selectedWeapon } = props;

    const normalWeaponList = [
        { id: 0, name: "装備なし", attackPower: 0, seal: "-", seals: 0, category: "片手剣", effect: "-" },
        { id: 1, name: "鍛えた木刀", attackPower: 2, seal: "-", seals: 1, category: "片手剣", effect: "-" },
        { id: 2, name: "こんぼう", attackPower: 3, seal: "-", seals: 3, category: "片手剣", effect: "-" },
        { id: 3, name: "長巻", attackPower: 5, seal: "-", seals: 4, category: "片手剣", effect: "-" },
        { id: 4, name: "カタナ", attackPower: 8, seal: "-", seals: 5, category: "片手剣", effect: "-" },
        { id: 5, name: "どうたぬき", attackPower: 10, seal: "-", seals: 6, category: "片手剣", effect: "-" },
        { id: 6, name: "剛剣マンジカブラ", attackPower: 18, seal: "-", seals: 6, category: "片手剣", effect: "-" },
        { id: 7, name: "天神楽ノ剣", attackPower: 30, seal: "-", seals: 10, category: "片手剣", effect: "失っても倒れたダンジョンの同じ階または星華の大筒の最下層の右側に復活している" },
        { id: 8, name: "火迅風魔刀", attackPower: 35, seal: "-", seals: 4, category: "片手剣", effect: "特殊合成武器。印をすべて埋めたカタナ+99を鍛冶屋で鍛えると作成できる" },
        { id: 9, name: "秘剣カブラステギ", attackPower: 99, seal: "-", seals: 8, category: "片手剣", effect: "特殊合成武器。剛剣マンジカブラに[竜月目水回仏捨木]の印をつけると作成できる（順不同）" },
    ]

    const specialAttackWeaponList = [
        { id: 10, name: "成仏のカマ", attackPower: 4, seal: "仏", seals: 5, category: "片手剣", effect: "ゴースト系に1.5倍のダメージ" },
        { id: 11, name: "マリンスラッシャー", attackPower: 5, seal: "水", seals: 5, category: "片手剣", effect: "水棲系に1.5倍のダメージ、水中の敵を攻撃できる" },
        { id: 12, name: "1ツ目殺し", attackPower: 6, seal: "目", seals: 4, category: "片手剣", effect: "1ツ目系に1.5倍のダメージ" },
        { id: 13, name: "ドレインバスター", attackPower: 6, seal: "ド", seals: 5, category: "片手剣", effect: "ドレイン系に1.5倍のダメージ" },
        { id: 14, name: "三日月刀", attackPower: 6, seal: "月", seals: 4, category: "片手剣", effect: "爆弾系に1.5倍のダメージ" },
        { id: 15, name: "ドラゴンキラー", attackPower: 15, seal: "竜", seals: 3, category: "片手剣", effect: "ドラゴン系に1.5倍のダメージ" },
        { id: 16, name: "龍神剣", attackPower: 25, seal: "龍", seals: 7, category: "片手剣", effect: "ドラゴン系に2倍のダメージ" },
    ]

    const specialAbilityWeaponList1 = [
        { id: 18, name: "衰弱の枝", attackPower: 1, seal: "衰", seals: 3, category: "片手剣", effect: "攻撃力を25%下げる。衰弱状態（HPが徐々に減少）にする" },
        { id: 17, name: "つるはし", attackPower: 2, seal: "堀", seals: 5, category: "片手剣", effect: "壁を掘れる。その際武器が壊れることがある" },
        { id: 19, name: "妖刀かまいたち", attackPower: 2, seal: "三", seals: 4, category: "片手剣", effect: "正面3方向を一度に攻撃できる" },
        { id: 20, name: "根性の竹刀", attackPower: 3, seal: "根", seals: 2, category: "片手剣", effect: "100回振る（素振りも含む）度にちからが1上がる" },
        { id: 21, name: "金の剣", attackPower: 3, seal: "金", seals: 5, category: "片手剣", effect: "武器がサビなくなる" },
        { id: 22, name: "必中の剣", attackPower: 3, seal: "必", seals: 3, category: "片手剣", effect: "攻撃が必ず当たる" },
        { id: 23, name: "回復の剣", attackPower: 6, seal: "回", seals: 3, category: "片手剣", effect: "与えたダメージの1/3だけ自分のHPを回復する。" },
        { id: 24, name: "鉄扇", attackPower: 8, seal: "扇", seals: 2, category: "片手剣", effect: "盾の基本守備力が+3される" },
        { id: 25, name: "ミノタウロスの斧", attackPower: 20, seal: "会", seals: 8, category: "両手持ち武器", effect: "1/4の確率で会心の一撃が出る" },

    ]

    const specialAbilityWeaponList2 = [
        { id: 26, name: "サトリのつるはし", attackPower: 8, seal: "サ", seals: 4, category: "片手剣", effect: "武器が壊れることなく壁が掘れる" },
        { id: 27, name: "ガマラのムチ", attackPower: 2, seal: "銭", seals: 4, category: "片手剣", effect: "敵を倒した時ギタンを落としやすくなる" },
        { id: 28, name: "にぎりへんげの剣", attackPower: 3, seal: "に", seals: 4, category: "片手剣", effect: "敵を倒した時おにぎりを落としやすくなる" },
        { id: 29, name: "かつおぶし", attackPower: 4, seal: "か", seals: 2, category: "片手剣", effect: "「かじる」コマンドで満腹度を30%回復できる。ただし強さが1下がってしまう。" },
        { id: 30, name: "車輪のやいば", attackPower: 4, seal: "車", seals: 3, category: "片手剣", effect: "投げてキャラクターにぶつけても無くならない。火に投げると燃えるので注意。" },
        { id: 31, name: "背水の剣", attackPower: 5, seal: "背", seals: 4, category: "片手剣", effect: "HPが最大HPの10%未満になると必中＆会心になる" },
        { id: 32, name: "ケンゴウのカタナ", attackPower: 7, seal: "ケ", seals: 4, category: "片手剣", effect: "攻撃する時武器を弾き飛ばすことがある" },
        { id: 33, name: "使い捨ての剣", attackPower: 35, seal: "捨", seals: 3, category: "片手剣", effect: "敵にダメージを与える度に修正値が1マイナスされる" },
        { id: 39, name: "木づち", attackPower: 12, seal: "木", seals: 4, category: "両手持ち武器", effect: "ワナを壊せるが、武器が壊れることがある" },
        { id: 34, name: "モーニングスター", attackPower: 5, seal: "-", seals: 6, category: "両手持ち武器", effect: "8方向へ攻撃できる" },
        { id: 35, name: "如意棒", attackPower: 5, seal: "-", seals: 4, category: "両手持ち武器", effect: "敵に攻撃すると自分が1マス後ろへ下がる" },
        { id: 36, name: "アイアンヘッドの頭", attackPower: 9, seal: "-", seals: 7, category: "両手持ち武器", effect: "3マス先まで攻撃できる" },
        { id: 37, name: "ヤリ", attackPower: 10, seal: "-", seals: 8, category: "両手持ち武器", effect: "2マス先まで攻撃できる(貫通)" },
        { id: 38, name: "ぶっとびハンマー", attackPower: 10, seal: "-", seals: 7, category: "両手持ち武器", effect: "敵に攻撃すると敵を3マス吹き飛ばす" },
        { id: 40, name: "黄泉水底ノ鎖", attackPower: 50, seal: "-", seals: 16, category: "両手持ち武器", effect: "様々な良い効果がある" },
    ]

    const weaponList = normalWeaponList.concat(specialAttackWeaponList).concat(specialAbilityWeaponList1).concat(specialAbilityWeaponList2);

    const arrowList = [
        { id: 1, name: "銀の矢", attackPower: 0, seal: "銀", seals: 0, category: "飛び道具", effect: "壁の中にいる敵を攻撃できる。角越しの敵も攻撃可能" },
    ]

    const foodList = [
        { id: 1, name: "おにぎり", attackPower: 0, seal: "飯", seals: 0, category: "食料", effect: "倒した敵がたまにおにぎりを落とすようになる" },
    ]

    const grassList = [
        { id: 1, name: "薬草", attackPower: 0, seal: "薬", seals: 0, category: "草", effect: "攻撃時にHPが2回復する" },
        { id: 2, name: "命の草", attackPower: 0, seal: "命", seals: 0, category: "草", effect: "効果なし" },
        { id: 3, name: "超不幸の種", attackPower: 0, seal: "超", seals: 0, category: "草", effect: "攻撃時にレベルが1ダウンする" },
        { id: 4, name: "弟切草", attackPower: 0, seal: "弟", seals: 0, category: "草", effect: "攻撃時にHPが4回復する" },
        { id: 5, name: "ドラゴン草", attackPower: 0, seal: "火", seals: 0, category: "草", effect: "HPが満タンのとき炎を飛ばせる" },
        { id: 6, name: "ちからの種", attackPower: 0, seal: "ち", seals: 0, category: "草", effect: "基本攻撃力が2上昇する" },
        { id: 7, name: "しあわせ草", attackPower: 0, seal: "幸", seals: 0, category: "草", effect: "敵を倒した時の経験値が1.1倍になる" },
        { id: 8, name: "不幸の種", attackPower: 0, seal: "不", seals: 0, category: "草", effect: "基本攻撃力が10低下する" },
        { id: 9, name: "天使の種", attackPower: 0, seal: "天", seals: 0, category: "草", effect: "敵を倒した時の経験値が1.5倍になる" },
    ]

    const scrollList = [
        { id: 1, name: "識別の巻物", attackPower: 0, seal: "識", seals: 0, category: "巻物", effect: "攻撃した敵の正体がわかる" },
        { id: 2, name: "引き上げの巻物", attackPower: 0, seal: "帰", seals: 0, category: "巻物", effect: "倒れても印がついた装備がなくならない(1回のみ)" },
        { id: 3, name: "おはらいの巻物", attackPower: 0, seal: "祓", seals: 0, category: "巻物", effect: "装備品が呪われなくなる" },
        { id: 4, name: "バクスイの巻物", attackPower: 0, seal: "眠", seals: 0, category: "巻物", effect: "攻撃時に1/8で敵を眠らせる" },
        { id: 5, name: "メッキの巻物", attackPower: 0, seal: "金", seals: 0, category: "巻物", effect: "武器がサビなくなる。" },
    ]

    const [weapon, setWeapon] = useState({ id: 0, name: "", attackPower: 0, seal: "-", seals: 0, category: "", effect: "" });
    const [correctionValue, setCorrectionValue] = useState("");
    const [synthsisSeals, setSynthsisSeals] = useState([]);

    const [correctionValueError, setCorrectionValueError] = useState(false);
    const [correctionValueHelperText, setCorrectionValueErrorHelperText] = useState("");

    const handleChange = (event: SelectChangeEvent) => {
        resetWeaponSettings();

        const weaponId = Number(event.target.value);

        setWeapon(weaponList[weaponId]);
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

        // 剣が未選択
        if (weapon.id === 0) {
            setCorrectionValueErrorHelperText("剣を選択してください。");
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
        if (numericInputValue < -weapon.attackPower) {
            setCorrectionValueError(true);
            setCorrectionValueErrorHelperText("修正値を武器の攻撃力未満にできません。");
            return;
        }

        // 数値が0以上ならば+を付加
        if (numericInputValue > -1) {
            setCorrectionValue("+" + numericInputValue);
        } else {
            setCorrectionValue(inputValue);
        }

        setCorrectionValueError(false);
        setCorrectionValueErrorHelperText("");
    }

    const displayWeaponList = () => {
        const list = [];

        for (let i = 0; i < weaponList.length; i++) {
            list.push(
                <MenuItem key={weaponList[i].id} value={weaponList[i].id}>{weaponList[i].name}</MenuItem>
            );
        }

        return (
            list
        );
    }

    // 印数に印を追加する
    const addSeal = (array, id: number) => {
        if (weapon.seals > synthsisSeals.length) {
            synthsisSeals.push(array[id].seal);

            const list = [];

            for (let i = 0; i < synthsisSeals.length; i++) {
                list.push(synthsisSeals[i]);
            }

            setSynthsisSeals(list);
        }
    }

    // 剣に追加された印を削除する
    const deleteSeal = (i: number) => {
        synthsisSeals.map((seal, index) => {
            if (index === i) {
                synthsisSeals.splice(index, 1);
            }
        })
        setSynthsisSeals([...synthsisSeals]);
    }

    // ベースの剣に合成した印を表示する
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

    // 剣に設定された修正値と合成印を消去する
    const resetWeaponSettings = () => {
        setWeapon({ id: 0, name: "", attackPower: 0, seal: "-", seals: 0, category: "", effect: "" });
        setCorrectionValue("");
        setSynthsisSeals([]);
    }

    return (
        <Stack>
            <FormControl fullWidth>
                <Stack direction="row">
                    <InputLabel id="demo-simple-select-label">剣</InputLabel>
                    <Select
                        sx={{ width: 300 }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="weapon"
                        value={weapon.id.toString()}
                        onChange={handleChange}
                    >
                        {displayWeaponList()}
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
                    名前:{weapon.name}{correctionValue}
                </Stack>
                <h1>攻撃力:{weapon.attackPower}</h1>
                <h1>印:{weapon.seal}</h1>
                <h1>印数:{weapon.seals}</h1>
            </Stack>
            <Stack direction="row">
                合成印:{displaySynthsisSeals()}
            </Stack>
            合成可能印
            <Stack>
                <Stack direction="row">
                    特攻印:{displaySyntheticPossibleSeals(specialAttackWeaponList)}
                </Stack>
                <Stack direction="row">
                    特能印:{displaySyntheticPossibleSeals(specialAbilityWeaponList1)}
                </Stack>
                <Stack direction="row">
                    特能印:{displaySyntheticPossibleSeals(specialAbilityWeaponList2)}
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
            </Stack >
        </Stack >
    )
};