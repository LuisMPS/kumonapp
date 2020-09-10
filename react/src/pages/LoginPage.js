import React from "react";
import Header from "../layout/Header";
import {UserLogin} from "../components/apps/UserAuth";

function LoginPage() {
    return <>
        <Header />
        <UserLogin />
    </>
}

export default LoginPage;