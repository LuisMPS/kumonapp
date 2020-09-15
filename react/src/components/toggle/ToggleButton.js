import React, {useState} from "react";

function ToggleButton(props) {
    const {once, isExpanded = false, isConfirm, renders} = props;
    const {renderExpanded, renderShrinked, renderButton, renderCancel} = renders;
    const [expanded, togglers] = useToggle({isExpanded, once});
    const {handleToggle, handleExpand, handleShrink} = togglers;
    return <>
        {renderButton ? renderButton(handleToggle) : <button type = "button" onClick = {handleToggle}>Expandir</button>}
        {expanded ? renderExpanded && <>
            {isConfirm ? ( renderCancel ? renderCancel(handleToggle) : <button onClick = {handleToggle}>Cancelar</button> ) : null}
            {renderExpanded(handleShrink)}
        </> 
        : renderShrinked && renderShrinked(handleExpand)}
    </>
}

function useToggle({isExpanded, once}) {
    const [expanded, setExpanded] = useState(isExpanded);
    const handleToggle = () => setExpanded(expansion => {
        return expanded !== isExpanded && once ? expansion : !expansion;
    });
    const handleExpand = () => setExpanded(true);
    const handleShrink = () => setExpanded(false);
    const togglers = {handleToggle, handleExpand, handleShrink};
    return [expanded, togglers];
}

export default ToggleButton;