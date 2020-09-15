import {useUnsubSubmit, useProgramUnsubSubmit} from "../../hooks/useSubmit";
import {useConfirmInput} from "../../hooks/useInput";
import withFormHandlers from "../../hoc/withFormHandlers";
import UnsubFields from "../fields/UnsubFields";

const UnsubForm = withFormHandlers(UnsubFields, 
    {useSubmit: useUnsubSubmit, useInput: useConfirmInput}
);

const UnsubProgramForm = withFormHandlers(UnsubFields, 
    {useSubmit: useProgramUnsubSubmit, useInput: useConfirmInput}
);

export {UnsubForm, UnsubProgramForm};