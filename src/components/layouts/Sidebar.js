// RESOURCES
// https://github.com/SudeepTimalsina/ReactAnt/blob/master/src/components/layouts/sidebar.tsx
// https://create-react-app.dev/docs/adding-images-fonts-and-files/
// https://ant.design/components/icon/

import React from "react";
import { Menu } from "antd";
import {
    AudioOutlined,
    CalendarTwoTone,
    BookTwoTone,
    TrophyTwoTone,
    SettingTwoTone,
    LogoutOutlined,
} from '@ant-design/icons';
// import { ReactComponent as Logo } from './src/assets/images/logo-blue-teal.svg';
import { useNavigate } from "react-router-dom";

const SidebarNav = () => {
    const history = useNavigate();

    const handleRecordClick = () => {
        // history.push("/record");
    }

    const handleGoalClick = () => {
        // history.push("/goal");
    }

    const handleLearnClick = () => {
        // history.push("/learn");
    }

    const handleAchievementClick = () => {
        // history.push("/achievement");
    }

    const handleSettingClick = () => {
        // history.push("/setting");
    }

    const handleLogoutClick = () => {
        // history.push("/logout");
    }

    return (
        <div>
            <div style={{height: "32px", background: "rgba(255, 255, 255, 0.2)", margin: "16px"}}></div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" onClick={handleRecordClick}>
                    <AudioOutlined />
                    <span> Record</span>
                </Menu.Item>
                <Menu.Item key="2" onClick={handleGoalClick}>
                    <CalendarTwoTone />
                    <span> Goals</span>
                </Menu.Item>
                <Menu.Item key="3" onClick={handleLearnClick}>
                    <BookTwoTone />
                    <span> Learn</span>
                </Menu.Item>
                <Menu.Item key="4" onClick={handleAchievementClick}>
                    <TrophyTwoTone />
                    <span> Achievements</span>
                </Menu.Item>
                <Menu.Item key="5" onClick={handleSettingClick}>
                    <SettingTwoTone />
                    <span> Settings</span>
                </Menu.Item>
                <Menu.Item key="6" onClick={handleLogoutClick}>
                    <LogoutOutlined />
                    <span> Logout</span>
                </Menu.Item>
            </Menu>
        </div>
    )
}

export default SidebarNav;