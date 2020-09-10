import {useRegisterSubmit, useUpdateSubmit} from "../../hooks/useSubmit";
import {useRegularInput} from "../../hooks/useInput";
import withFormHandlers from "../../hoc/withFormHandlers";
import {RegisterFields, UpdateFields} from "../fields/StundentFields";

const StudentRegisterForm = withFormHandlers(RegisterFields, 
    {useSubmit: useRegisterSubmit, useInput: useRegularInput}
);
const StudentUpdateForm = withFormHandlers(UpdateFields, 
    {useSubmit: useUpdateSubmit, useInput: useRegularInput}
);

export {StudentRegisterForm, StudentUpdateForm};



