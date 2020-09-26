import {useEffect} from "react";
import {useSubmit} from "./useSubmit";
import axios from "axios";

function useUserLogin() {
    const [onSubmit, submit, submitHandler] = useSubmit();
    useEffect(() => {
        if (!submit.toSubmit || !submit.toSubmit.current) return;
        const login = submit.toSubmit.current;
        const source = axios.CancelToken.source();
        axios.post("/login/user", login, {cancelToken: source.token})
        .then(() => { submitHandler.onSuccess().execute(); window.location.href = "/" })
        .catch(error => {
            if (!axios.isCancel(error)) submitHandler.onError().execute(error)
        });
        return source.cancel;
    }, [submit, submitHandler]);
    return [onSubmit, submitHandler];
}

function useUserRegister() {
    const [onSubmit, submit, submitHandler] = useSubmit();
    useEffect(() => {
        if (!submit.toSubmit || !submit.toSubmit.current) return;
        const {key, ...userinfo} = submit.toSubmit.current;
        const source = axios.CancelToken.source();
        const config = {headers: {"Authorization": `Bearer ${key}`}, cancelToken: source.token};
        axios.post("/api/users", userinfo, config)
        .then(() => { submitHandler.onSuccess().execute(); window.location.href = "/login" })
        .catch(error => {
            if (!axios.isCancel(error)) submitHandler.onError().execute(error);
        });
        return () => source.cancel();
    }, [submit, submitHandler]);
    return [onSubmit, submitHandler];
}

export {useUserRegister, useUserLogin};