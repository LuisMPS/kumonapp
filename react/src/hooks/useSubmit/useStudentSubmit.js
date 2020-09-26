import {useEffect, useRef, useContext} from "react";
import {useSubmit} from "./useSubmit";
import {useSubmitHandlers} from "./useSubmitHandlers";
import {UUIDContext} from "../../context/UUIDContext";
import {FormContext} from "../../context/FormContext";
import axios from "axios";

function useStudentRegister() {
    const [onSubmit, submit, submitHandler] = useSubmit();
    const [submitStatus] = useContext(FormContext);
    useEffect(() => {
        if (!submit.toSubmit || !submit.toSubmit.current) return;
        const info = submit.toSubmit;
        const student = submit.toSubmit.current;
        const trigger = submit.trigger
        const {name, lastname} = student;
        const source = axios.CancelToken.source();
        axios.get(`/api/students?detect_name=${name}&detect_lastname=${lastname}`, {cancelToken: source.token})
        .then(success => success.data)
        .then(students => submitHandler.onWait().execute({allow: students.length === 0, trigger, info}))
        .catch(error => {
            if (!axios.isCancel(error)) submitHandler.onError().execute(error)
        });
        return () => source.cancel();
    }, [submit, submitHandler]); //DEPENDENCIES PREVENT RE-CHECK

    useEffect(() => {
        if (!submitStatus.wait.progress || !submitStatus.wait.progress.allow) return;
        if (!submit.toSubmit || !submit.toSubmit.current) return;
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
    }, [submit, submitHandler, submitStatus.wait.progress]);

    const resetHandler = useRef({
        onSuccess: [{id: "resetter", handler: (_f, event, student) => {
            if (event) event.target.reset();
            if (student) student.current = {}
        }}]
    });
    useSubmitHandlers(submitHandler, resetHandler);
    return [onSubmit, submitHandler];
}

function useStudentUpdate() {
    const [onSubmit, submit, submitHandler] = useSubmit();
    const studentUUID = useContext(UUIDContext); 
    useEffect(() => {
        if (!submit.toSubmit || !submit.toSubmit.current) return;
        const trigger = submit.trigger;
        const info = submit.toSubmit;
        const update = submit.toSubmit.current;
        const source = axios.CancelToken.source();
        axios.put(`/api/students/update?uuid=${studentUUID}`, update, {cancelToken: source.token})
        .then(success => submitHandler.onSuccess().execute(success, trigger, info))
        .catch(error => {
            if (!axios.isCancel(error)) submitHandler.onError().execute(error, trigger, info)
        });
        return () => source.cancel();
    }, [submit, submitHandler, studentUUID]);
    const resetHandler = useRef({
        onSuccess: [{id: "resetter", handler: (_f, _s, update) => update.current = {}}]
    });
    useSubmitHandlers(submitHandler, resetHandler);
    return [onSubmit, submitHandler];
}

function useStudentUnsub() {
    const [onSubmit, submit, submitHandler] = useSubmit();
    const studentUUID = useContext(UUIDContext);
    useEffect(() => {
        if (!submit.toSubmit || !submit.toSubmit.current) return;
        const source = axios.CancelToken.source();
        axios.delete(`/api/students/delete?uuid=${studentUUID}`, {cancelToken: source.token})
        .then(() => { submitHandler.onSuccess().execute(); window.location.href = "/"; })
        .catch(error => {
            if (!axios.isCancel(error)) submitHandler.onError().execute(error)
        });
        return () => source.cancel();
    }, [submit, submitHandler, studentUUID])
    return [onSubmit, submitHandler];
}

export {useStudentRegister, useStudentUpdate, useStudentUnsub};