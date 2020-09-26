import {useEffect, useContext} from "react";
import {useSubmit} from "./useSubmit";
import {UUIDContext} from "../../context/UUIDContext";
import axios from "axios";

function useFileSubmit(filePath) {
    const [onSubmit, submit, submitHandler] = useSubmit();
    const studentUUID = useContext(UUIDContext);
    useEffect(() => {
        if (!submit.toSubmit || !submit.toSubmit.current) return;
        const file = submit.toSubmit.current;
        const source = axios.CancelToken.source();
        const fileSplit = file.name.split(".");
        const ext = `.${fileSplit[fileSplit.length - 1]}`;
        const src = [filePath, studentUUID].join("/").concat(ext);
        axios.get(`/api/students/upload/${filePath}?uuid=${studentUUID}`, {cancelToken: source.token})
        .then(response => response.data)
        .then(signature => {
            const {url, fields} = signature;
            const formData = new FormData();
            Object.keys(fields).forEach(key => formData.append(key, fields[key]));
            formData.append("key", src)
            formData.append("file", file);
            return axios.post(url, formData, {cancelToken: source.token, onUploadProgress: progress => submitHandler.onWait().execute(progress)})
        })
        .then(() => axios.put(`/api/students/upload/${filePath}?uuid=${studentUUID}`, {src}, {cancelToken: source.token}))
        .then(() => submitHandler.onSuccess().execute(src))
        .catch(err => {
            if (!axios.isCancel(err)) submitHandler.onError().execute(err)
        })
        return () => source.cancel();
    }, [submit, submitHandler, studentUUID, filePath]);
    return [onSubmit, submitHandler];
}

export default useFileSubmit;