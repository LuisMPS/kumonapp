import React from "react";
import {UUIDContained} from "../context/UUIDContext";
import Header from "../layout/Header";
import StudentUpdate from "../components/apps/StudentUpdate";
import {StudentPresentMedia} from "../components/apps/StudentPresent"


function StudentPage() {
    return <UUIDContained>
        <Header />
        <StudentPresentMedia />
        <StudentUpdate />
    </UUIDContained>
}

export default StudentPage;