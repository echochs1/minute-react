import React, { useState } from "react";
import { Layout } from "antd";
import SidebarNav from "./Sidebar";
import ApplicationRoutes from "../../config/ApplicationRoutes";

const { Header, Sider, Content } = Layout;


const AppLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout>
            <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} style={{background: "#FFF" }} >
                <SidebarNav />
            </Sider>
            <Layout>
                <Header className="siteLayoutBackground" style={{ padding: 0, background: "#F7FAFC" }}>
                </Header>
                <Content style={{ margin: "0.5rem", padding: 0, minHeight: "calc(100vh - 114px)", background: "#fff" }}>
                    <ApplicationRoutes />
                </Content>
            </Layout>
        </Layout>
    );
}

export default AppLayout;