import {useStudentRegister, useStudentUpdate} from "../../hooks/useSubmit/useStudentSubmit";
import {useRegularInput} from "../../hooks/useInput";
import withFormHandlers from "../../hoc/withFormHandlers";
import RegisterFields from "../fields/RegisterFields";
import BasicInformationFields from "../fields/BasicFields";
import {HandledProgramPayFields} from "../fields/ProgramsFields";

const StudentRegisterForm = withFormHandlers(RegisterFields, 
    {useSubmit: useStudentRegister, useInput: useRegularInput}
);

const StudentBasicForm = withFormHandlers(BasicInformationFields,
    {useSubmit: useStudentUpdate, useInput: useRegularInput}
);

const StudentProgramForm = withFormHandlers(HandledProgramPayFields,
    {useSubmit: useStudentUpdate, useInput: useRegularInput}
);

export {StudentRegisterForm, StudentBasicForm, StudentProgramForm};



