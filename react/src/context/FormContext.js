import React, {useState, useRef, createContext} from "react";
import {useSubmitHandlers, SubmitHandler} from "../hooks/useSubmit/useSubmitHandlers";

const initialStatus = {wait: {pending: false, progress: null}, success: null, error: null};
const FormContext = createContext([initialStatus, () => null, new SubmitHandler()]);

function FormContained(props) {
    const {children, ...handlers} = props;
    const {onSuccess = [], onError = [], onWait = []} = handlers;
    const [submitStatus, setSubmitStatus] = useState(initialStatus);
    const submitHandler = useRef(new SubmitHandler()).current;
    const statusHandlers = useRef({
        onSuccess: [{id: "success", handler: success => setSubmitStatus({success, error: null, wait: {pending: false, progress: null}})}, ...onSuccess],
        onError: [{id: "error", handler: error => setSubmitStatus({error, success: null, wait: {pending: false, progress: null}})}, ...onError],
        onWait: [{id: "wait", handler: progress => setSubmitStatus({wait: {pending: true, progress}, success: null, error: null})}, ...onWait]
    });
    useSubmitHandlers(submitHandler, statusHandlers);
    return <FormContext.Provider value = {[submitStatus, setSubmitStatus, submitHandler]}>
        {children}
    </FormContext.Provider>;
}

export {FormContext, FormContained};