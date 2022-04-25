import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from "react-router-dom";
import { fbSignIn } from "../../../service/firebase/fbConfig";

const PageNotAuthenticated = (props) => {
    const routeAccessed = props.route;
    const navigate = useNavigate();
    const handleLoginClick = () => {
        fbSignIn();
        navigate("/app/" + routeAccessed);
    }
    return (
    <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={<Button type="primary" onClick={handleLoginClick}>Log In</Button>}
    />
    );
};

export default PageNotAuthenticated;