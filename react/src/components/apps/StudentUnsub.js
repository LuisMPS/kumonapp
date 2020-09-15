import React from "react";
import {UnsubForm, UnsubProgramForm} from "../forms/UnsubForm";
import SnackbarCard from "../cards/SnackbarCard";

function StudentUnsub() {
    return <UnsubForm renders = {{
        renderButton: () => null,
        renderError: () => <SnackbarCard autoHideDuration = {2500} type = "error">
            No se pudo dar de baja
        </SnackbarCard>
    }}/>
}

function StudentProgramUnsub({program, programUpdate}) {
    const onSuccess = [{id: "fetcher", handler: programUpdate}];
    return <UnsubProgramForm onSuccess = {onSuccess} submitProps = {[program]} renders = {{
        renderButton: () => null,
        renderError: () => <SnackbarCard autoHideDuration = {2500} type = "error">
            No se pudo dar de baja de programa
        </SnackbarCard>
    }}/>
}

export {StudentUnsub, StudentProgramUnsub};