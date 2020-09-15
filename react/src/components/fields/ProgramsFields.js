import React from "react";
import withFieldHandlers from "../../hoc/withFieldHandlers";
import Fields from "./Fields";
import PayFields from "./PayFields";
import {ActionSubbing} from "../apps/StudentFormActions";
import {addMonthsUTC} from "../../global/Utils";
import Programs from "../../global/Programs";
import {ProgramGridContainer, ProgramGridItem} from "../styled/StyledGrid";

function ProgramFields({initial, onInput, required}) {
    const programfields = [
        {name: "enroll", label: "Fecha de Ingreso", type: "date", styles: {inputStyle: {width: 200}}},
        {name: "fee", label: "Pago Mensual", type: "text"},
        {name: "level", label: "Nivel", type: "text"}
    ];
    return <Fields fields = {programfields} onInput = {onInput} initial = {initial} required = {required}/>       
}

function ProgramPayFields({initial, onInput}) {
    const now = new Date();
    const monthBeforeNow = addMonthsUTC(now, -1);
    const values = initial.values || {};
    return <> 
        <ProgramFields initial = {initial} onInput = {onInput} required/>
        <p> <strong>Pago de Mes Actual</strong> </p> 
        <PayFields onInput = {onInput} initial = {{path: [...initial.path, "pay-current"], values: values["pay-current"]}} date = {now}/>
        <p> <strong>Pago de Mes Anterior</strong> </p>  
        <PayFields onInput = {onInput} initial = {{path: [...initial.path, "pay-last"], values: values["pay-last"]}} date  = {monthBeforeNow}/>
    </>
}

const HandledProgramFields = withFieldHandlers(ProgramFields);
const HandledProgramPayFields = withFieldHandlers(ProgramPayFields);

function ProgramRegisterFields(props) {
    const {initial} = props;
    const programs = initial.values || {};
    return <ProgramGridContainer>
        {Programs.names().map(program => {
            const programInfo = programs[program];
            return <ProgramGridItem key = {program} program = {program}>
            <ActionSubbing handle = {{id: program}} expandedAs = {HandledProgramFields} 
            expandedProps = {{...props, initial: {values: programInfo, path: [...initial.path, program]}}}/>
            </ProgramGridItem>   
        })}
    </ProgramGridContainer>
        
}

export {ProgramRegisterFields, HandledProgramFields, HandledProgramPayFields};