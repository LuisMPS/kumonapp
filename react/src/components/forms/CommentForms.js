import {useCommentPost, useCommentUpdate, useCommentDelete} from "../../hooks/useSubmit/useCommentSubmit";
import {useRegularInput, useDummyInput} from "../../hooks/useInput";
import withFormHandlers from "../../hoc/withFormHandlers";
import {CommentPostFields} from "../fields/CommentFields";

const CommentPostForm = withFormHandlers(CommentPostFields, 
    {useSubmit: useCommentPost, useInput: useRegularInput}
);

const CommentUpdateForm = withFormHandlers(CommentPostFields,
    {useSubmit: useCommentUpdate, useInput: useRegularInput}
);

const CommentDeleteForm = withFormHandlers(() => null,
    {useSubmit: useCommentDelete, useInput: useDummyInput}
);

export {CommentPostForm, CommentUpdateForm, CommentDeleteForm};