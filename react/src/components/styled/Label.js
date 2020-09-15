import React from "react";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    label: props => ({display: "block", ...props})
})

function Label(props) {
    const {children, labelStyle} = props;
    const classes = useStyles(labelStyle);
    return <label className = {classes.label}>
        {children}
    </label>
}

export default Label;