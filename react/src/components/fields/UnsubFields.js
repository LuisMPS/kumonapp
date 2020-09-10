import React from "react";
import ToggleButton from "../toggle/ToggleButton";

function UnsubFields({onInput}) {
    return <ToggleButton isConfirm caption = "Dar de baja" renders = {{
        renderExpanded: () => <button onClick = {onInput}>Confirmar</button>
    }}/>
}

export default UnsubFields;