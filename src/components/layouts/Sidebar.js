// RESOURCES
// https://github.com/SudeepTimalsina/ReactAnt/blob/master/src/components/layouts/sidebar.tsx
// https://create-react-app.dev/docs/adding-images-fonts-and-files/
// https://ant.design/components/icon/
// https://reactrouter.com/docs/en/v6
// https://reactrouter.com/docs/en/v6/getting-started/tutorial

import React, {useContext} from "react";
import { Menu } from "antd";
import {
    AudioOutlined,
    CalendarTwoTone,
    BookTwoTone,
    TrophyTwoTone,
    SettingTwoTone,
    LogoutOutlined,
    LoginOutlined
} from '@ant-design/icons';
// import { ReactComponent as Logo } from './src/assets/images/logo-blue-teal.svg';
import { useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth, provider } from '../../firebase/fbConfig';
import { FirebaseContext } from "../../firebase/fbContext";

const SidebarNav = () => {
    const history = useNavigate();

    const handleRecordClick = () => {
        history("/record");
    }

    const handleGoalClick = () => {
        history("/goal");
    }

    const handleLearnClick = () => {
        history("/learn");
    }

    const handleAchievementClick = () => {
        history("/achievement");
    }

    const handleSettingClick = () => {
        history("/settings");
    }

    const handleLogoutClick = () => {
        fbSignOut();
        history("/");
    }
    const handleLoginClick = () => {
        fbSignIn();
        history("/");
    }

    const {authUser} = useContext(FirebaseContext);
    console.log(authUser);
    const navigate = useNavigate();

    const fbSignIn = async () => {
        provider.setCustomParameters({ prompt: 'select_account' });
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // redux action? --> dispatch({ type: SET_USER, user });
                console.log("Logged in with Google: "+user);
                navigate('/settings');
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log("Error with Google log-in: "+errorMessage);
            });
    };

    const fbSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("logged out");
            navigate("/");
        })
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
                {authUser.loggedIn ?
                    <Menu.Item key="6" onClick={handleLogoutClick}>
                        <LogoutOutlined />
                        <span> Logout</span>
                    </Menu.Item>
                    :
                    <Menu.Item key="6" onClick={handleLoginClick}>
                        <LoginOutlined />
                        <span> Login</span>
                    </Menu.Item>
                }
            </Menu>
        </div>
    )
}

export default SidebarNav;