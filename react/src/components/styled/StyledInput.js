import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {TextField, InputAdornment} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    text_input: props => ({margin: theme.spacing(1), verticalAlign: "middle", ...props}),
    adornment_input: {paddingLeft: "0.75rem"},
    autofill_input: {"&:-webkit-autofill::first-line": {"fontSize": "1rem"}}
}));

function StyledInput(props) {
    const {adornment, inputStyle, ...inputProps} = props;
    const classes = useStyles(inputStyle);
    const InputProps = {classes: {input: classes.autofill_input}};
    if (adornment) {
        Object.assign(InputProps.classes, {inputAdornedStart: classes.adornment_input});
        Object.assign(InputProps, {startAdornment: <InputAdornment position="start">
            {adornment}
        </InputAdornment>
        });
    }
    return <TextField InputProps = {InputProps} variant = "standard" {...inputProps} className = {classes.text_input} />
}

export default StyledInput;