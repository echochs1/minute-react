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
    TrophyTwoTone,
    SettingTwoTone,
    LogoutOutlined,
    LoginOutlined
} from '@ant-design/icons';
// import { ReactComponent as Logo } from './src/assets/images/logo-blue-teal.svg';
import Logo from './logo-blue-teal.svg';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider, signOut, linkWithCredential } from 'firebase/auth';
import { auth, provider } from '../../service/firebase/fbConfig';
import { FirebaseContext } from "../../service/firebase/fbContext";

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
        fbSignOut();
    }
    const handleLoginClick = () => {
        fbSignIn();
    }


    // FIREBASE AUTH FUNCTIONS
    const {authUser} = useContext(FirebaseContext);
    console.log(authUser);

    const fbSignIn = async () => {
        const isAnon = authUser.isAnonymous;
        provider.setCustomParameters({ prompt: 'select_account' });
            signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log("Logged in with Google: "+user);
                // Check if the user was signed in anonymously, if so link the account
                if(isAnon) {
                    linkWithCredential(auth.currentUser, credential)
                    .then((usercred) => {
                        const user = usercred.user;
                        console.log("Anonymous account successfully upgraded", user);
                    }).catch((error) => {
                        console.log("Error upgrading anonymous account", error);
                    });
                }
                history('/app/setting');
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
            history("/");
        })
    }

    return (
        <div>
            <div style={{height: "3rem", margin: "1rem"}}>
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
            <Outlet />
        </div>
    )
}

export default SidebarNav;