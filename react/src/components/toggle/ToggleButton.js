import React, {useState} from "react";

function ToggleButton(props) {
    const {once, isExpanded = false, isConfirm, ...rest} = props;
    const {renders, ...buttonProps} = rest;
    const {caption} = buttonProps;
    const [expansion, setExpansion] = useState({isExpanded, count: 0});
    const onToggle = () => setExpansion(expansion => {
        if (expansion.count > 0 && once) return expansion;
        return {isExpanded: !expansion.isExpanded, count: expansion.count + 1};
    })
    const {renderExpanded, renderShrinked} = renders;
    return (<>
        <button type = "button" onClick = {onToggle}>{caption}</button>
        {expansion.isExpanded ? renderExpanded && <>
            {isConfirm && <button onClick = {onToggle}>Cancelar</button>}
            {renderExpanded()}
        </> 
        : renderShrinked && renderShrinked()}
    </>);
}

export default ToggleButton;