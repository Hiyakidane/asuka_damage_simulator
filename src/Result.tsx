import React, { useState } from "react";

import {
    Stack,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
} from "@mui/material";

export const Result = () => {
    return (
        <Stack sx={{ width: 500 }}>
            <TableContainer>
                <Table sx={{ width: 400 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>与ダメージ</TableCell>
                            <TableCell>最小</TableCell>
                            <TableCell>中間</TableCell>
                            <TableCell>最大</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>通常</TableCell>
                            <TableCell>あ</TableCell>
                            <TableCell>あ</TableCell>
                            <TableCell>あ</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>会心</TableCell>
                            <TableCell>あ</TableCell>
                            <TableCell>あ</TableCell>
                            <TableCell>あ</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>木の矢</TableCell>
                            <TableCell>あ</TableCell>
                            <TableCell>あ</TableCell>
                            <TableCell>あ</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>鉄の矢</TableCell>
                            <TableCell>あ</TableCell>
                            <TableCell>あ</TableCell>
                            <TableCell>あ</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>銀の矢</TableCell>
                            <TableCell>あ</TableCell>
                            <TableCell>あ</TableCell>
                            <TableCell>あ</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>会心の矢</TableCell>
                            <TableCell>あ</TableCell>
                            <TableCell>あ</TableCell>
                            <TableCell>あ</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>かまいたちの矢</TableCell>
                            <TableCell>あ</TableCell>
                            <TableCell>あ</TableCell>
                            <TableCell>あ</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>デブータの石</TableCell>
                            <TableCell>あ</TableCell>
                            <TableCell>あ</TableCell>
                            <TableCell>あ</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <TableContainer>
                <Table sx={{ width: 300 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>被ダメージ</TableCell>
                            <TableCell>通常</TableCell>
                            <TableCell>痛恨</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>最小</TableCell>
                            <TableCell>あ</TableCell>
                            <TableCell>あ</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>中間</TableCell>
                            <TableCell>あ</TableCell>
                            <TableCell>あ</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>最大</TableCell>
                            <TableCell>あ</TableCell>
                            <TableCell>あ</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    )
};