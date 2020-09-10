import React from "react";
import {useContext} from "react";
import {UUIDContext} from "../../context/UUIDContext";
import Student from "../student/Student";
import {StudentUploadPhoto, StudentUploadReport} from "./StudentUpload";
import StudentFormatter from "../student/StudentFormatter";
import Programs from "../../global/Programs";
import StudentUnsub from "./StudentUnsub";

function StudentPresentMedia() {
    const studentUUID = useContext(UUIDContext);
    return (
        <Student sources = {[`/api/students?uuid=${studentUUID}`]}
        renders = {{
            renderUnknown: refetcher => <>
                <p>Alumno No Encontrado</p>
                <p>Si piensas que ocurrió un error, presiona aquí</p>
                <button onClick = {() => refetcher()}>Reintentar</button>
            </>,
            renderFound: students => {
                return <StudentFormatter students = {students} 
                formatter = {student => {
                    return <StudentUploadPhoto fileStartSource = {student["photo-src"]} />
                }}/>
            }
            // renderLoading: <p></p>
        }}/>
    );
}

function StudentPresentInfo({students}) {
    return <StudentFormatter students = {students} formatter = {student => {
        const programs = student.programs;
        return <>
            <StudentUnsub />
            <p>Nombre: {student.fullname}</p>
            <p>Fecha de Nacimiento: {student.birth.split("T")[0]}</p>
            {Object.keys(programs).map(program => {
                const programInfo = programs[program]; if (!programInfo) return null;
                return <div key = {program}>
                    <p>Inscrito en: {Programs.alias(program)}</p>
                    <p>Fecha de Inscripción: {programInfo.enroll.split("T")[0]}</p>
                    <p>Nivel: {programInfo.level}</p>
                    <p>Cuota: {programInfo.fee}</p>

                    <p>Último Pago Guardado:</p>
                    <p>Con Fecha: {programInfo["pay-current"].starting.split("T")[0]}</p>
                    <p>Cantidad: {programInfo["pay-current"].amount}</p>
                    <p>Fecha de Pago:  
                        {programInfo["pay-current"].date ? programInfo["pay-current"].date.split("T")[0] : "No ha pagado"}
                    </p>

                    <p>Penúltimo Pago Guardado:</p>
                    <p>Con Fecha: {programInfo["pay-last"].starting.split("T")[0]}</p>
                    <p>Cantidad: {programInfo["pay-last"].amount}</p>
                    <p>Fecha de Pago:  
                        {programInfo["pay-last"].date ? programInfo["pay-last"].date.split("T")[0] : "No ha pagado"}
                    </p>

                    <p>Boleta:</p>
                    <StudentUploadReport fileStartSource = {programInfo["report-src"]} 
                    reportPath = {program} />
                </div>
            })}
        </>
    }}/>
}

export {StudentPresentMedia, StudentPresentInfo};