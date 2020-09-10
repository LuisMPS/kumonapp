import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import StudentPage from "../pages/StudentPage";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

function KumonRouter() {
    return <Router>
        <Switch>
            <Route exact path = "/">
                <LandingPage />
            </Route>
            <Route exact path = "/login">
                <LoginPage />
            </Route>
            <Route exact path = "/register">
                <RegisterPage />
            </Route>
            <Route exact path = "/student">
                <StudentPage />
            </Route>
            <Route path = "/*">
                <NotFoundPage />
            </Route>
        </Switch>
    </Router>
}

export default KumonRouter;