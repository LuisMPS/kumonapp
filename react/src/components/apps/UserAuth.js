import React from "react";
import SnackbarCard from "../cards/SnackbarCard";
import {StyledButton} from "../styled/StyledButton";
import {UserLoginForm, UserRegisterForm} from "../forms/UserForm";
import {FormContained} from "../../context/FormContext";
import FormRenders from "../forms/FormRenders";

function UserLogin() {
    const buttonStyle = {marginTop: "1.5rem", marginBottom: "1rem", width: "10rem"};
    return <FormContained>
        <UserLoginForm renders = {{
            renderButton: () => <StyledButton type = "submit" variant = "contained" color = "primary" buttonStyle = {buttonStyle}>Ingresar</StyledButton>,
        }}/>
        <FormRenders renders = {{
            renderError: () => <SnackbarCard autoHideDuration = {2500} type = "error">No se pudo autenticar</SnackbarCard>
        }}/>
    </FormContained>
}

function UserRegister() {
    const buttonStyle = {marginTop: "1.5rem", marginBottom: "1rem", width: "10rem"};
    return <FormContained>
        <UserRegisterForm renders = {{
            renderButton: () => <StyledButton type = "submit" variant = "contained" color = "primary" buttonStyle = {buttonStyle}>Registrar</StyledButton>,
        }}/>
        <FormRenders renders = {{
            renderError: () => <SnackbarCard autoHideDuration = {2500} type = "error">No se pudo registrar</SnackbarCard>
        }}/>
    </FormContained>
}

export {UserLogin, UserRegister};