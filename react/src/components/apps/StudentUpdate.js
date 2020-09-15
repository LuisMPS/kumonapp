import React, {useContext} from "react";
import {UUIDContext} from "../../context/UUIDContext";
import {ActionChanging, ActionDecider} from "./StudentFormActions";
import Student from "../student/Student";
import {StudentPresentBasics, StudentPresentProgram} from "./StudentPresent";
import {StudentBasicForm, StudentProgramForm} from "../forms/StudentForms";
import {StyledButton} from "../styled/StyledButton";
import {ProgramGridContainer, ProgramGridItem} from "../styled/StyledGrid";
import SnackbarCard from "../cards/SnackbarCard";
import Programs from "../../global/Programs";

function StudentUpdate() {
    const studentUUID = useContext(UUIDContext);
    const source = `/api/students?uuid=${studentUUID}`;
    return <Student sources = {[source]} renders = {{
        renderFound: ([student], studentUpdate) => <>
            <StudentUpdateBasics student = {student} studentUpdate = {studentUpdate} />
            <StudentUpdatePrograms student = {student} studentUpdate = {studentUpdate}/> 
        </>
    }}/>
}

function StudentUpdateBasics({student, studentUpdate}) {
    const formRenders = {
        renderButton: () => <StyledButton type = "submit">Actualizar</StyledButton>,
        renderError: () => <SnackbarCard autoHideDuration = {2500} type = "error">Error al actualizar!</SnackbarCard>
    }
    return <ActionChanging handle = {{id: "basics"}}
        expandedAs = {StudentBasicForm} expandedProps = {{values: student, renders: formRenders, onSuccess: [{id: "fetcher", handler: studentUpdate}]}}
        shrinkedAs = {StudentPresentBasics} shrinkedProps = {{information: student, informationUpdate: studentUpdate}} 
    />
}

function StudentUpdatePrograms({student, studentUpdate}) {
    const formRenders = {
        renderButton: () => <StyledButton type = "submit">Actualizar</StyledButton>,
        renderError: () => <SnackbarCard autoHideDuration = {2500} type = "error">Error al actualizar!</SnackbarCard>
    }
    return <ProgramGridContainer>
        {Programs.names().map(program => {
        const values = student.programs[program];
        return <ProgramGridItem key = {program} program = {program}>
            <ActionDecider handle = {{changing: {id: program}, subbing: {id: program, isHandled: false}}} 
            expandedAs = {StudentProgramForm} expandedProps = {{values, path: ["programs", program], renders: formRenders, onSuccess: [{id: "fetcher", handler: studentUpdate}]}}
            shrinkedAs = {StudentPresentProgram} shrinkedProps = {{information: values, informationUpdate: studentUpdate, program}}/>
        </ProgramGridItem>    
        })}
    </ProgramGridContainer>
}


export default StudentUpdate;