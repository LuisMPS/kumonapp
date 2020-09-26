import React from "react";
import {UnsubForm, UnsubProgramForm} from "../forms/UnsubForm";
import SnackbarCard from "../cards/SnackbarCard";
import {FormContained} from "../../context/FormContext";
import FormRenders from "../forms/FormRenders";

function StudentUnsub() {
    return <FormContained>
        <UnsubForm renders = {{
            renderButton: () => null
        }}/>
        <FormRenders renders = {{renderError: () => <SnackbarCard autoHideDuration = {2500} type = "error">
            No se pudo dar de baja
        </SnackbarCard>}}/>
    </FormContained>
}

function StudentProgramUnsub({program, programUpdate}) {
    return <FormContained onSuccess = {[{id: "fetcher", handler: () => programUpdate()}]}>
        <UnsubProgramForm submitProps = {[program]} renders = {{
            renderButton: () => null
        }}/>
        <FormRenders renders = {{renderError: () => <SnackbarCard autoHideDuration = {2500} type = "error">
            No se pudo dar de baja de programa
        </SnackbarCard>}}/>
    </FormContained>
}

export {StudentUnsub, StudentProgramUnsub};