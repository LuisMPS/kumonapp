import React from "react";
import Background from "../layout/Background";
import {UserRegisterCard, UserAuthGrid} from "../layout/UserAuthCard";

function RegisterPage() {
    return <Background>
        <UserAuthGrid>
            <UserRegisterCard />
        </UserAuthGrid>
    </Background>
}

export default RegisterPage;