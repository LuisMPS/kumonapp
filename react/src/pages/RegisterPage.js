import React from "react";
import Background, {BackgroundDisplay} from "../layout/Background";
import {UserRegisterCard} from "../layout/UserAuthCard";

function RegisterPage() {
    return <Background>
        <BackgroundDisplay />
        <UserRegisterCard />
    </Background>
}

export default RegisterPage;