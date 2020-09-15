import React from "react";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {margin: theme.spacing(1), display: "inline"},
    },
    input: {display: "none"}
}));

function StyledFileSelect(props) {
    const {as, inputStyle, ...inputProps} = props;
    const classes = useStyles();
    return <span className = {classes.root}> <label>
        <input className = {classes.input} type="file" {...inputProps}/> 
        {as}
    </label> </span>
}

export default StyledFileSelect;