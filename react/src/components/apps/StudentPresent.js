import React, {useContext} from "react";
import {UUIDContext} from "../../context/UUIDContext";
import Student from "../response/Response";
import StudentFormatter from "../response/ResponseFormatter";
import {StudentUploadPhoto, StudentUploadReport} from "./StudentUpload";
import {StudentProgramUnsub, StudentUnsub} from "./StudentUnsub";
import {StyledButton} from "../styled/StyledButton";

function StudentPresentMedia() {
    const studentUUID = useContext(UUIDContext);
    const source = `/api/students?uuid=${studentUUID}&select_uuid=1&select_photo-src=1`;
    return <Student sources = {[source]} renders = {{
        renderUnknown: refetcher => <>
            <p>Alumno No Encontrado</p>
            <p>Si piensas que ocurrió un error, presiona aquí</p>
            <StyledButton onClick = {refetcher} color = "primary">Reintentar</StyledButton>
        </>,
        renderFound: students => 
            <StudentFormatter responses = {students} formatter = {student => 
                <StudentUploadPhoto fileStartSource = {student["photo-src"]} />
            }/>
    }}/>
}

function StudentPresentBasics({information}) { //MIGHT CHANGE TO FORMATTER
    return <div className = "student-basics"> 
        <p>Nombre: {information.fullname}</p>
        <p>Fecha de Nacimiento: {information.birth.split("T")[0]}</p>
        <StudentUnsub />
    </div>
}

function StudentPresentProgram({information, informationUpdate, program}) {
    return <div className = "student-programs">
        <PresentProgramBasics information = {information} />
        <PresentProgramPays information = {information} type = "pay-current"/>
        <PresentProgramPays information = {information} type = "pay-last"/>
        <p>Boleta:</p>
        <StudentUploadReport fileStartSource = {information["report-src"]} reportPath = {program} />
        <StudentProgramUnsub program = {program} programUpdate = {informationUpdate} />
    </div>
}

function PresentProgramBasics({information}) {
    return <>
        <p>Fecha de Inscripción: {information.enroll.split("T")[0]}</p>
        <p>Nivel: {information.level}</p>
        <p>Cuota: {information.fee}</p>
    </>
}

function PresentProgramPays({information, type}) {
    return <>
        <p> <strong>Pago Guardado:</strong> </p>
        <p>Con Fecha: {information[type].starting.split("T")[0]}</p>
        <p>Cantidad: {information[type].amount}</p>
        <p>Forma de Pago: {information[type].method || "No especificado"}</p>
        <p>Fecha de Pago: {information[type].paid ? information[type].paid.split("T")[0] : "No ha pagado"}
        </p>
    </>
}

export {StudentPresentMedia, StudentPresentBasics, StudentPresentProgram};