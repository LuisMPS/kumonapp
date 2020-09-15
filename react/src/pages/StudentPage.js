import React from "react";
import {UUIDContained} from "../context/UUIDContext";
import Header from "../layout/Header";
import ContainContent from "../layout/containers/ContainContent";
import {StudentPresentMedia} from "../components/apps/StudentPresent";
import StudentUpdate from "../components/apps/StudentUpdate";

function StudentPage() {
    return <UUIDContained>
        <Header />
        <ContainContent gridStyle = {{textAlign: "center"}}>
            <StudentPresentMedia />
            <StudentUpdate />
        </ContainContent>
    </UUIDContained>
}

export default StudentPage;