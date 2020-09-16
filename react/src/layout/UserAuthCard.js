import React from "react";
import {Paper, makeStyles} from "@material-ui/core";
import {UserLogin, UserRegister} from "../components/apps/UserAuth";
import {StyledButton} from "../components/styled/StyledButton";
import Image from "../components/styled/Image";
import logo from "./logo_blue.svg";


const useStyles = makeStyles(theme => ({
    content: props => ({
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        [theme.breakpoints.up("sm")]: {
            padding: "5% 2.5%",
            width: "40%"
        },
        [theme.breakpoints.up("lg")]: {
            padding: "4% 2%",
            width: "35%"
        },
        [theme.breakpoints.down("sm")]: {
            padding: "6% 4%",
            width: "50%"
        },
        [theme.breakpoints.down("xs")]: {
            padding: "6% 4%",
            width: "70%"
        },
        ...props
    })
}));

function UserLoginCard() {
    const classes = useStyles();
    const buttonStyle = {width: "10rem"};
    return <Paper className = {classes.content} elevation = {10}>
        <Image src = {logo} alt = "logo" imageStyle = {{width: "70%", marginBottom: "1.5rem"}} />
        <UserLogin />
        <StyledButton variant = "outlined" color = "primary" href = "/register" buttonStyle = {buttonStyle}>Registrar aquí</StyledButton>
    </Paper>;
}

function UserRegisterCard() {
    const classes = useStyles();
    const buttonStyle = {width: "10rem"};
    return <Paper className = {classes.content} elevation = {10}>
        <Image src = {logo} alt = "logo" imageStyle = {{width: "70%", marginBottom: "1.5rem"}} />
        <UserRegister />
        <StyledButton variant = "outlined" color = "primary" href = "/login" buttonStyle = {buttonStyle}>Ingresa aquí</StyledButton>
    </Paper>
}

export {UserLoginCard, UserRegisterCard};