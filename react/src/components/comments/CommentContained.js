import React from "react";
import {FormContained} from "../../context/FormContext";
import FormRenders from "../forms/FormRenders";
import SnackbarCard from "../cards/SnackbarCard";

function CommentContained(props) {
    const {children, ...updater} = props;
    const {update, source} = updater;
    return <FormContained onSuccess = {[{id: "updateAll", handler: () => update([source])}]} >
        {children}
        <FormRenders renders = {{
            renderSuccess: () => <SnackbarCard autoHideDuration = {1500} type = "success">Comentarios actualizados!</SnackbarCard>,
            renderError: () => <SnackbarCard autoHideDuration = {2000} type = "error">Error al actualizar comentarios</SnackbarCard>
        }}/>
    </FormContained>
}

export default CommentContained;