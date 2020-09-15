import React from "react";
import {Card, CardContent, Grid, makeStyles} from "@material-ui/core";
import {UserLogin, UserRegister} from "../components/apps/UserAuth";
import {StyledButton} from "../components/styled/StyledButton";
import Image from "../components/styled/Image";
import logo from "./logo_blue.svg";


const useStyles = makeStyles({
    card_content: {textAlign: "center", padding: "2rem 2rem", marginTop: props => props.marginTop}
});

function UserLoginCard() {
    const classes = useStyles({marginTop: "6.5rem"});
    const buttonStyle = {width: "10rem"};
    return <Card className = {classes.card_content} elevation = {10}>
        <CardContent>
            <Image src = {logo} alt = "logo" imageStyle = {{width: "70%", marginBottom: "1.5rem"}} />
            <UserLogin />
            <StyledButton variant = "outlined" color = "primary" href = "/register" buttonStyle = {buttonStyle}>Registrar aquí</StyledButton>
        </CardContent>
    </Card>;
}

function UserRegisterCard() {
    const classes = useStyles({marginTop: "4rem"});
    const buttonStyle = {width: "10rem"};
    return <Card className = {classes.card_content} elevation = {10}>
        <CardContent>
            <Image src = {logo} alt = "logo" imageStyle = {{width: "70%", marginBottom: "1.5rem"}} />
            <UserRegister />
            <StyledButton variant = "outlined" color = "primary" href = "/login" buttonStyle = {buttonStyle}>Ingresa aquí</StyledButton>
        </CardContent>
    </Card>
}

function UserAuthGrid({children}) {
    return <Grid container>
        <Grid item xs = {2} sm = {3} md = {4}/>
        <Grid item xs = {8} sm = {6} md = {4}>{children}</Grid>
        <Grid item xs = {2} sm = {3} md = {4}/>
    </Grid>
}

export {UserLoginCard, UserRegisterCard, UserAuthGrid};