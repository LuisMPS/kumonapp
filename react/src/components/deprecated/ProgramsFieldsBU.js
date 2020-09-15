import React, {useRef, useState, useContext} from "react";
import {useSubmitHandlers} from "../../hooks/useSubmit";
import {UUIDContext} from "../../context/UUIDContext";
import axios from "axios";
import Fields from "./Fields";
import PayFields from "./PayFields";
import Programs from "../../global/Programs";
import {addMonthsUTC} from "../../global/Utils";
import {Grid, makeStyles, Paper, Typography} from "@material-ui/core";
import {StyledButton} from "../styled/StyledButton";


function ProgramFields({initial, onInput}) {
    const programfields = [
        {name: "enroll", label: "Fecha de Ingreso", type: "date"},
        {name: "fee", label: "Pago Mensual", type: "text"},
        {name: "level", label: "Nivel", type: "text"}
    ];
    return <Fields fields = {programfields} onInput = {onInput} initial = {initial} />       
}

function ProgramPayFields({initial, onInput}) {
    const now = new Date();
    const monthBeforeNow = addMonthsUTC(now, -1);
    return <> 
        <ProgramFields initial = {initial} onInput = {onInput} />
        Pago de Mes Actual
        <PayFields onInput = {onInput} initial = {{path: [...initial.path, "pay-current"], values: initial.values["pay-current"]}} date = {now}/>
        Pago de Mes Anterior
        <PayFields onInput = {onInput} initial = {{path: [...initial.path, "pay-last"], values: initial.values["pay-last"]}} date  = {monthBeforeNow}/>
    </>
}

const useProgramsStyles = makeStyles(theme => ({
    program_fields: {padding: "1.25rem 1.5rem", textAlign: "center"},
    program_name: {padding: "1rem 0rem", margin: "2rem 0rem", backgroundColor: "#cad7e3"}
}));

function ProgramsFields({initial, onInput, submitHandler, ...rest}) {
    const classes = useProgramsStyles();
    const programfields = initial.values;
    return <Grid container>
        {Programs.names().map(programName => 
            <Grid key = {programName} item className = {classes.program_fields} xs = {12} md = {6} lg = {4}> 
                <Paper className = {classes.program_name} elevation = {6}>
                    <Typography component = "span">
                        Programa: {Programs.alias(programName)}
                    </Typography>
                </Paper>
                {programfields && programfields[programName] 
                    ? <> <ProgramFields initial = {{values: programfields[programName], path: [...initial.path, programName]}}
                        onInput = {onInput} {...rest}/>
                    <ProgramUnsub submitHandler = {submitHandler} programName = {programName}/> </>
                    : <ProgramSub submitHandler = {submitHandler} programName = {programName} renders = {{
                        renderExpanded: () => <ProgramFields initial = {{values: {}, path: [...initial.path, programName]}}
                        onInput = {onInput} {...rest}/>
                }}/>}
            </Grid>
        )}
    </Grid>
}

function ProgramUnsub({programName, submitHandler}) {
    useSubmitHandlers(submitHandler, handlers);
    return <>
        
    </>
}

function ProgramSub({programName, submitHandler, renders}) {
    const [isExpanded, setExpanded] = useState(false);
    const handlers = useRef({
        onSuccess: [{id: `${programName}-sub`, handler: () => setExpanded(false)}]
    });
    useSubmitHandlers(submitHandler, handlers);
    const {renderExpanded = () => null, renderShrinked = () => null} = renders;
    return (<>
        <StyledButton type = "button" onClick = {() => setExpanded(true)} 
            buttonStyle = {{margin: "0rem auto 1rem auto", display: "block"}}> Inscribir
        </StyledButton>
        {isExpanded ? renderExpanded() : renderShrinked()}
    </>);
}

export {ProgramsFields, ProgramFields}