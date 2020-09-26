import React from "react";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    comment: {display: "inline", lineHeight: "0.5rem", fontSize: "1rem"},
    comment_time: {marginLeft: "0.5rem", marginRight: "0.25rem"},
    comment_user: {marginLeft: "0.5rem", marginRight: "0.25rem", fontWeight: "bold"},
    comment_message: {marginLeft: "0.25rem"}
});

function CommentPresent({comment}) {
    const classes = useStyles();
    return <p className = {classes.comment}>
        <span className = {classes.comment_time}>({comment.time.split("T")[0]})</span>
        <span className = {classes.comment_user}>[{comment.author.name}]:</span>
        <span className = {classes.comment_message}>{comment.message}</span>
    </p>
}

export default CommentPresent;