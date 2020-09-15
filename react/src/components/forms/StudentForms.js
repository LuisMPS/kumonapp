import {useRegisterSubmit, useUpdateSubmit} from "../../hooks/useSubmit";
import {useRegularInput} from "../../hooks/useInput";
import withFormHandlers from "../../hoc/withFormHandlers";
import RegisterFields from "../fields/RegisterFields";
import BasicInformationFields from "../fields/BasicFields";
import {HandledProgramPayFields} from "../fields/ProgramsFields";

const StudentRegisterForm = withFormHandlers(RegisterFields, 
    {useSubmit: useRegisterSubmit, useInput: useRegularInput}
);

const StudentBasicForm = withFormHandlers(BasicInformationFields,
    {useSubmit: useUpdateSubmit, useInput: useRegularInput}
);

const StudentProgramForm = withFormHandlers(HandledProgramPayFields,
    {useSubmit: useUpdateSubmit, useInput: useRegularInput}
);

export {StudentRegisterForm, StudentBasicForm, StudentProgramForm};



