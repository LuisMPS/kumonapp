import React from "react";
import {CommentUpdateForm} from "../forms/CommentForms";
import CommentPresent from "./CommentPresent";
import {ActionEditing} from "../actions/CommentActions";
import {StyledButton} from "../styled/StyledButton";
import SnackbarCard from "../cards/SnackbarCard";
import {FormContained} from "../../context/FormContext";
import FormRenders from "../forms/FormRenders";

function CommentUpdate({comment, onUpdate}) {
    const commentUUID = comment.uuid;
    return <FormContained>
        <ActionEditing handle = {{id: "shrink"}}
        shrinkedAs = {CommentPresent} shrinkedProps = {{comment}}
        expandedAs = {CommentUpdateForm} expandedProps = {{submitProps: [commentUUID], 
            values: comment,
            onSuccess: [{id: "update", handler: onUpdate}], 
            renders: {renderButton: onComment => <StyledButton onClick = {onComment}>
                Actualizar
            </StyledButton>}
        }}/>
        <FormRenders renders = {{
            renderSuccess: () => <SnackbarCard autoHideDuration = {1500} type = "success">Comentario editado!</SnackbarCard>,
            renderError: () => <SnackbarCard autoHideDuration = {2000} type = "error">Error al editar comentario</SnackbarCard>
        }}/>
    </FormContained> 
}

export default CommentUpdate;