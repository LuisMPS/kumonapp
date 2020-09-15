import {makeStyles, Typography} from "@material-ui/core";
import React, {useContext, useRef, useLayoutEffect, useEffect} from "react";
import {AccordionContext} from "./Accordion.js";

const useStyles = makeStyles({
    accordion_wrapper: {overflowY: "hidden", transition: "height 0.25s ease-out"}
});

function AccordionContent({className, children}) {
    const wrapper = useRef();
    const accordion = useContext(AccordionContext);
    const classes = useStyles();
    
    useEffect(() => {
        const observer = new MutationObserver(() => {
            wrapper.current.style.height = 
            accordion.isActive ? `${wrapper.current.scrollHeight}px` : `0px`;
        })
        observer.observe(wrapper.current, {childList: true, subtree: true});
        return () => observer.disconnect();
    }, [accordion.isActive]);

    useLayoutEffect(() => {
        wrapper.current.style.height = 
        accordion.isActive ? `${wrapper.current.scrollHeight}px` : `0px`;
    }, [accordion.isActive]);
    
    return (
        <div ref = {wrapper} className = {classes.accordion_wrapper}>
            <div className = {className}>{children}</div>
        </div>
    );
}

function AccordionHead({className, title, children}) {
    const accordion = useContext(AccordionContext);
    return (
        <div className = {className} onClick = {accordion.onToggle}>
            <Typography component = "span">{title}</Typography>
            {children}
        </div>
    );
}

function AccordionIcon({className, children}) {
    const accordion = useContext(AccordionContext); 
    return (
        <span className = {`${className} ${accordion.isActive ? "active" : "inactive"}`}>
            {children}
        </span>
    );
} 

export {AccordionContent, AccordionHead, AccordionIcon};
