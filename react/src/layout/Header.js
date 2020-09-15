import React from "react";
import logo from "./logo_black.svg";
import {Link, Grid, makeStyles} from "@material-ui/core";
import Image from "../components/styled/Image";
import StudentNotifications from "../components/apps/StudentNotifications";

const useStyles = makeStyles({
    header: {padding: "0.5rem 0rem 0.5rem 3rem", backgroundColor: "#7ed5f1", marginBottom: "1.25rem"}
});

function Header() {
    const classes = useStyles();
    return <header className = {classes.header}>
        <Grid container alignItems = "center">
            <Grid item xs = {10} sm = {11}>
                <Link href = "/"> 
                <Image src = {logo} alt = "logo" imageStyle = {{width: "125px", marginTop: "0.55rem"}} /> 
                </Link>
            </Grid>
            <Grid item xs = {2} sm = {1}>
                <StudentNotifications />
            </Grid>
        </Grid>
    </header> 
}

export default Header;