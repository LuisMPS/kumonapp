import React from "react";
import {NativeSelect, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    select_input: props => ({margin: theme.spacing(1), verticalAlign: "middle", ...props})
}));

function SelectInput(props) {
    const {options, inputStyle, ...inputProps} = props;
    const classes = useStyles(inputStyle);
    return <NativeSelect className = {classes.select_input} {...inputProps}>
        {options.map(option => 
            <option key = {option} value = {option}>{option}</option>
        )}
    </NativeSelect>
}

export default SelectInput;

