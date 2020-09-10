import {useState, useEffect} from "react";
import axios from "axios";

function useStudentFetch(sources) {
    const fetch = {isFetching: true, fetched: null, time: Date.now()};
    const [fetcher, setFetcher] = useState(fetch);
    const refetcher = () => setFetcher(fetcher => ({...fetcher, isFetching: true, time: Date.now()}));
    useEffect(() => {
        function responsesReducer(responses) {
            const students = responses.reduce((students, response) => {
                const responseStudents = response.data;
                if (!Array.isArray(responseStudents)) return students;
                return [...students, ...responseStudents];
            }, []);
            if (students.length === 0) throw new Error();
            else {
                const mapped = new Map(students.map(student => [student.uuid, student]));
                return [...mapped.values()];
            } 
        }
        const tokenSource = axios.CancelToken.source();
        Promise.all(sources.map(source => {
            return axios.get(source, {cancelToken: tokenSource.token})
        }))
        .then(responses => {
            const fetched = responsesReducer(responses);
            setFetcher(fetcher => ({...fetcher, isFetching: false, fetched}));
        })
        .catch(error => {
            if (!axios.isCancel(error)) setFetcher(fetcher => ({...fetcher, isFetching: false, fetched: null}))
        });
        return () => tokenSource.cancel();
    }, [fetcher.time, sources]);
    return [fetcher, refetcher];
} 

export default useStudentFetch;

