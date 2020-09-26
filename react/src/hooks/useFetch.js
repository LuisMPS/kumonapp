import {useState, useEffect, useCallback} from "react";
import axios from "axios";

function useFetcher(sources, reducer) {
    const fetch = {isFetching: true, fetched: null, time: Date.now()};
    const [fetcher, setFetcher] = useState(fetch);
    const refetcher = () => setFetcher(fetcher => ({...fetcher, isFetching: true, time: Date.now()}));
    useEffect(() => {
        const tokenSource = axios.CancelToken.source();
        Promise.all(sources.map(source => {
            return axios.get(source, {cancelToken: tokenSource.token})
        }))
        .then(responses => {
            const fetched = reducer(responses);
            setFetcher(fetcher => ({...fetcher, isFetching: false, fetched}));
        })
        .catch(error => {
            if (!axios.isCancel(error)) setFetcher(fetcher => ({...fetcher, isFetching: false, fetched: null}))
        });
        return () => tokenSource.cancel();
    }, [fetcher.time, reducer, sources]);
    return [fetcher, refetcher];
} 

function useResponseReducer(id) {
    const responseReducer = useCallback(responses => {
        const reduced = responses.reduce((reducing, response) => {
            const responseData = response.data;
            if (!Array.isArray(responseData)) return reducing;
            return [...reducing, ...responseData];
        }, []);
        if (reduced.length === 0) throw new Error();
        else {
            const mapped = new Map(reduced.map(reduce => [reduce[id], reduce]));
            return [...mapped.values()];
        } 
    }, [id]);
    return responseReducer;
}

function useAPIFetch(sources, uuid = "uuid") {
    const reducer = useResponseReducer(uuid);
    const [fetcher, refetcher] = useFetcher(sources, reducer);
    return [fetcher, refetcher];
}

export default useAPIFetch;

