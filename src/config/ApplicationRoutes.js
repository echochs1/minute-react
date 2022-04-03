// RESOURCES
// https://medium.com/wesionary-team/how-to-implement-ant-design-with-react-7d21b6e261cc
// https://github.com/SudeepTimalsina/ReactAnt/blob/master/src/config/ApplicationRoutes.tsx

import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../components/pages/main-app/HomePage";
import Record from "../components/pages/main-app/RecordOptionsPage";
import Goals from "../components/pages/main-app/GoalsPage";
import Learn from "../components/pages/main-app/LearnPage";
import Achievements from "../components/pages/main-app/AchievementsPage";
import Settings from "../components/pages/main-app/SettingsPage";
import PageNotFound from "../components/pages/main-app/PageNotFound";

const ApplicationRoutes = () => {
    // https://stackoverflow.com/questions/49208310/is-it-possible-to-have-multiple-switch-in-react-js
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="record" element={<Record />} />
            <Route path="goal" element={<Goals />} />
            <Route path="learn" element={<Learn />} />
            <Route path="achievement" element={<Achievements />} />
            <Route path="setting" element={<Settings />} />
            <Route path="logout" component={() => <Navigate to="/" />} />
            <Route path="*" element={<PageNotFound/>} />
        </Routes>
    )
}

export default ApplicationRoutes;