import React, {createContext} from "react";

const UUIDContext = createContext();

function UUIDContained({children}) {
    const query = new URLSearchParams(window.location.search);
    const uuid = query.get("uuid");
    return (
        <UUIDContext.Provider value = {uuid}>
            {children}
        </UUIDContext.Provider>
    );
}

export {UUIDContext, UUIDContained};