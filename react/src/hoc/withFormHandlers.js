import React, {useRef} from "react";
import {useSubmitHandlers} from "../hooks/useSubmit";

function withFormHandlers(Fields, {useSubmit, useInput}) {
    return function HandledForm(props) {
        const {className, as: Form = "form", renders = {}, ...formProps} = props;
        const {onSuccess, onError, values = {}, path = [], ...hookProps} = formProps;
        const {inputProps = [], submitProps = []} = hookProps;
        const [onInput, input] = useInput(...inputProps);
        const [onSubmit, submitStatus, submitHandler] = useSubmit(...submitProps);    
        const handlers = useRef({onSuccess, onError});
        const onSub = event => onSubmit(input, event);
        useSubmitHandlers(submitHandler, handlers);
        const {renderButton, renderSuccess, renderError, renderWait} = renders;
        return <>
            <Form onSubmit = {onSub} className = {className}>
                <Fields onInput = {onInput} initial = {{values, path}} submitHandler = {submitHandler}/>
                {renderButton ? renderButton(onSub) : <button type = "submit">Subir</button>}
            </Form>
            {submitStatus.wait.pending && renderWait && renderWait(submitStatus.wait.progress, submitHandler)}
            {submitStatus.success && renderSuccess && renderSuccess(submitStatus.success, submitHandler)}
            {submitStatus.error && renderError && renderError(submitStatus.error, submitHandler)}
        </>;
    }
}

export default withFormHandlers;