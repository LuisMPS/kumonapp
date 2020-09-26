import {useFileInput} from "../../hooks/useInput";
import useFileSubmit from "../../hooks/useSubmit/useFileSubmit";
import withFormHandlers from "../../hoc/withFormHandlers";
import UploadFields from "../fields/UploadFields";

const UploadForm = withFormHandlers(UploadFields,
    {useSubmit: useFileSubmit, useInput: useFileInput}
);

export default UploadForm;