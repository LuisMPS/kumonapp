import React, {useState} from "react";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: props => ({
        '& > *': {margin: theme.spacing(1), display: "inline"},
        ...props
    }),
    input: {display: "none"}
}));

function StyledFileSelect(props) {
    const {as, inputStyle, renderFile, ...rest} = props;
    const {onInput, ...inputProps} = rest;
    const classes = useStyles(inputStyle);
    const [file, setFile] = useState();
    const onFile = event => {
        if (!event.target.files) return;
        setFile(event.target.files[0]);
        onInput && onInput(event);
    }
    return <span className = {classes.root}> <label>
        <input className = {classes.input} type= "file" onInput = {onFile} {...inputProps}/> 
        {as} {file && renderFile && renderFile(file)}
    </label> </span>
}

export default StyledFileSelect;