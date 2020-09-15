import React from "react";
import {StyledButton} from "../styled/StyledButton";
import StyledFileSelect from "../styled/StyledFileSelect";
import PermMediaIcon from '@material-ui/icons/PermMedia';

function UploadFields({onInput}) {
    return <StyledFileSelect onInput = {onInput} as = {
    <StyledButton component = "span" startIcon = {<PermMediaIcon />}> 
        Seleccionar
    </StyledButton>
    }/>
}

export default UploadFields;