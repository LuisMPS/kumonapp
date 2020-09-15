import React from "react";
import EditIcon from '@material-ui/icons/Edit';
import ToggleButton from "../toggle/ToggleButton";
import {StyledButton} from "../styled/StyledButton";

function ActionSubbing(props) {
    const {handle, ...expand} = props;
    const {expandedAs: Component, expandedProps} = expand;
    return <ToggleButton once renders = {{
        renderButton: onToggle => <StyledButton onClick = {onToggle} buttonStyle = {{marginBottom: "1rem"}}>
            Inscribir
        </StyledButton>,
        renderExpanded: handleShrink => {
            const {isHandled = true, id} = handle;
            const shrinker = isHandled ? [{id: `shrinker-${id}`, handler: handleShrink}] : [];
            const onSuccess = expandedProps.onSuccess ? [...expandedProps.onSuccess, ...shrinker] : shrinker;
            return <Component {...expandedProps} onSuccess = {onSuccess}/>
        }
    }}/>
}

function ActionChanging(props) {
    const {handle, ...views} = props;
    const {expandedAs: ExpandedComponent, expandedProps, ...shrink} = views;
    const {shrinkedAs: ShrinkedComponent, shrinkedProps} = shrink;
    return <ToggleButton renders = {{
        renderButton: onToggle => <EditButton onClick = {onToggle} />,
        renderExpanded: handleShrink => {
            const {isHandled = true, id} = handle;
            const shrinker = isHandled ? [{id: `shrinker-${id}`, handler: handleShrink}] : [];
            const onSuccess = expandedProps.onSuccess ? [...expandedProps.onSuccess, ...shrinker] : shrinker;
            return <ExpandedComponent {...expandedProps} onSuccess = {onSuccess} />
        },
        renderShrinked: () => <ShrinkedComponent {...shrinkedProps} />
    }}/>
}

function ActionDecider(props) {
    const {handle, ...views} = props;
    const {expandedAs, expandedProps, ...shrink} = views;
    const {shrinkedAs, shrinkedProps} = shrink;
    const values = expandedProps.values;
    return values 
        ? <ActionChanging handle = {handle.changing} expandedAs = {expandedAs} expandedProps = {expandedProps}
        shrinkedAs = {shrinkedAs} shrinkedProps = {shrinkedProps}/>
        : <ActionSubbing handle = {handle.subbing} expandedAs = {expandedAs} expandedProps = {expandedProps}/>
}

function EditButton(props) {
    return <StyledButton startIcon = {<EditIcon />} variant = "outlined" color = "primary" {...props}> 
        Editar 
    </StyledButton>
}

export {ActionSubbing, ActionChanging, ActionDecider};