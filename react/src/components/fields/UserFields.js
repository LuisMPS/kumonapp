import React from "react";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Fields from "./Fields";

function UserLoginFields({onInput}) {
    const loginfields = [
        {name: "username", placeholder: "Usuario", type: "text", variant: "outlined", adornment: <AccountCircleIcon />},
        {name: "password", placeholder: "Contraseña", type: "password", variant: "outlined", adornment: <LockIcon />}
    ];
    return <Fields onInput = {onInput} fields = {loginfields} required />
}

function UserRegisterFields({onInput}) {
    const registerfields = [
        {name: "key", placeholder: "Clave de Registro", type: "password", variant: "outlined", adornment: <VpnKeyIcon />},
        {name: "username", placeholder: "Usuario", type: "text", variant: "outlined", adornment: <AccountCircleIcon />},
        {name: "password", placeholder: "Contraseña", type: "password", variant: "outlined", adornment: <LockIcon />}
    ];
    return <Fields onInput = {onInput} fields = {registerfields} required />
}

export {UserLoginFields, UserRegisterFields};