import {useUnsubSubmit} from "../../hooks/useSubmit";
import {useConfirmInput} from "../../hooks/useInput";
import withFormHandlers from "../../hoc/withFormHandlers";
import UnsubFields from "../fields/UnsubFields";

const UnsubForm = withFormHandlers(UnsubFields, 
    {useSubmit: useUnsubSubmit, useInput: useConfirmInput}
);

export default UnsubForm;