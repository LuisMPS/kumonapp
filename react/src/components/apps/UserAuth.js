import React from "react";
import {FlashCard} from "../cards/Cards";
import {UserLoginForm, UserRegisterForm} from "../forms/UserForm";

function UserLogin() {
    return <>
        <UserLoginForm renders = {{
        renderError: () => <FlashCard duration = {2500} type = "error">No se pudo autenticar</FlashCard>
        }}/>;
        <a href = "/register">Regístrate aquí</a>
    </>
}

function UserRegister() {
    return <>
        <UserRegisterForm renders = {{
        renderError: () => <FlashCard duration = {2500} type = "error">No se pudo registrar</FlashCard>
        }}/>;
        <a href = "/login">Click aquí para ingresar</a>
    </>
}

export {UserLogin, UserRegister};