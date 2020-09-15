import React from "react";
import Header from "../layout/Header";
import ContainContent from "../layout/containers/ContainContent";
import StudentRegister from "../components/apps/StudentRegister";
import StudentSearch from "../components/apps/StudentSearch";
import StudentPanels from "../components/apps/StudentPanels";

function LandingPage() {
    return <>
        <Header />
        <ContainContent>
            <StudentPanels />
            <StudentSearch />
            <StudentRegister />
        </ContainContent>
    </>;
}

export default LandingPage;