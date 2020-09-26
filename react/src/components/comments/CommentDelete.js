import React from "react";
import {CommentDeleteForm} from "../forms/CommentForms";
import {StyledIconButton} from "../styled/StyledButton";
import {StyledButton} from "../styled/StyledButton";
import ToggleButton from "../toggle/ToggleButton";
import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, makeStyles} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

function CommentDelete({comment}) {
    const commentUUID = comment.uuid;
    return <CommentDeleteForm as = "span" submitProps = {[commentUUID]} renders = {{
        renderButton: onDelete => <CommentDeleteButton onDelete = {onDelete} />
    }}/>
}

function CommentDeleteButton({onDelete}) {
    return <ToggleButton renders = {{
        renderButton: onToggle => <StyledIconButton onClick = {onToggle} buttonStyle = {{padding: "0.25rem 0.25rem"}}>
            <DeleteIcon />
        </StyledIconButton>,
        renderExpanded: onClose => <CommentDeleteConfirm onConfirm = {onDelete} onClose = {onClose} />
    }}/>
}

const useStyles = makeStyles({
    dialog_actions: {padding: "0.75rem 1rem 1.5rem 1rem"},
    dialog_title: {paddingTop: "0.4rem"},
    dialog_header: {margin: "0.5rem 0rem 0rem 0rem"}
});

function CommentDeleteConfirm({onConfirm, onClose}) {
    const onConfirmAndClose = event => { onConfirm(event); onClose(); }
    const classes = useStyles();
    return <Dialog open>
        <DialogTitle disableTypography>
            <h2 className = {classes.dialog_header}>¿Eliminar comentario?</h2>
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
            Si eliminas el comentario, se borrará para siempre y no podrás recuperarlo en el futuro.
            Si deseas eliminar comentario, presiona continuar.
            </DialogContentText>
        </DialogContent>
        <DialogActions className = {classes.dialog_actions}>
            <StyledButton color = "default" onClick = {onClose}>
                Cancelar
            </StyledButton>
            <StyledButton color = "secondary" onClick = {onConfirmAndClose}>
                Continuar
            </StyledButton>
        </DialogActions>
    </Dialog>
}

export default CommentDelete;