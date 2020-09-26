import React, {useContext} from "react";
import {UUIDContext} from "../../context/UUIDContext";
import {ActionChanging, ActionDecider} from "../actions/StudentActions";
import Student from "../response/Response";
import {StudentPresentBasics, StudentPresentProgram} from "./StudentPresent";
import {StudentBasicForm, StudentProgramForm} from "../forms/StudentForms";
import {StyledButton} from "../styled/StyledButton";
import {ProgramGridContainer, ProgramGridItem} from "../styled/StyledGrid";
import SnackbarCard from "../cards/SnackbarCard";
import Programs from "../../global/Programs";
import CommentList from "../comments/CommentList";
import {FormContained} from "../../context/FormContext";
import FormRenders from "../forms/FormRenders";

function StudentUpdate() {
    const studentUUID = useContext(UUIDContext);
    const source = `/api/students?uuid=${studentUUID}`;
    return <Student sources = {[source]} renders = {{
        renderFound: ([student], studentUpdate) => <>
            <StudentUpdateBasics student = {student} studentUpdate = {studentUpdate} />
            <StudentUpdatePrograms student = {student} studentUpdate = {studentUpdate}/> 
            <CommentList initialMax = {5} />
        </>
    }}/>
}

function StudentUpdateBasics({student, studentUpdate}) {
    const formRenders = {renderButton: () => <StyledButton type = "submit">Actualizar</StyledButton>};
    return <FormContained>
        <ActionChanging handle = {{id: "basics"}}
        expandedAs = {StudentBasicForm} expandedProps = {{values: student, renders: formRenders, onSuccess: [{id: "fetcher", handler: () => studentUpdate()}]}}
        shrinkedAs = {StudentPresentBasics} shrinkedProps = {{information: student, informationUpdate: () => studentUpdate()}}/>
        <FormRenders renders = {{
            renderError: () => <SnackbarCard autoHideDuration = {2500} type = "error">Error al actualizar!</SnackbarCard>,
            renderSuccess: () => <SnackbarCard autoHideDuration = {2500} type = "success">Información acualizada!</SnackbarCard>,
        }} />
    </FormContained>
}

function StudentUpdatePrograms({student, studentUpdate}) {
    const formRenders = {renderButton: () => <StyledButton type = "submit">Actualizar</StyledButton>};
    return <ProgramGridContainer>
        {Programs.names().map(program => {
        const values = student.programs[program];
        return <ProgramGridItem key = {program} program = {program}>
        <FormContained>
            <ActionDecider handle = {{changing: {id: program}, subbing: {id: program, isHandled: false}}} 
            expandedAs = {StudentProgramForm} expandedProps = {{values, path: ["programs", program], renders: formRenders, onSuccess: [{id: "fetcher", handler: () => studentUpdate()}]}}
            shrinkedAs = {StudentPresentProgram} shrinkedProps = {{information: values, informationUpdate: () => studentUpdate(), program}}/>
            <FormRenders renders = {{
                renderError: () => <SnackbarCard autoHideDuration = {2500} type = "error">Error al actualizar!</SnackbarCard>,
                renderSuccess: () => <SnackbarCard autoHideDuration = {2500} type = "success">Información acualizada!</SnackbarCard>,
            }}/>
        </FormContained>
        </ProgramGridItem>    
        })}
    </ProgramGridContainer>
}


export default StudentUpdate;