import React from "react";
import {Button, IconButton} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    button: props => ({...props})
});

function StyledButton(props) {
    const {children, buttonStyle, ...buttonProps} = props;
    const classes = useStyles(buttonStyle);
    return <Button variant = "contained" {...buttonProps} className = {classes.button}>{children}</Button>
}

function StyledIconButton(props) {
    const {children, buttonStyle, ...buttonProps} = props;
    const classes = useStyles(buttonStyle);
    return <IconButton {...buttonProps} className = {classes.button}>{children}</IconButton>
}

export {StyledButton, StyledIconButton};