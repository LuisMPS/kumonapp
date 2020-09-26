import React from "react";
import Label from "../styled/Label";
import StyledInput from "../styled/StyledInput";
import StyledSelect from "../styled/StyledSelect";

function Fields(props) {
    const {fields = [], initial = {}, ...forInput} = props;
    const initialValues = initial.values;
    const initialPath = initial.path || [];
    return fields.map(field => {
        const {label, name, type, ...fieldProps} = field; 
        const completename = [...initialPath, name].join(".");
        const value = initialValues && initialValues[name] !== undefined ? initialValues[name] : "";
        const parsedValue = type === "date" ? value.split("T")[0] : value;
        const inputProps = {...forInput, ...fieldProps, type, name: completename, defaultValue: parsedValue};
        return <Label key = {completename}> {label} 
            {type === "select" 
            ? <StyledSelect options = {field.options} {...inputProps}/>
            : <StyledInput {...inputProps} />} 
        </Label>
    });
}

export default Fields;