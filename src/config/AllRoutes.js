// RESOURCES
// https://ui.dev/react-router-nested-routes

import React from "react";
import { Routes, Route } from "react-router-dom";
import AppLayout from "../components/layouts/AppLayout";
import OneMinRecordLayout from "../components/layouts/OneMinRecordLayout";
import AboutPage from "../components/pages/landing/AboutPage";
import LandingPage from "../components/pages/landing/LandingPage";
import PageNotFound from "../components/pages/main-app/PageNotFound";

const AllRoutes = () => {
    return (
        <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route exact path="about" element={<AboutPage />} />
            <Route path="app/*" element={<AppLayout />} />
            <Route path="one-min" element={<OneMinRecordLayout />} />
            <Route path="*" exact={true} element={<PageNotFound/>} />
        </Routes>
    );
}

export default AllRoutes;