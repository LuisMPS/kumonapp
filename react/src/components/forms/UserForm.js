import {useRegularInput} from "../../hooks/useInput";
import {useUserLoginSubmit, useUserRegisterSubmit} from "../../hooks/useSubmit";
import withFormHandlers from "../../hoc/withFormHandlers";
import {UserLoginFields, UserRegisterFields} from "../fields/UserFields";

const UserLoginForm = withFormHandlers(UserLoginFields,
    {useSubmit: useUserLoginSubmit, useInput: useRegularInput}
);

const UserRegisterForm = withFormHandlers(UserRegisterFields,
    {useSubmit: useUserRegisterSubmit, useInput: useRegularInput}
);

export {UserLoginForm, UserRegisterForm};