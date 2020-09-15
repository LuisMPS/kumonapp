import React from "react";
import BasicInformationFields from "./BasicFields";
import {ProgramRegisterFields} from "./ProgramsFields";

function RegisterFields({initial, onInput, submitHandler}) {
    return <>
        <BasicInformationFields initial = {initial} onInput = {onInput} />
        <ProgramRegisterFields initial = {{values: initial.values.programs, path: [...initial.path, "programs"]}} 
        onInput = {onInput} submitHandler = {submitHandler} />
    </>;
}

export default RegisterFields;