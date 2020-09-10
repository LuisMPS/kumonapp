import React from "react";
import ToggleButton from "../toggle/ToggleButton";
import {StudentRegisterForm} from "../forms/StudentForms";
import { FlashCard } from "../cards/Cards";

function StudentRegister() {
    return <ToggleButton caption = "Registrar Alumno"
    renders = {{ renderExpanded: () => <StudentRegisterForm
        renders = {{
            renderSuccess: () => <FlashCard duration = {2500} type = "success">Alumno registrado correctamente!</FlashCard>,
            renderError: () => <FlashCard duration = {2500} type = "error">Error al registrar alumno</FlashCard>
        }}/>
    }}/>
}

export default StudentRegister;