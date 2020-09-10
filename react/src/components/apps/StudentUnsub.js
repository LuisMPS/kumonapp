import React from "react";
import UnsubForm from "../forms/UnsubForm";
import {FlashCard} from "../cards/Cards";

function StudentUnsub() {
    return <UnsubForm submitButton = {false} renders = {{
        renderError: () => <FlashCard duration = {2500} type = "error">
            <p>No se pudo dar de baja</p>
        </FlashCard>
    }}/>
}

export default StudentUnsub;