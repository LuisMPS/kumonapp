import React, {useRef, useState, useContext} from "react";
import {useSubmitHandlers} from "../../hooks/useSubmit";
import {UUIDContext} from "../../context/UUIDContext";
import axios from "axios";
import Fields from "./Fields";
import PayFields from "./PayFields";
import Programs from "../../global/Programs";
import {addMonthsUTC} from "../../global/Utils";

function ProgramFields({initial, onInput, isRegister}) {
    const programfields = [
        {name: "enroll", label: "Fecha de Ingreso", type: "date"},
        {name: "fee", label: "Pago Mensual", type: "text"},
        {name: "level", label: "Nivel", type: "text"}
    ];
    const now = new Date();
    const monthBeforeNow = addMonthsUTC(now, -1);
    return <>  
        <Fields fields = {programfields} onInput = {onInput} initial = {initial} />
        {!isRegister && <>
        <p>Pago de Este Mes</p> <PayFields onInput = {onInput} initial = {{path: [...initial.path, "pay-current"], values: initial.values["pay-current"]}} date = {now}/>
        <p>Pago de Último Mes</p> <PayFields onInput = {onInput} initial = {{path: [...initial.path, "pay-last"], values: initial.values["pay-last"]}} date  = {monthBeforeNow}/>
        </>}
    </>;
}

function ProgramsFields({initial, onInput, submitHandler, ...rest}) {
    const programfields = initial.values;
    return Programs.names().map(programName => {
        if (programfields && programfields[programName]) 
            return <div key = {programName}> 
                <span className = "program-name">Programa: {Programs.alias(programName)}</span>
                <ProgramFields initial = {{values: programfields[programName], path: [...initial.path, programName]}}
                onInput = {onInput} {...rest}/>
                <ProgramUnsub submitHandler = {submitHandler} programName = {programName}/>
            </div>
        else 
            return <div key = {programName}>
                <span className = "program-name">Programa: {Programs.alias(programName)}</span>
                <ProgramSub submitHandler = {submitHandler} programName = {programName} 
                renders = {{
                    renderExpanded: () => <ProgramFields initial = {{values: {}, path: [...initial.path, programName]}}
                    onInput = {onInput} {...rest}/>
                }}/>
            </div>
    });
}

function ProgramUnsub({programName, submitHandler}) {
    const [isConfirming, setConfirming] = useState(false);
    const studentUUID = useContext(UUIDContext); //GET UUID
    const onUnsub = (event) => {
        axios.delete(`/api/students/programs?program=${programName}&uuid=${studentUUID}`)
        .then(response => {
            submitHandler.onSuccess().handler("fetcher")();
            submitHandler.onSuccess().handler("success")(response.data);
        })
        .catch(error => submitHandler.onError().handler("error")());
    }
    const handlers = useRef({
        onSuccess: [{id: `${programName}-unsub`, handler: () => setConfirming(false)}]
    });
    useSubmitHandlers(submitHandler, handlers);
    return (<>
        <button type = "button" onClick = {() => setConfirming(true)}>Dar de Baja de Programa</button>
        {isConfirming 
        ? <>
            <button type = "button" onClick = {onUnsub}>Confirmar</button>
            <button type = "button" onClick = {() => setConfirming(false)}>Cancelar</button>
        </> 
        : null}
    </>);
}

function ProgramSub({programName, submitHandler, renders}) {
    const [isExpanded, setExpanded] = useState(false);
    const handlers = useRef({
        onSuccess: [{id: `${programName}-sub`, handler: () => setExpanded(false)}]
    });
    useSubmitHandlers(submitHandler, handlers);
    const {renderExpanded = () => null, renderShrinked = () => null} = renders;
    return (<>
        <button type = "button" onClick = {() => setExpanded(true)}>Inscribir</button>
        {isExpanded ? renderExpanded() : renderShrinked()}
    </>);
}

export {ProgramsFields, ProgramFields}