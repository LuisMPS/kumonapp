import React, {useContext, useRef} from "react";
import {UUIDContext} from "../../context/UUIDContext";
import Comment from "../response/Response";
import CommentFormatter from "../response/ResponseFormatter";
import CommentItem from "./CommentItem";
import CommentPost from "./CommentPost";
import CommentPage from "./CommentPage";
import CommentContained from "./CommentContained";
import {makeStyles, Paper} from "@material-ui/core";

const useStyles = makeStyles({
    comments_title: {margin: "3rem auto 2.25rem auto", padding: "0.9rem", width: "80%", backgroundColor: "#c3d3e0"},
    comment_header: {margin: "0rem"}
})

function CommentList({initialMax}) {
    const classes = useStyles();
    const limit = useRef({from: 0, to: initialMax, skip: initialMax});
    const studentUUID = useContext(UUIDContext);
    const page = limit.current;
    const source = `/api/students/comments?sort_time=-1&limit_from=${page.from}&limit_to=${page.to}&student=${studentUUID}`;
    return <>
        <Paper elevation = {6} className = {classes.comments_title}> 
            <h2 className = {classes.comment_header}>Comentarios</h2>
        </Paper>
        <Comment sources = {[source]} renders = {{
        renderFound: (comments, update) => <CommentContained update = {update} source = {source}>
            <CommentFormatter responses = {comments} formatter = {comment => 
                <CommentItem comment = {comment} page = {page} update = {update}/>}
            />
            <CommentPage limit = {limit} update = {update}/>
            <CommentPost />
        </CommentContained>,
        renderUnknown: update => <CommentContained update = {update} source = {source}>
            <p>No se encontró ningún comentario :(</p>
            <CommentPost onPost = {update} />
        </CommentContained>
        }}/>
    </>
}

export default CommentList;