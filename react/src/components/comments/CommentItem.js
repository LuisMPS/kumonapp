import React, {useContext} from "react";
import {UUIDContext} from "../../context/UUIDContext";
import CommentDelete from "./CommentDelete";
import CommentUpdate from "./CommentUpdate";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    comment: {margin: "1rem 0rem"}
})

function CommentItem({comment, page, update}) {
    const classes = useStyles();
    const studentUUID = useContext(UUIDContext);
    const commentSource = `/api/students/comments?uuid=${comment.uuid}`;
    const allSource = `/api/students/comments?sort_time=-1&limit_from=${page.from}&limit_to=${page.to - 1}&student=${studentUUID}`;
    return <div className = {classes.comment}>
        <CommentDelete comment = {comment}/>
        <CommentUpdate onUpdate = {() => update([commentSource, allSource])} comment = {comment}/>
    </div>
}

export default CommentItem;