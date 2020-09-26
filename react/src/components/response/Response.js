import React, {useRef} from "react";
import useAPIFetch from "../../hooks/useFetch";

function Response({sources, renders}) {
    const sourcelist = useRef(sources);
    const Cached = useRef();
    const [fetcher, refetcher] = useAPIFetch(sourcelist.current);
    const {renderLoading, renderFound, renderUnknown, renderBase} = renders;
    const onRefetch = sources => { sourcelist.current = sources || sourcelist.current; refetcher(); };
    if (fetcher.isFetching && renderLoading) 
        Cached.current = renderLoading();
    else if (((!fetcher.isFetching && fetcher.fetched) || (fetcher.fetched && !renderLoading)) && renderFound) 
        Cached.current = renderFound(fetcher.fetched, onRefetch);
    else if (!fetcher.isFetching && !fetcher.fetched && renderUnknown) 
        Cached.current = renderUnknown(onRefetch);
    return (renderBase || Cached.current) ? <div> {renderBase && renderBase(onRefetch)}
        {Cached.current || null}
    </div> : null
     
}

export default Response;