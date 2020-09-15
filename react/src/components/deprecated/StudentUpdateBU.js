import React from "react";
import {Typography} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import Programs from "../../global/Programs";
import {StudentBasicForm, StudentProgramForm} from "../forms/StudentForms";
import StudentFormatter from "../student/StudentFormatter";
import {StudentUploadReport} from "./StudentUpload";
import ToggleButton from "../toggle/ToggleButton";
import {StyledButton} from "../styled/StyledButton";
import SnackbarCard from "../cards/SnackbarCard";

function StudentUpdate(props) { //Props are student & studentUpdate
    return <div className = "student-update">
        <UpdateBasics {...props} />
        <UpdatePrograms {...props} />
    </div>
}

const updateRenders = {
    renderButton: () => <StyledButton type = "submit" color = "primary" 
        buttonStyle = {{marginBottom: "1.5rem"}}> Actualizar
    </StyledButton>,
    renderError: () => <SnackbarCard autoHideDuration = {2000} type = "error">Error al actualizar alumno</SnackbarCard>
};

function UpdateBasics({student, update}) {
    return <ToggleButton renders = {{
        renderButton: onToggle => <EditButton onClick = {onToggle}/>,
        renderExpanded: handleShrink => <StudentBasicForm values = {student} 
        onSuccess = {[{id: "fetcher", handler: update},  {id: "shrinker", handler: handleShrink}]}
        renders = {updateRenders}/>,
        renderShrinked: () => <CurrentBasics student = {student}/>
    }}/>
}

function UpdatePrograms({student, update}) {
    return Programs.names().map(program => <ToggleButton key = {program} renders = {{
        renderButton: onToggle => <EditButton onClick = {onToggle}/>,
        renderExpanded: handleShrink => <StudentProgramForm values = {student.programs[program]} path = {["programs", program]}
        onSuccess = {[{id: "fetcher", handler: update},  {id: "shrinker", handler: handleShrink}]}
        renders = {updateRenders}/>,
        renderShrinked: () => <CurrentProgram student = {student} program = {program}/>
    }}/>);
}

function CurrentBasics({student}) {
    return <StudentFormatter students = {[student]} formatter = {student =>
        <div className = "student-basics">
            <Typography>Nombre: {student.fullname}</Typography>
            <Typography>Fecha de Nacimiento: {student.birth.split("T")[0]}</Typography>
        </div>
    }/>
}

function CurrentProgram({student, program}) {
    return <StudentFormatter students = {[student]} formatter = {student => {
        const programs = student.programs;
        const programInfo = programs[program];
        if (!programInfo) return null;
        return <div>
            <Typography component = "div">
            <p>Inscrito en: {Programs.alias(program)}</p>
            <CurrentProgramBasics program = {program} programInfo = {programInfo} />
            <CurrentProgramPays programInfo = {programInfo} type = "pay-current"/>
            <CurrentProgramPays programInfo = {programInfo} type = "pay-last"/>
            <p>Boleta:</p>
            <StudentUploadReport fileStartSource = {programInfo["report-src"]} reportPath = {program} />
            </Typography>
        </div>
    }}/>
}

function CurrentProgramBasics({programInfo}) {
    return <>
        <p>Fecha de Inscripción: {programInfo.enroll.split("T")[0]}</p>
        <p>Nivel: {programInfo.level}</p>
        <p>Cuota: {programInfo.fee}</p>
    </>
}

function CurrentProgramPays({programInfo, type}) {
    return <>
        <p>Pago Guardado:</p>
        <p>Con Fecha: {programInfo[type].starting.split("T")[0]}</p>
        <p>Cantidad: {programInfo[type].amount}</p>
        <p>Fecha de Pago:  
            {programInfo[type].date ? programInfo[type].date.split("T")[0] : "No ha pagado"}
        </p>
    </>
}

function EditButton(props) {
    return <StyledButton startIcon = {<EditIcon />} variant = "outlined" color = "primary" {...props}> 
        Editar 
    </StyledButton>
}

export default StudentUpdate;