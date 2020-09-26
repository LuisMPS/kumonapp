import React from "react";
import EditIcon from '@material-ui/icons/Edit';
import ToggleButton from "../toggle/ToggleButton";
import {StyledIconButton} from "../styled/StyledButton";

function ActionEditing(props) {
    const {handle, ...views} = props;
    const {expandedAs: ExpandedComponent, expandedProps, ...shrink} = views;
    const {shrinkedAs: ShrinkedComponent, shrinkedProps} = shrink;
    return <ToggleButton once renders = {{
        renderButton: onToggle => <EditButton onClick = {onToggle} buttonStyle = {{padding: "0.25rem 0.25rem"}}/>,
        renderExpanded: handleShrink => {
            const {isHandled = true, id} = handle;
            const shrinker = isHandled ? [{id: `shrinker-${id}`, handler: handleShrink}] : [];
            const onSuccess = expandedProps.onSuccess ? [...expandedProps.onSuccess, ...shrinker] : shrinker;
            return <ExpandedComponent {...expandedProps} onSuccess = {onSuccess} />
        },
        renderShrinked: () => <ShrinkedComponent {...shrinkedProps} />
    }}/>
}

function EditButton(props) {
    return <StyledIconButton {...props}> 
        <EditIcon />
    </StyledIconButton>
}

export {ActionEditing};