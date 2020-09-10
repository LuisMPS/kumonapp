import React, {useRef} from "react";
import useStudentFetch from "../../hooks/useStudentFetch";

function Student({sources, renders}) {
    const sourcelist = useRef(sources);
    const [fetcher, refetcher] = useStudentFetch(sourcelist.current);
    const {renderLoading, renderFound, renderUnknown} = renders;
    if (fetcher.isFetching && renderLoading) 
        return <div>{renderLoading()}</div>;
    else if (((!fetcher.isFetching && fetcher.fetched) || (fetcher.fetched && !renderLoading)) && renderFound) 
        return <div>{renderFound(fetcher.fetched, refetcher)}</div>;
    else if (!fetcher.isFetching && !fetcher.fetched && renderUnknown) 
        return <div>{renderUnknown(refetcher)}</div>;   
    return null;
}

export default Student;