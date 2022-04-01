import React from "react"
import { Layout } from "antd"
import { Routes, Route } from "react-router-dom"
import LandingPage from "../components/pages/landing/LandingPage"
import AboutPage from "../components/pages/landing/AboutPage"

const LandingRoutes = () => {
    return (
        <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route exact path="/about" element={<AboutPage />} />
        </Routes>
    )
}

const LandingPageRoutes = () => {
    return (
        <Layout>
            <LandingRoutes />
        </Layout>
    )
}

export default LandingPageRoutes;