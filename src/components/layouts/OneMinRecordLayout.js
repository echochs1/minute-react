import React, { useState } from "react";
import { Layout, Statistic } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import OneMinPage from "../pages/recording/OneMinPage";

const { Header, Content } = Layout;

const OneMinRecordLayout = () => {
    const history = useNavigate();

    const handleCloseClick = () => {
        history("/app/record");
    }

    return (
        <Layout className="oneMinRecordLayout">
            <Header className="recordLayoutHeader">
                <div className="closeIcon">
                    {/* <Link to="/app/record"> */}
                        <CloseOutlined onClick={handleCloseClick} />
                    {/* </Link> */}
                </div>
            </Header>
            <Content className="recordLayoutContent">
                <OneMinPage />
            </Content>
        </Layout>
    )
}

export default OneMinRecordLayout;