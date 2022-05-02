import React from "react";
import { Layout } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import TopicSelectPage from "../pages/recording/TopicSelectPage";

const { Header, Content } = Layout;

const TopicRecordLayout = () => {
    const history = useNavigate();

    const handleCloseClick = () => {
        history("/app/record");
    }

    return (
        <Layout className="oneMinRecordLayout">
            <Header className="recordLayoutHeader">
                <div className="closeIcon">
                    <CloseOutlined onClick={handleCloseClick} />
                </div>
            </Header>
            <Content className="recordLayoutContent">
                <TopicSelectPage />
            </Content>
        </Layout>
    )
}

export default TopicRecordLayout;