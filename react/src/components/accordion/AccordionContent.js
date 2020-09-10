import React, {useContext, useRef, useLayoutEffect, useEffect} from "react";
import {AccordionContext} from "./Accordion.js";

function AccordionContent({children}) {
    const wrapper = useRef();
    const accordion = useContext(AccordionContext);
    
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
        <div ref = {wrapper} className = "accordion-wrapper">
            <div className = "accordion-content">
                {children}
            </div>
        </div>
    );
}

function AccordionHead({title, children}) {
    const accordion = useContext(AccordionContext);
    return (
        <div className = "accordion-head" onClick = {accordion.onToggle}>
            <span className = "accordion-title">{title}</span>
            {children}
        </div>
    );
}

function AccordionIcon({className, children}) {
    const accordion = useContext(AccordionContext); 
    return (
        <span className = {`${className || "accordion-icon"} ${accordion.isActive ? "active" : "inactive"}`}>
            {children}
        </span>
    );
} 

export {AccordionContent, AccordionHead, AccordionIcon};
