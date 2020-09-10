import React from "react";
import {BasicInformationFields} from "./BasicFields";
import {ProgramsFields} from "./ProgramsFields";

function createSubmissionFields({isRegister}) {
    return function SubmissionFields({initial, onInput, submitHandler}) {
        return (<>
            <BasicInformationFields initial = {initial} onInput = {onInput} />
            <ProgramsFields initial = {{values: initial.values.programs, path: [...initial.path, "programs"]}} 
            onInput = {onInput} submitHandler = {submitHandler} isRegister = {isRegister} />
        </>);
    }
}

const RegisterFields = createSubmissionFields({isRegister: true});
const UpdateFields = createSubmissionFields({isRegister: false});

export {RegisterFields, UpdateFields};