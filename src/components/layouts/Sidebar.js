// RESOURCES
// https://github.com/SudeepTimalsina/ReactAnt/blob/master/src/components/layouts/sidebar.tsx
// https://create-react-app.dev/docs/adding-images-fonts-and-files/
// https://ant.design/components/icon/
// https://reactrouter.com/docs/en/v6
// https://reactrouter.com/docs/en/v6/getting-started/tutorial

import React from "react";
import { Menu } from "antd";
import {
    AudioTwoTone,
    CalendarTwoTone,
    BookTwoTone,
    TrophyTwoTone,
    SettingTwoTone,
    LogoutOutlined,
} from '@ant-design/icons';
// import { ReactComponent as Logo } from './src/assets/images/logo-blue-teal.svg';
import Logo from './logo-blue-teal.svg';
import { Link, Outlet, useNavigate } from "react-router-dom";

const SidebarNav = () => {
    const history = useNavigate();

    const handleRecordClick = () => {
        history("/app/record");
    }

    const handleGoalClick = () => {
        history("/app/goal");
    }

    const handleLearnClick = () => {
        history("/app/learn");
    }

    const handleAchievementClick = () => {
        history("/app/achievement");
    }

    const handleSettingClick = () => {
        history("/app/setting");
    }

    const handleLogoutClick = () => {
        history("/");
    }

    return (
        <div>
            <div style={{height: "32px", margin: "16px"}}>
                <Link to="/app">
                    <img src={Logo} alt="logo" style={{height: "32px", width: "32px", margin: "8px"}}/>
                    <h1>Minute</h1>
                </Link>
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" >
                    <Link to="record">
                        <AudioTwoTone />
                        <span> Record</span>
                    </Link>
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
            <Outlet />
        </div>
    )
}

export default SidebarNav;