import React from "react";

function Fields({fields = [], initial = {}, onInput, required = false}) {
    const initialValues = initial.values;
    const initialPath = initial.path || [];
    return <> {fields.map(field => {
        const name = [...initialPath, field.name].join(".");
        const value = initialValues && initialValues[field.name] !== undefined ? initialValues[field.name] : "";
        const parsedValue = field.type === "date" ? value.split("T")[0] : value;
        return <label key = {field.name}> {field.label} 
            {field.type === "select" 
            ? <select name = {name} onInput = {onInput} defaultValue = {parsedValue || field.selected}>
                {field.options.map(option => <option key = {option} value = {option}>{option}</option>)}
            </select>
            : <input 
            type = {field.type}
            name = {name}
            defaultValue = {parsedValue}
            onInput = {onInput}
            required = {required} />} 
        </label>
    })} </>;
}

export default Fields;