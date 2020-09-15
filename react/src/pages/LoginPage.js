import React from "react";
import Background from "../layout/Background";
import {UserLoginCard, UserAuthGrid} from "../layout/UserAuthCard";

function LoginPage() {
    return <Background>
        <UserAuthGrid>
            <UserLoginCard />
        </UserAuthGrid>
    </Background>
}

export default LoginPage;