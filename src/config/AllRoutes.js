// RESOURCES
// https://ui.dev/react-router-nested-routes

import React from "react";
import { Routes, Route } from "react-router-dom";
import AppPage from "../components/layouts/AppPage";
import AboutPage from "../components/pages/landing/AboutPage";
import LandingPage from "../components/pages/landing/LandingPage";
import PageNotFound from "../components/pages/main-app/PageNotFound";

const AllRoutes = () => {
    return (
        <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route exact path="about" element={<AboutPage />} />
            <Route path="app/*" element={<AppPage />} />

            {/* </Route> */}
            <Route path="*" exact={true} element={<PageNotFound/>} />
        </Routes>
    );
}

export default AllRoutes;