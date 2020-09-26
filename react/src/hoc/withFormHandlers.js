import React, {useRef} from "react";
import {useSubmitHandlers} from "../hooks/useSubmit/useSubmitHandlers";

function withFormHandlers(Fields, {useSubmit, useInput}) {
    return function HandledForm(props) {
        const {className, as: Form = "form", renders = {}, ...formProps} = props;
        const {onSuccess, onError, values = {}, path = [], ...hookProps} = formProps;
        const {inputProps = [], submitProps = []} = hookProps;
        const [onInput, input] = useInput(...inputProps);
        const [onSubmit, submitHandler] = useSubmit(...submitProps);   
        const handlers = useRef({onSuccess, onError});
        const onSub = event => onSubmit(input, event); 
        useSubmitHandlers(submitHandler, handlers);
        const {renderButton} = renders;
        return <Form onSubmit = {onSub} className = {className}>
            <Fields onInput = {onInput} initial = {{values, path}} submitHandler = {submitHandler}/>
            {renderButton && renderButton(onSub)}
        </Form>
    }
}

export default withFormHandlers;