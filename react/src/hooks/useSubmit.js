import {useEffect, useRef, useState, useContext} from "react";
import {UUIDContext} from "../context/UUIDContext";
import axios from "axios";

class SubmitHandler {
    constructor() {
        this.handlers = {onSuccess: new Handlers(), onError: new Handlers()};
    }
    onSuccess() { 
        return this.handlers.onSuccess; 
    }
    onError() { 
        return this.handlers.onError; 
    }
}

class Handlers {
    constructor() { 
        this.handlers = new Map();
    }
    register(...handlers) {
        handlers.forEach(handler => this.handlers.set(handler.id, handler.handler));
    }
    unregister(...handlers) {
        handlers.forEach(handler => this.handlers.delete(handler.id));
    }
    execute(...params) {
        [...this.handlers.values()].forEach(handler => handler(...params));
    }
    handler(id) {
        return this.handlers.get(id);
    }
}

function useSubmit() {
    const [submit, setSubmit] = useState({toSubmit: null, trigger: null});
    const [submitStatus, setSubmitStatus] = useState({success: null, error: null});
    const onSubmit = (info, event) => {
        event.preventDefault();
        event.persist();
        setSubmitStatus({success: null, error: null}); //UPDATES HERE ARE BATCHED
        setSubmit({toSubmit: info, trigger: event});
    };
    const submitHandler = useRef(new SubmitHandler()).current;
    const statusHandlers = useRef({
        onSuccess: [{id: "success", handler: success => setSubmitStatus({success, error: null})}],
        onError: [{id: "error", handler: error => setSubmitStatus({error, success: null})}]
    });
    useSubmitHandlers(submitHandler, statusHandlers);
    return [onSubmit, submit, submitStatus, submitHandler];
}

function useUpdateSubmit() {
    const [onSubmit, submit, submitStatus, submitHandler] = useSubmit();
    const studentUUID = useContext(UUIDContext); 
    useEffect(() => {
        if (!submit.toSubmit) return;
        const trigger = submit.trigger;
        const info = submit.toSubmit;
        const update = submit.toSubmit.current;
        const source = axios.CancelToken.source();
        axios.put(`/api/students/update?uuid=${studentUUID}`, update, {cancelToken: source.token})
        .then(success => {
            submitHandler.onSuccess().execute(success, trigger, info);
        })
        .catch(error => {
            if (!axios.isCancel(error)) submitHandler.onError().execute(error, trigger, info)
        });
        return () => source.cancel();
    }, [submit, submitHandler, studentUUID]);
    const resetHandler = useRef({
        onSuccess: [{id: "resetter", handler: (_f, _s, update) => update.current = {}}]
    });
    useSubmitHandlers(submitHandler, resetHandler);
    return [onSubmit, submitStatus, submitHandler];
}

function useRegisterSubmit() {
    const [onSubmit, submit, submitStatus, submitHandler] = useSubmit();
    useEffect(() => {
        if (!submit.toSubmit) return;
        const info = submit.toSubmit;
        const student = submit.toSubmit.current;
        const trigger = submit.trigger;
        const source = axios.CancelToken.source();
        axios.post(`/api/students`, student, {cancelToken: source.token})
        .then(success => submitHandler.onSuccess().execute(success, trigger, info))
        .catch(error => {
            if (!axios.isCancel(error)) submitHandler.onError().execute(error, trigger, info)
        });
        return () => source.cancel();
    }, [submit, submitHandler]);
    const resetHandler = useRef({
        onSuccess: [{id: "resetter", handler: (_f, event, student) => {
            event.target.reset();
            student.current = {}
        }}]
    });
    useSubmitHandlers(submitHandler, resetHandler);
    return [onSubmit, submitStatus, submitHandler];
}

function useFileSubmit() {
    const [onSubmit, submit, submitStatus, submitHandler] = useSubmit();
    const studentUUID = useContext(UUIDContext);
    useEffect(() => {
        if (!submit.toSubmit || !submit.toSubmit.current) return;
        const file = submit.toSubmit.current;
        const filePath = file.filePath;
        const source = axios.CancelToken.source();
        const config = {headers: {"Accept": "*/*", "Content-Type": `${file.type}`}};
        axios.post(`/api/students/upload/${filePath}?uuid=${studentUUID}`, file, {...config, cancelToken: source.token})
        .then(success => submitHandler.onSuccess().execute(success.data.src))
        .catch(error => {
            if (!axios.isCancel(error)) submitHandler.onError().execute(error);
        });
        return () => source.cancel();
    }, [submit, submitHandler, studentUUID]);
    return [onSubmit, submitStatus, submitHandler];
}

function useUserLoginSubmit() {
    const [onSubmit, submit, submitStatus, submitHandler] = useSubmit();
    useEffect(() => {
        if (!submit.toSubmit || !submit.toSubmit.current) return;
        const login = submit.toSubmit.current;
        const source = axios.CancelToken.source();
        axios.post("/login/user", login, {cancelToken: source.token})
        .then(() => window.location.href = "/")
        .catch(error => {
            if (!axios.isCancel(error)) submitHandler.onError().execute(error)
        });
        return () => source.cancel();
    }, [submit, submitHandler]);
    return [onSubmit, submitStatus, submitHandler];
}

function useUnsubSubmit() {
    const [onSubmit, submit, submitStatus, submitHandler] = useSubmit();
    const studentUUID = useContext(UUIDContext);
    useEffect(() => {
        if (!submit.toSubmit || !submit.toSubmit.current) return;
        const source = axios.CancelToken.source();
        axios.delete(`/api/students/delete?uuid=${studentUUID}`, {cancelToken: source.token})
        .then(() => window.location.href = "/")
        .catch(error => {
            if (!axios.isCancel(error)) submitHandler.onError().execute(error)
        });
        return () => source.cancel();
    }, [submit, submitHandler, studentUUID])
    return [onSubmit, submitStatus, submitHandler];
}

function useUserRegisterSubmit() {
    const [onSubmit, submit, submitStatus, submitHandler] = useSubmit();
    useEffect(() => {
        if (!submit.toSubmit || !submit.toSubmit.current) return;
        const {key, ...userinfo} = submit.toSubmit.current;
        const source = axios.CancelToken.source();
        const config = {headers: {"Authorization": `Bearer ${key}`}, cancelToken: source.token};
        axios.post("/api/users", userinfo, config)
        .then(() => window.location.href = "/login")
        .catch(error => {
            if (!axios.isCancel(error)) submitHandler.onError().execute(error);
        });
        return () => source.cancel();
    }, [submit, submitHandler]);
    return [onSubmit, submitStatus, submitHandler];
}

function useSubmitHandlers(submitHandler, handlers) {
    useEffect(() => {
        const {onSuccess = [], onError = []} = handlers.current || {};
        submitHandler.onSuccess().register(...onSuccess);
        submitHandler.onError().register(...onError);
        return () => {
            submitHandler.onSuccess().unregister(...onSuccess);
            submitHandler.onError().unregister(...onError);
        }
    }, [submitHandler, handlers]);
}

export {useRegisterSubmit, useUpdateSubmit, useFileSubmit, 
        useUserRegisterSubmit, useUserLoginSubmit, useUnsubSubmit,
        useSubmitHandlers};