import React from "react";

function ResponseFormatter({responses, formatter}) {
    if (!responses || !formatter) return null;
    return responses.map(response => {
        return <div key = {response.uuid}>
            {formatter(response)}
        </div>
    })
}

export default ResponseFormatter;