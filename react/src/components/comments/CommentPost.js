import React from "react";
import {CommentPostForm} from "../forms/CommentForms";
import {StyledButton} from "../styled/StyledButton";
import ToggleButton from "../toggle/ToggleButton";

function CommentPost() {
    return <ToggleButton once renders = {{ 
        renderButton: onToggle => <StyledButton color = "primary" onClick = {onToggle} buttonStyle = {{margin: "1rem"}}>
            Agregar Comentario
        </StyledButton>,
        renderExpanded: onShrink => <CommentPostForm onSuccess = {[{id: "shrink", handler: () => onShrink()}]} renders = {{
            renderButton: () => <StyledButton type = "submit" buttonStyle = {{margin: "0.1rem 0rem 2rem 0rem"}}>Comentar</StyledButton>
        }}/>
    }}/>
}

export default CommentPost;