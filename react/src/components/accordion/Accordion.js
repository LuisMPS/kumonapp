import React, {useState} from "react";

const AccordionContext = React.createContext(
    {onToggle: () => {}, isActive: null}
);

function Accordion({className, children}) {
    const [active, setActive] = useState(false);
    const onToggle = () => setActive(!active);
    return (
        <AccordionContext.Provider value = {{onToggle, isActive: active}}>
            <section className = {className}>
                {children}
            </section>
        </AccordionContext.Provider>
    );
}

export {Accordion, AccordionContext};