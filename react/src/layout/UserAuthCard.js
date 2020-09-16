import React from "react";
import {Paper, makeStyles, Grid} from "@material-ui/core";
import {UserLogin, UserRegister} from "../components/apps/UserAuth";
import {StyledButton} from "../components/styled/StyledButton";
import Image from "../components/styled/Image";
import logo from "./logo_blue.svg";

const useStyles = makeStyles(theme => ({
    grid_container: {
        height: "100vh",
    },
    grid_item: {
        margin: "auto"
    },
    content: props => ({
        textAlign: "center",
        [theme.breakpoints.up("sm")]: {
            padding: "2.5rem 2rem",
        },
        [theme.breakpoints.up("lg")]: {
            padding: "3rem 2rem",
        },
        [theme.breakpoints.down("sm")]: {
            padding: "2rem 2rem",
        },
        ...props
    })
}));

function UserLoginCard() {
    const classes = useStyles();
    const buttonStyle = {width: "10rem"};
    return <UserAuthContainer>
        <Paper className = {classes.content} elevation = {10}>
        <Image src = {logo} alt = "logo" imageStyle = {{width: "70%", marginBottom: "1.5rem"}} />
        <UserLogin />
        <StyledButton variant = "outlined" color = "primary" href = "/register" buttonStyle = {buttonStyle}>Registrar aquí</StyledButton>
        </Paper>
    </UserAuthContainer>;
}

function UserRegisterCard() {
    const classes = useStyles();
    const buttonStyle = {width: "10rem"};
    return <UserAuthContainer>
        <Paper className = {classes.content} elevation = {10}>
        <Image src = {logo} alt = "logo" imageStyle = {{width: "70%", marginBottom: "1.5rem"}} />
        <UserRegister />
        <StyledButton variant = "outlined" color = "primary" href = "/login" buttonStyle = {buttonStyle}>Ingresa aquí</StyledButton>
        </Paper>
    </UserAuthContainer>;
}

function UserAuthContainer({children}) {
    const classes = useStyles();
    return <Grid container className = {classes.grid_container}>
        <Grid item xs = {2} sm = {3} md = {4}/>
        <Grid item className = {classes.grid_item} xs = {8} sm = {6} md = {4}>
            {children}
        </Grid>
        <Grid item xs = {2} sm = {3} md = {4}/>
    </Grid>
}

export {UserLoginCard, UserRegisterCard};