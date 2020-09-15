import React, {useRef} from "react";
import {useSubmitHandlers} from "../hooks/useSubmit";

function withFormHandlers(Fields, {useSubmit, useInput}) {
    return function Form(props) {
        const {renders = {}, ...formProps} = props;
        const {onSuccess, onError, values = {}, path = [], ...hookProps} = formProps;
        const {inputProps = [], submitProps = []} = hookProps;
        const [onInput, input] = useInput(...inputProps);
        const [onSubmit, submitStatus, submitHandler] = useSubmit(...submitProps);    
        const handlers = useRef({onSuccess, onError});
        useSubmitHandlers(submitHandler, handlers);
        const {renderButton, renderSuccess, renderError} = renders;
        return (<>
            <form onSubmit = {event => onSubmit(input, event)}>
                <Fields onInput = {onInput} initial = {{values, path}} submitHandler = {submitHandler}/>
                {renderButton ? renderButton() : <button type = "submit">Subir</button>}
            </form>
            {submitStatus.success && renderSuccess && renderSuccess(submitStatus.success)}
            {submitStatus.error && renderError && renderError(submitStatus.error)}
        </>);
    }
}

export default withFormHandlers;