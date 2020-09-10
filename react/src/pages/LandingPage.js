import "./styles/style-landing.css";
import React from "react";
import Header from "../layout/Header";
import StudentNotifications from "../components/apps/StudentNotifications";
import StudentRegister from "../components/apps/StudentRegister";
import StudentSearch from "../components/apps/StudentSearch";
import StudentPanels from "../components/apps/StudentPanels";

function LandingPage() {
    return <>
        <Header>
            <StudentNotifications />
        </Header>
        <StudentPanels />
        <StudentSearch />
        <StudentRegister />
    </>;
}

export default LandingPage;