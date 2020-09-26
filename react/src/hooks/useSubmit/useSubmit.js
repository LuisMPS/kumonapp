import {useContext, useState} from "react";
import {FormContext} from "../../context/FormContext";

function useSubmit() {
    const [submit, setSubmit] = useState({toSubmit: null, trigger: null});
    const [submitStatus, setSubmitStatus, submitHandler] = useContext(FormContext);
    const onSubmit = (info, event) => {
        event.preventDefault();
        if (submitStatus.wait.pending || !info || !info.current) return;
        event.persist();
        setSubmitStatus({wait: {pending: true, progress: null}, success: null, error: null}); //UPDATES HERE ARE BATCHED
        setSubmit({toSubmit: info, trigger: event});
    };
    return [onSubmit, submit, submitHandler];
}

export {useSubmit};