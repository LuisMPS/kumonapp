import React from "react";
import ToggleButton from "../toggle/ToggleButton";
import {FlashCard} from "../cards/Cards";
import {UserLoginForm, UserRegisterForm} from "../forms/UserForm";

function UserLogin() {
    return <>
        <UserLoginForm renders = {{renderError: () => <FlashCard duration = {2500} type = "error">No se pudo autenticar</FlashCard>}}/>
        <ToggleButton isConfirm caption = "Registar" renders = {{
        renderExpanded: () => <UserRegisterForm renders = {{
            renderSuccess: () => <FlashCard duration = {2500} type = "success">Usuario registrado correctamente!</FlashCard>,
            renderError: () => <FlashCard duration = {2500} type = "error">No se pudo registrar</FlashCard>
        }}/>}}/>
    </>;
}

export default UserLogin;