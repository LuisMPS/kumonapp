import React from "react";
import {createFileInput} from "../../hooks/useInput";
import {useFileSubmit} from "../../hooks/useSubmit";
import withFormHandlers from "../../hoc/withFormHandlers";
import UploadFields from "../fields/UploadFields";

function UploadForm(props) {
    const {filePath, ...formProps} = props;
    const Form = withFormHandlers(UploadFields, 
        {useSubmit: useFileSubmit, useInput: createFileInput(filePath)}
    );
    return <Form {...formProps} />
}

export default UploadForm;