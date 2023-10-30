// React
import React from "react";

import { Header } from "./Header";
import { Content } from "./Content";
import { Footer } from "./Footer";
import { Stack } from "@mui/material";

export const Top = () => {
    return (
        <Stack spacing={2}>
            <Header></Header>
            <Content></Content>
            <Footer></Footer>
        </Stack>
    );
}