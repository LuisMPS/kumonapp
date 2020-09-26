import {useEffect, useContext} from "react";
import {useSubmit} from "./useSubmit";
import {UUIDContext} from "../../context/UUIDContext";
import axios from "axios";

function useProgramUnsub(program) {
    const [onSubmit, submit, submitHandler] = useSubmit();
    const studentUUID = useContext(UUIDContext);
    useEffect(() => {
        if (!submit.toSubmit || !submit.toSubmit.current) return;
        const source = axios.CancelToken.source();
        axios.delete(`/api/students/programs?program=${program}&uuid=${studentUUID}`, {cancelToken: source.token})
        .then(success => submitHandler.onSuccess().execute(success))
        .catch(error => {
            if (!axios.isCancel(error)) submitHandler.onError().execute(error);
        });
        return () => source.cancel();
    }, [submit, submitHandler, studentUUID, program])
    return [onSubmit, submitHandler];
}

export {useProgramUnsub};