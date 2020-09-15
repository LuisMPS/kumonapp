import React from "react";
import Label from "../styled/Label";
import StyledInput from "../styled/StyledInput";
import StyledSelect from "../styled/StyledSelect";

function Fields(props) {
    const {fields = [], initial = {}, ...forInput} = props;
    const initialValues = initial.values;
    const initialPath = initial.path || [];
    return fields.map(field => {
        const {label, name, type, placeholder, styles = {}} = field; 
        const completename = [...initialPath, name].join(".");
        const value = initialValues && initialValues[name] !== undefined ? initialValues[name] : "";
        const parsedValue = type === "date" ? value.split("T")[0] : value;
        const {variant = "standard", adornment, inputStyle} = styles;
        const inputProps = {...forInput, type, placeholder, name: completename, defaultValue: parsedValue};
        const passingProps = {variant, inputProps};
        return <Label key = {name}> {label} 
            {type === "select" 
            ? <StyledSelect options = {field.options} inputStyle = {inputStyle} {...passingProps}/>
            : <StyledInput adornment = {adornment} inputStyle = {inputStyle} {...passingProps} />} 
        </Label>
    });
}

export default Fields;