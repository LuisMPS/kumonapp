import React from "react";
import Fields from "./Fields";

function CommentPostFields({initial, onInput}) {
    const commentfields = [
        {name: "message", placeholder: "Escribe aqui tu comentario...", type: "text", multiline: true, variant: "outlined", inputStyle: {width: "80%"}}
    ];
    return <Fields initial = {initial} onInput = {onInput} fields = {commentfields} required />
}

export {CommentPostFields};