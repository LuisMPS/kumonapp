import React, {useRef} from "react";
import useStudentFetch from "../../hooks/useStudentFetch";
import StudentFormatter from "../student/StudentFormatter";

function StudentSearch() {
    const source = useRef([]);
    const query = source.current;
    const [fetcher, refetcher] = useStudentFetch(query);
    const onQuery = event => {
        const src = `/api/students?autocomplete_fullname=`;
        const query = event.target.value ? `${src}${event.target.value}`: `${src}$`;
        source.current = [query];
        refetcher(); 
    }
    const results = fetcher.fetched;
    return <div className = "student-search">
        <StudentSearchBar onQuery = {onQuery}/>
        <StudentSearchResults results = {results} />
    </div>
}

function StudentSearchBar({onQuery}) {
    return <>
        <span>Busca alumnos: </span>
        <input type = "text" onInput = {onQuery} />
    </>
}

function StudentSearchResults({results}) {
    return <StudentFormatter students = {results} formatter = {
        student => <div className = "search-result-wrapper">
            <a className = "search-result-link" href = {`/student?uuid=${student.uuid}`}>
            <div className = "search-result-info">
                <p>{student.fullname}</p>
                <p>Nació: {student.birth.split("T")[0]}</p>
            </div>
            </a>
        </div>
    }/>
}

export default StudentSearch;