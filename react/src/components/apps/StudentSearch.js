import React, {useRef} from "react";
import SearchIcon from '@material-ui/icons/Search';
import {makeStyles, Paper, Link, Typography} from "@material-ui/core";
import useStudentFetch from "../../hooks/useStudentFetch";
import StudentFormatter from "../student/StudentFormatter";
import StyledInput from "../styled/StyledInput";
import Label from "../styled/Label";

function StudentSearch() {
    const source = useRef([]);
    const query = source.current;
    const [fetcher, refetcher] = useStudentFetch(query);
    const onQuery = event => {
        const src = `/api/students?select_fullname=1&select_birth=1&select_uuid=1&autocomplete_fullname=`;
        const query = event.target.value ? `${src}${event.target.value}`: `${src}$`;
        source.current = [query];
        refetcher(); 
    }
    const results = fetcher.fetched;
    return <>
        <StudentSearchBar onQuery = {onQuery}/>
        <StudentSearchResults results = {results} />
    </>
}

function StudentSearchBar({onQuery}) {
    return <Label>Buscar Alumno
        <StyledInput adornment = {<SearchIcon />} variant = "filled" onInput = {onQuery} inputStyle = {{width: 220}}/>
    </Label>
}

const useStyles = makeStyles(theme => ({
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
    const classes = useStyles();
    return <StudentFormatter students = {results} formatter = {student => 
        <Paper className = {classes.result_wrapper} elevation = {7}>
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