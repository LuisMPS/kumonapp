import React, {useRef} from "react";
import {useSubmitHandlers} from "../hooks/useSubmit";

function withFieldHandlers(Fields) {
    return function HandledFields(props) {
        const {onSuccess, onError, submitHandler, ...fieldProps} = props; 
        const handlers = useRef({onSuccess, onError});
        useSubmitHandlers(submitHandler, handlers);
        return <Fields {...fieldProps} />;
    }
}

export default withFieldHandlers;