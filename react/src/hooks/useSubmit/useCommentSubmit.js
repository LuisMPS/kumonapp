import {useEffect, useContext, useRef} from "react";
import {useSubmit} from "./useSubmit";
import {useSubmitHandlers} from "./useSubmitHandlers";
import {UUIDContext} from "../../context/UUIDContext";
import axios from "axios";

function useCommentPost() {
    const [onSubmit, submit, submitHandler] = useSubmit();
    const studentUUID = useContext(UUIDContext);
    useEffect(() => {
        if (!submit.toSubmit || !submit.toSubmit.current) return;
        const info = submit.toSubmit;
        const comment = submit.toSubmit.current; 
        comment.student = studentUUID; comment.time = Date.now();
        const trigger = submit.trigger;
        const source = axios.CancelToken.source();
        axios.post(`/api/students/comments`, comment, {cancelToken: source.token})
        .then(success => submitHandler.onSuccess().execute(success, trigger, info))
        .catch(error => {
            if (!axios.isCancel(error)) submitHandler.onError().execute(error, trigger, info)
        });
        return () => source.cancel();
    }, [submit, submitHandler, studentUUID]);  
    const resetHandler = useRef({
        onSuccess: [{id: "resetter", handler: (_f, _e, comment) => comment.current = {}}]
    });
    useSubmitHandlers(submitHandler, resetHandler);
    return [onSubmit, submitHandler];
}

function useCommentUpdate(commentUUID) {
    const [onSubmit, submit, submitHandler] = useSubmit();
    useEffect(() => {
        if (!submit.toSubmit || !submit.toSubmit.current) return;
        const trigger = submit.trigger;
        const info = submit.toSubmit;
        const update = submit.toSubmit.current;
        const source = axios.CancelToken.source();
        axios.put(`/api/students/comments/update?uuid=${commentUUID}`, update, {cancelToken: source.token})
        .then(success => submitHandler.onSuccess().execute(success, trigger, info))
        .catch(error => {
            if (!axios.isCancel(error)) submitHandler.onError().execute(error, trigger, info)
        });
        return () => source.cancel();
    }, [submit, submitHandler, commentUUID]);
    const resetHandler = useRef({
        onSuccess: [{id: "resetter", handler: (_f, _s, update) => update.current = {}}]
    });
    useSubmitHandlers(submitHandler, resetHandler);
    return [onSubmit, submitHandler];
}

function useCommentDelete(commentUUID) {
    const [onSubmit, submit, submitHandler] = useSubmit();
    useEffect(() => {
        if (!submit.trigger) return;
        const source = axios.CancelToken.source();
        axios.delete(`/api/students/comments/delete?uuid=${commentUUID}`, {cancelToken: source.token})
        .then(success => submitHandler.onSuccess().execute(success))
        .catch(error => {
            if (!axios.isCancel(error)) submitHandler.onError().execute(error)
        });
        return () => source.cancel();
    }, [submit, submitHandler, commentUUID])
    return [onSubmit, submitHandler];
}

export {useCommentPost, useCommentUpdate, useCommentDelete};