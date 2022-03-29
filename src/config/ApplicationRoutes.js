// RESOURCES
// https://medium.com/wesionary-team/how-to-implement-ant-design-with-react-7d21b6e261cc
// https://github.com/SudeepTimalsina/ReactAnt/blob/master/src/config/ApplicationRoutes.tsx

import React, { useState, useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../components/pages/HomePage";
import Record from "../components/pages/RecordOptionsPage";
import Goals from "../components/pages/GoalsPage";
import Learn from "../components/pages/LearnPage";
import Achievements from "../components/pages/AchievementsPage";
import Settings from "../components/pages/SettingsPage";
import PageNotFound from "../components/pages/PageNotFound";

import { Layout } from "antd";
import SidebarNav from "../components/layouts/Sidebar";
import { FirebaseContext } from "../firebase/fbContext";

const { Header, Sider, Content } = Layout;

const ApplicationRoutes = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {authUser} = useContext(FirebaseContext);

    return (
        <Layout>
            <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} >
                <SidebarNav />
            </Sider>
            <Layout>
                <Header className="siteLayoutBackground" style={{ padding: 0, background: "#001529" }}>
                </Header>
                <Content style={{ margin: "24px 16px 0", padding: 24, minHeight: "calc(100vh - 114px)", background: "#fff" }}>
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route path="record" element={<Record />} />
                        <Route path="goal" element={<Goals />} />
                        <Route path="/learn" element={<Learn />} />
                        <Route path="/achievement" element={<Achievements />} />
                        <Route path="/settings" element={<Settings />} />
                        {/* Check if user is logged in, click log out to redirect to home page 
                            If user is not logged in, show log in tab */}
                        {authUser.loggedIn == false ? 
                        <Route path="/logout" component={() => <Navigate to="/"/>} />
                        : <Route path="/login" component={() => <Navigate to="/settings"/>}/>
                        }
                        <Route path="*" element={<PageNotFound/>} />
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    );
}

export default ApplicationRoutes;