import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    progress: {margin: "2.75rem 0.5rem 2rem 0.5rem"},
    ending: {lineHeight: "0rem", color: theme.palette.primary.main}
}))

function ProgressCard(props) {
    const classes = useStyles();
    return <div className = {classes.progress}>
        <LinearProgress variant = "determinate" {...props} />
        <span>{`${Math.round(props.value)}%`}</span>
        {props.value === 100 && <p className = {classes.ending}>Finalizando</p>}
    </div>
}

export default ProgressCard;

