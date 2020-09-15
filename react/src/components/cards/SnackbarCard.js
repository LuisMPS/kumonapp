import React, {useState} from "react";
import {Snackbar, makeStyles} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        '& > * + *': {marginTop: theme.spacing(2)}
    }
}));

const Alert = props => <MuiAlert elevation={6} variant="filled" {...props} />;

function SnackbarCard({autoHideDuration, type, children}) {
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const onClose = (_, reason) => {
      if (reason === 'clickaway') return;
      setOpen(false);
    };
    return <div className={classes.root}>
        <Snackbar open = {open} autoHideDuration = {autoHideDuration} onClose = {onClose}>
            <Alert onClose = {onClose} severity = {type}>{children}</Alert>
        </Snackbar>
    </div>
}

export default SnackbarCard;