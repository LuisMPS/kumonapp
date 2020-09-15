import React, {useState} from "react";
import {makeStyles, Popper, Fade, Paper} from "@material-ui/core";

const useStyles = makeStyles({
    expanded: {padding: "1rem 1.75rem"}
})

function TogglePopover(props) {
    const {isExpanded = false, ...rest} = props;
    const {renders} = rest;
    const [expansion, setExpansion] = useState({isExpanded, anchor: null});
    const onToggle = event => setExpansion(expansion => (
        {isExpanded: !expansion.isExpanded, anchor: event.currentTarget}
    ));
    const {renderExpanded, renderShrinked, renderButton} = renders;
    const classes = useStyles();
    return (<>
        {renderButton ? renderButton(onToggle) : <button type = "button" onClick = {onToggle}>Abrir</button>}
        {expansion.isExpanded ? renderExpanded && <Popper open={expansion.isExpanded} anchorEl={expansion.anchor} placement="bottom-end" transition>
        {({ TransitionProps }) => <Fade {...TransitionProps} timeout={350}>
            <Paper className = {classes.expanded}>{renderExpanded()}</Paper>
        </Fade>}
      </Popper> 
        : renderShrinked && renderShrinked()}
    </>);
}

export default TogglePopover;