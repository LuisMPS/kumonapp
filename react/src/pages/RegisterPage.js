import React from "react";
import Header from "../layout/Header";
import {UserRegister} from "../components/apps/UserAuth";

function RegisterPage() {
    return <>
        <Header />
        <UserRegister />
    </>
}

export default RegisterPage;