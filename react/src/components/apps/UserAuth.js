import React from "react";
import SnackbarCard from "../cards/SnackbarCard";
import {StyledButton} from "../styled/StyledButton";
import {UserLoginForm, UserRegisterForm} from "../forms/UserForm";

function UserLogin() {
    const buttonStyle = {marginTop: "1.5rem", marginBottom: "1rem", width: "10rem"};
    return <>
        <UserLoginForm renders = {{
            renderButton: () => <StyledButton type = "submit" variant = "contained" color = "primary" buttonStyle = {buttonStyle}>Ingresar</StyledButton>,
            renderError: () => <SnackbarCard autoHideDuration = {2500} type = "error">No se pudo autenticar</SnackbarCard>
        }}/>
    </>
}

function UserRegister() {
    const buttonStyle = {marginTop: "1.5rem", marginBottom: "1rem", width: "10rem"};
    return <>
        <UserRegisterForm renders = {{
            renderButton: () => <StyledButton type = "submit" variant = "contained" color = "primary" buttonStyle = {buttonStyle}>Registrar</StyledButton>,
            renderError: () => <SnackbarCard autoHideDuration = {2500} type = "error">No se pudo registrar</SnackbarCard>
        }}/>
    </>
}

export {UserLogin, UserRegister};