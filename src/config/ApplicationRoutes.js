// RESOURCES
// https://medium.com/wesionary-team/how-to-implement-ant-design-with-react-7d21b6e261cc
// https://github.com/SudeepTimalsina/ReactAnt/blob/master/src/config/ApplicationRoutes.tsx

import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../components/pages/main-app/HomePage";
import Record from "../components/pages/main-app/RecordOptionsPage";
import Goals from "../components/pages/main-app/GoalsPage";
import Learn from "../components/pages/main-app/LearnPage";
import History from "../components/pages/main-app/HistoryPage";
import Settings from "../components/pages/main-app/SettingsPage";
import PageNotFound from "../components/pages/main-app/PageNotFound";
import PageNotAuthenticated from "../components/pages/main-app/PageNotAuthenticated";
import { FirebaseContext } from "../service/firebase/fbContext";

const ApplicationRoutes = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const {authUser} = useContext(FirebaseContext);
    useEffect(() => {
        if(authUser && authUser.uid) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [authUser]);


    // https://stackoverflow.com/questions/49208310/is-it-possible-to-have-multiple-switch-in-react-js
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            {isAuthenticated ?
            <>
            <Route path="record" element={<Record />} />
            <Route path="goal" element={<Goals />} />
            <Route path="learn" element={<Learn />} />
            <Route path="history" element={<History />} />
            <Route path="setting" element={<Settings />} />
            <Route path="logout" component={() => <Navigate to="/" />} />
            <Route path="*" element={<PageNotFound/>} />
            </>
            : 
            <>
            <Route path="record" element={<PageNotAuthenticated route="record"/>} />
            <Route path="goal" element={<PageNotAuthenticated route="goal"/>} />
            <Route path="learn" element={<PageNotAuthenticated route="learn"/>} />
            <Route path="history" element={<PageNotAuthenticated route="history"/>} />
            <Route path="setting" element={<PageNotAuthenticated route="setting"/>} />
            <Route path="*" element={<PageNotFound/>} />
            </>}
        </Routes>
    )
}

export default ApplicationRoutes;