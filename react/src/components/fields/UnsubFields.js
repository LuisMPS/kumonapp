import React from "react";
import {StyledButton} from "../styled/StyledButton";
import ToggleButton from "../toggle/ToggleButton";

function UnsubFields({onInput}) {
    return <ToggleButton isConfirm renders = {{
        renderButton: onToggle => <StyledButton color = "secondary" onClick = {onToggle}>
            Dar de Baja
        </StyledButton>,
        renderCancel: onToggle => <StyledButton onClick = {onToggle} buttonStyle = {{display: "block", margin: "0.4rem auto"}}>
            Cancelar
        </StyledButton>,
        renderExpanded: () => <StyledButton onClick = {onInput} type = "submit" buttonStyle = {{display: "block", margin: "0.4rem auto"}}>
            Confirmar
        </StyledButton>
    }}/>
}

export default UnsubFields;