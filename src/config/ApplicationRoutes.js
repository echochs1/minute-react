// RESOURCES
// https://medium.com/wesionary-team/how-to-implement-ant-design-with-react-7d21b6e261cc
// https://github.com/SudeepTimalsina/ReactAnt/blob/master/src/config/ApplicationRoutes.tsx

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import Home from "../components/pages/HomePage";
import Record from "../components/pages/RecordOptionsPage";
import Goals from "../components/pages/GoalsPage";
import Learn from "../components/pages/LearnPage";
import Achievements from "../components/pages/AchievementsPage";
import Settings from "../components/pages/SettingsPage";

import { Layout } from "antd";
// import {
//     MenuUnfoldOutlined,
//     MenuFoldOutlined
// } from '@ant-design/icons';
import SidebarNav from "../components/layouts/Sidebar";

const { Header, Sider, Content } = Layout;

const ApplicationRoutes = () => {
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        window.innerWidth < 768 ? setCollapsed(true) : setCollapsed(false);
    }, []);

    const handleToggle = () => {
        collapsed ? setCollapsed(false) : setCollapsed(true);
    }

    return (
        <Router>
            <Layout>
                <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} >
                    <SidebarNav />
                </Sider>
                <Layout>
                    <Header className="siteLayoutBackground" style={{ padding: 0, background: "#001529" }}>
                    </Header>
                    {/* <Content style={{ margin: "24px 16px 0", padding: 24, minHeight: "calc(100vh - 114px)", background: "#fff" }}> */}
                        {/* <Routes> */}
                            {/* <Route path="/record" component={Record} /> */}
                            {/* <Route path="/goal" component={Goals} /> */}
                            {/* <Route path="/learn" component={Learn} /> */}
                            {/* <Route path="/achievement" component={Achievements} /> */}
                            {/* <Route path="/setting" component={Settings} /> */}
                            {/* <Route path="/logout" component={() => <Navigate to="/" />} /> */}
                            {/* <Route path="/" component={Home} /> */}
                        {/* </Routes> */}
                    {/* </Content> */}
                </Layout>
            </Layout>
        </Router>
    );
}

export default ApplicationRoutes;