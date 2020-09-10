import React, {useContext} from "react";
import {UUIDContext} from "../../context/UUIDContext";
import {StudentUpdateForm} from "../forms/StudentForms";
import {StudentPresentInfo} from "./StudentPresent";
import Student from "../student/Student";
import {FlashCard} from "../cards/Cards";
import ToggleButton from "../toggle/ToggleButton";

function StudentUpdate() {
    const studentUUID = useContext(UUIDContext); 
    const source = `/api/students?uuid=${studentUUID}`;
    return <Student sources = {[source]} renders = {{renderFound: (students, updateStudent) => {
        const student = students[0];
        return <>
            <StudentPresentInfo students = {students} />
            <ToggleButton caption = "Actualizar" renders = {{
                renderExpanded: () => <StudentUpdateForm values = {student} 
                    onSuccess = {[{id: "fetcher", handler: () => updateStudent()}]}
                    renders = {{
                        renderSuccess: () => <FlashCard duration = {2500} type = "success">Alumno actualizado correctamente!</FlashCard>,
                        renderError: () => <FlashCard duration = {2500} type = "error">Error al actualizar alumno</FlashCard>
                    }}
                />
            }}/>
        </>
    }}}/>
}

export default StudentUpdate;