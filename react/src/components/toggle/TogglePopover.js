import React, {useState} from "react";
import {makeStyles, Popover} from "@material-ui/core";

const useStyles = makeStyles({
    expanded: {padding: "1rem 1.75rem"}
})

function TogglePopover(props) {
    const classes = useStyles();
    const {isExpanded = false, ...rest} = props;
    const {renders} = rest;
    const [expansion, setExpansion] = useState({isExpanded, anchor: null});
    const onOpen = event => setExpansion({isExpanded: true, anchor: event.currentTarget});
    const onClose = () => setExpansion({isExpanded: false, anchor: null});
    const {renderExpanded, renderShrinked, renderButton} = renders;
    return (<>
        {renderButton ? renderButton(onOpen) : <button type = "button" onClick = {onOpen}>Abrir</button>}
        {expansion.isExpanded ? renderExpanded && <Popover open = {expansion.isExpanded} anchorEl = {expansion.anchor} onClose={onClose}
        anchorOrigin = {{vertical: 'bottom', horizontal: 'right'}} transformOrigin = {{vertical: 'top', horizontal: 'right'}} marginThreshold = {25}>
            <div className = {classes.expanded}>
            {renderExpanded()}
            </div>
        </Popover> 
        : renderShrinked && renderShrinked()}
    </>);
}

export default TogglePopover;