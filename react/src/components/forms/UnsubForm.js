import {useStudentUnsub} from "../../hooks/useSubmit/useStudentSubmit";
import {useProgramUnsub} from "../../hooks/useSubmit/useProgramSubmit";
import {useConfirmInput} from "../../hooks/useInput";
import withFormHandlers from "../../hoc/withFormHandlers";
import UnsubFields from "../fields/UnsubFields";

const UnsubForm = withFormHandlers(UnsubFields, 
    {useSubmit: useStudentUnsub, useInput: useConfirmInput}
);

const UnsubProgramForm = withFormHandlers(UnsubFields, 
    {useSubmit: useProgramUnsub, useInput: useConfirmInput}
);

export {UnsubForm, UnsubProgramForm};