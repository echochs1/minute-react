// RESOURCES
// https://github.com/SudeepTimalsina/ReactAnt/blob/master/src/components/layouts/sidebar.tsx
// https://create-react-app.dev/docs/adding-images-fonts-and-files/
// https://ant.design/components/icon/
// https://reactrouter.com/docs/en/v6
// https://reactrouter.com/docs/en/v6/getting-started/tutorial

import React, {useContext} from "react";
import { Menu } from "antd";
import {
    AudioTwoTone,
    CalendarTwoTone,
    BookTwoTone,
    // TrophyTwoTone,
    SettingTwoTone,
    // LogoutOutlined,
    // LoginOutlined,
    ClockCircleTwoTone,
    RightSquareTwoTone,
    LeftSquareTwoTone
} from '@ant-design/icons';
// import { ReactComponent as Logo } from './src/assets/images/logo-blue-teal.svg';
import Logo from './logo-blue-teal.svg';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { fbSignIn, fbSignOut } from '../../service/firebase/fbConfig';
import { FirebaseContext } from "../../service/firebase/fbContext";
import { setTwoToneColor } from '@ant-design/icons';

const SidebarNav = () => {
    setTwoToneColor('#6FCDB4');

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

    const handleHistoryClick = () => {
        history("/app/history");
    }

    const handleSettingClick = () => {
        history("/app/setting");
    }

    const handleLogoutClick = () => {
        fbSignOut();
        history("/");
    }
    const handleLoginClick = () => {
        fbSignIn();
        // history("/app/record");  // happens before sign in completes
    }


    // FIREBASE AUTH FUNCTIONS
    const {authUser} = useContext(FirebaseContext);

    return (
        <div>
            <div style={{height: "3rem", margin: "1rem"}}>
                <Link to="/app" style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <img src={Logo} alt="logo" style={{height: "32px", width: "32px", margin: "8px"}}/>
                    {/* <h1>Minute</h1> */}
                </Link>
            </div>
            <Menu theme="dark" style={{ background:'#1D3953' }} mode="inline" defaultSelectedKeys={['1']}>
            {/* <Menu theme="light" mode="inline"> -> for no default selection */}
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
                <Menu.Item key="4" onClick={handleHistoryClick}>
                    <ClockCircleTwoTone />
                    <span> History</span>
                </Menu.Item>
                {/* <Menu.Item key="5" onClick={handleSettingClick}>
                    <SettingTwoTone />
                    <span> Settings</span>
                </Menu.Item> */}
                {authUser.loggedIn ?
                    <Menu.Item key="6" onClick={handleLogoutClick}>
                        <RightSquareTwoTone />
                        <span> Logout</span>
                    </Menu.Item>
                    :
                    <Menu.Item key="6" onClick={handleLoginClick}>
                        <LeftSquareTwoTone />
                        <span> Login</span>
                    </Menu.Item>
                }
            </Menu>
            <Outlet />
        </div>
    )
}

export default SidebarNav;