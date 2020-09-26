import React, {useRef, useState} from "react";
import SearchIcon from '@material-ui/icons/Search';
import {makeStyles, Paper, Link, Typography, Chip} from "@material-ui/core";
import useStudentFetch from "../../hooks/useFetch";
import StudentFormatter from "../response/ResponseFormatter";
import StyledInput from "../styled/StyledInput";
import Label from "../styled/Label";
import Programs from "../../global/Programs";

function StudentSearch() {
    const source = useRef([]);
    const endpoint = source.current;
    const queries = useRef(new Map());
    const onQuery = ([query, value]) => {
        if (!value) queries.current.delete(query);
        else queries.current.set(query, value);
        const base = `/api/students?`;
        const selectors = [["select_uuid", 1], ["select_birth", 1], ["select_fullname", 1]];
        const queryList = Array.from(queries.current.entries()).concat(selectors)
            .map(([query, value]) => `${query}=${value}`);
        const endpoint = `${base}${queryList.join("&")}`;
        source.current = queries.current.size > 0 ? [endpoint] : [];
        refetcher(); 
    }
    const [fetcher, refetcher] = useStudentFetch(endpoint);
    const results = fetcher.fetched;
    return <>
        <StudentSearchBar onQuery = {onQuery}/>
        <StudentSearchPrograms onQuery = {onQuery} />
        <StudentSearchResults results = {results} />
    </>
}

function StudentSearchBar({onQuery}) {
    const onInput = event => onQuery(["autocomplete_fullname", event.target.value || null]);
    return <Label labelStyle = {{display: "inline"}}>Buscar Alumno
        <StyledInput adornment = {<SearchIcon />} variant = "filled" onInput = {onInput} inputStyle = {{display: "inline"}}/>
    </Label>
}

const useChipStyles = makeStyles(theme => ({
    chip: {margin: theme.spacing(1)}
}));

function StudentSearchChip({onQuery, query, label}) {
    const classes = useChipStyles();
    const [active, setActive] = useState(false);
    const onClick = () => setActive(active => {
        onQuery([query, active ? null : 1]);
        return !active;
    })
    return <Chip clickable component = "span" color = {active ? "primary": "default"} label = {label} onClick = {onClick} variant = "default" className = {classes.chip}/>
}

function StudentSearchPrograms({onQuery}) {
    return Programs.names().map(program => 
        <StudentSearchChip key = {program} onQuery = {onQuery} 
        query = {`exists_programs>${program.toLowerCase()}`} 
        label = {`Inscrito a ${Programs.alias(program)}`}/>
    );
}

const useResultStyles = makeStyles(theme => ({
    result_wrapper: {
        backgroundColor: theme.palette.primary.light, 
        margin: "1rem 0rem",
        width: "50%",
        [theme.breakpoints.down('sm')]: {
            width: "80%",
        },
        [theme.breakpoints.down('xs')]: {
            width: "90%",
        }
    },
    result_link: {
        textDecoration: "none",
        color: "#02110f"
    },
    result_info: {
        padding: "1rem",
        "& > p": {
            lineHeight: "1.5rem"
        }
    }
}));

function StudentSearchResults({results}) {
    const classes = useResultStyles();
    return <StudentFormatter responses = {results} formatter = {student => 
        <Paper tabIndex = {0} className = {classes.result_wrapper} elevation = {7}>
        <Link className = {classes.result_link} href = {`/student?uuid=${student.uuid}`}>
        <Typography component = "div" className = {classes.result_info}>
            <p>{student.fullname}</p>
            <p>Nació: {student.birth.split("T")[0]}</p>
        </Typography>
        </Link>
        </Paper>
    }/>
}

export default StudentSearch;