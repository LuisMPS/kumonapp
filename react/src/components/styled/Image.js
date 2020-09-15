import React from "react";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    image: props => props
});

function Image(props) {
    const {imageStyle, ...imageProps} = props;
    const classes = useStyles(imageStyle);
    return <img className = {classes.image}  alt = "unknown-alt" {...imageProps}/>
}

export default Image;