import React from "react";
import Fields from "./Fields";

function BasicInformationFields({initial, onInput}) {
    const basicfields = [
        {name: "name", label: "Nombre", type: "text"},
        {name: "lastname", label: "Apellido", type: "text"},
        {name: "birth", label: "Fecha de Nacimiento", type: "date", styles: {inputStyle: {width: 200}}}
    ];
    return <Fields initial = {initial} onInput = {onInput} fields = {basicfields} required />
}

export default BasicInformationFields;