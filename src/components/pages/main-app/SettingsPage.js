import React, {useContext} from "react";
import { FirebaseContext } from "../../../service/firebase/fbContext";

const Settings = () => {
    const {authUser} = useContext(FirebaseContext);
    return (
        <div style={{height: '100vh'}}>
            <h1>Settings</h1>
            <h3>Logged in as: {authUser.email ? authUser.email : "none"}</h3>
        </div>
    );
}

export default Settings;