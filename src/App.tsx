// React
import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";

import { Top } from "./features/contents/components/Top";

export const App = () => {
    {/*}
    return (
        <Router>
            <Routes>
                <Route path="/" Component={Top} />
            </Routes>
        </Router>
    );
    {*/}
    return (
        <>
            <Top />
        </>
    )
}