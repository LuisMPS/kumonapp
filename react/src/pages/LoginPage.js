import React from "react";
import Background, {BackgroundDisplay} from "../layout/Background";
import {UserLoginCard} from "../layout/UserAuthCard";

function LoginPage() {
    return <Background>
        <BackgroundDisplay />
        <UserLoginCard />
    </Background>
}

export default LoginPage;