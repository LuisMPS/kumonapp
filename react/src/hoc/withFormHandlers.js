import React, {useRef, Fragment} from "react";
import {useSubmitHandlers} from "../hooks/useSubmit";

function withFormHandlers(Fields, {useSubmit, useInput}) {
    return function Form(props) {
        const {renders = {}, ...formProps} = props;
        const {onSuccess, onError, submitButton = true, values = {}} = formProps;
        const [onInput, input] = useInput();
        const [onSubmit, submitStatus, submitHandler] = useSubmit();    
        const handlers = useRef({onSuccess, onError});
        useSubmitHandlers(submitHandler, handlers);
        const {renderSuccess = () => null, renderError = () => null} = renders;
        return (<>
            <form onSubmit = {event => onSubmit(input, event)}>
                <Fields onInput = {onInput} initial = {{values, path: []}} submitHandler = {submitHandler}/>
                {submitButton && <button type = "submit">Subir</button>}
            </form>
            {submitStatus.success && <Fragment key = {Date.now()}>{renderSuccess(submitStatus.success)}</Fragment>}
            {submitStatus.error && <Fragment key = {Date.now()}>{renderError(submitStatus.error)}</Fragment>}
        </>);
    }
}

export default withFormHandlers;