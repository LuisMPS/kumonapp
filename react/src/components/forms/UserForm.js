import {useRegularInput} from "../../hooks/useInput";
import {useUserLogin, useUserRegister} from "../../hooks/useSubmit/useUserSubmit";
import withFormHandlers from "../../hoc/withFormHandlers";
import {UserLoginFields, UserRegisterFields} from "../fields/UserFields";

const UserLoginForm = withFormHandlers(UserLoginFields,
    {useSubmit: useUserLogin, useInput: useRegularInput}
);

const UserRegisterForm = withFormHandlers(UserRegisterFields,
    {useSubmit: useUserRegister, useInput: useRegularInput}
);

export {UserLoginForm, UserRegisterForm};