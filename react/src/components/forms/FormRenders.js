import React, {useContext} from "react";
import {FormContext} from "../../context/FormContext";

function FormRenders({renders}) {
    const [submitStatus, _ignore, submitHandler] = useContext(FormContext);
    const {renderSuccess, renderError, renderWait} = renders;
    return <div className = "form-renders">
        {submitStatus.success && renderSuccess && renderSuccess(submitStatus.success, submitHandler)}
        {submitStatus.error && renderError && renderError(submitStatus.error, submitHandler)}
        {submitStatus.wait.pending && renderWait && renderWait(submitStatus.wait.progress, submitHandler)}
    </div>;
}

export default FormRenders;