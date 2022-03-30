import React from "react"
import { Layout } from "antd"
import { Routes, Route } from "react-router-dom"
import LandingPage from "../components/pages/landing/LandingPage"

const LandingRoutes = () => {
    return (
        <Routes>
            <Route exact path="/" element={<LandingPage />} />
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