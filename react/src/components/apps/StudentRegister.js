import React from "react";
import ToggleButton from "../toggle/ToggleButton";
import {StyledButton} from "../styled/StyledButton";
import {StudentRegisterForm} from "../forms/StudentForms";
import SnackbarCard from "../cards/SnackbarCard";
import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, makeStyles} from "@material-ui/core";

function StudentRegister() {
    return <ToggleButton renders = {{ 
        renderButton: onToggle => <StyledButton color = "primary" onClick = {onToggle} 
            buttonStyle = {{margin: "1rem 0rem", display: "block"}}>Registrar
        </StyledButton>,
        renderExpanded: () => <StudentRegisterForm renders = {{
            renderButton: () => <StyledButton type = "submit" color = "primary" 
                buttonStyle = {{margin: "1.5rem 0rem"}}> Subir
            </StyledButton>,
            renderSuccess: () => <SnackbarCard autoHideDuration = {1500} type = "success">Alumno registrado correctamente!</SnackbarCard>,
            renderError: () => <SnackbarCard autoHideDuration = {2000} type = "error">Error al registrar alumno</SnackbarCard>,
            renderWait: (progress, handler) => progress && !progress.allow && <StudentRegisterWarning progress = {progress} handler = {handler} />
        }}/> 
    }}/>
}

const useStyles = makeStyles({
    dialog_actions: {padding: "0.75rem 1rem 1.5rem 1rem"},
    dialog_title: {paddingTop: "0.4rem"},
    dialog_header: {margin: "0.5rem 0rem 0rem 0rem"}
})

function StudentRegisterWarning({progress, handler}) {
    const classes = useStyles();
    const onClose = () => handler.onSuccess().execute(null);
    const onAllow = () => handler.onWait().execute({allow: true});
    const onCancel = () => handler.onSuccess().execute(null, progress.trigger, progress.info);
    return <Dialog open onClose = {onClose}>
        <DialogTitle disableTypography>
            <h2 className = {classes.dialog_header}>¿Continuar con Registro?</h2>
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
            Se encontró un alumno registrado con nombre y apellido similar(es).
            Si deseas proceder, presione continuar.
            </DialogContentText>
        </DialogContent>
        <DialogActions className = {classes.dialog_actions}>
            <StyledButton color = "secondary" onClick = {onAllow}>
                Continuar
            </StyledButton>
            <StyledButton color = "default" onClick = {onCancel}>
                Cancelar
            </StyledButton>
        </DialogActions>
    </Dialog>
}

export default StudentRegister;