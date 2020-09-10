import React from "react";
import Fields from "./Fields";

function UserLoginFields({onInput}) {
    const loginfields = [
        {name: "username", label: "Usuario", type: "text"},
        {name: "password", label: "Contraseña", type: "password"},
    ];
    return <Fields onInput = {onInput} fields = {loginfields} required />
}

function UserRegisterFields({onInput}) {
    const registerfields = [
        {name: "key", label: "Clave de Registro", type: "password"},
        {name: "username", label: "Usuario", type: "text"},
        {name: "password", label: "Contraseña", type: "password"},
    ];
    return <Fields onInput = {onInput} fields = {registerfields} required />
}

export {UserLoginFields, UserRegisterFields};