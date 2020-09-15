import React from "react";
import ToggleButton from "../toggle/ToggleButton";
import {StyledButton} from "../styled/StyledButton";
import {StudentRegisterForm} from "../forms/StudentForms";
import SnackbarCard from "../cards/SnackbarCard";

function StudentRegister() {
    return <ToggleButton renders = {{ 
        renderButton: onToggle => <StyledButton color = "primary" onClick = {onToggle} 
            buttonStyle = {{margin: "1rem 0rem"}}>Registrar
        </StyledButton>,
        renderExpanded: () => <StudentRegisterForm renders = {{
            renderButton: () => <StyledButton type = "submit" color = "primary" 
                buttonStyle = {{margin: "1.5rem 0rem"}}> Subir
            </StyledButton>,
            renderSuccess: () => <SnackbarCard autoHideDuration = {1500} type = "success">Alumno registrado correctamente!</SnackbarCard>,
            renderError: () => <SnackbarCard autoHideDuration = {2000} type = "error">Error al registrar alumno</SnackbarCard>
        }}/> 
    }}/>
}

export default StudentRegister;