import React from "react";

function UploadFields({onInput}) {
    return <input type = "file" onInput = {onInput} />;
}

export default UploadFields;