// React
import React from "react";

// MUI

//
import { Header } from "./Header";
import { Main } from "./Main";
import { Footer } from "./Footer";
import { Stack } from "@mui/material";

export const App = () => {
    return (
        <React.Fragment>
            <Stack spacing={2}>
                <Header></Header>
                <Main></Main>
                <Footer></Footer>
            </Stack>
        </React.Fragment>
    );
}