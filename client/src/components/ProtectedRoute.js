import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute(props) {
    // Modify this
    const isLogin = useSelector((state) => state.user.isLogin);

    return (
        <Route path={props.path} render={() => (isLogin) ? props.children : <Redirect to={"/"}/>}/>
    );
}

export default ProtectedRoute;
