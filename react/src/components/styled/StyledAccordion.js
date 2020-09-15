import {Accordion} from "../accordion/Accordion";
import {AccordionContent, AccordionHead, AccordionIcon} from "../accordion/AccordionContent";
import {styled} from "@material-ui/core/styles";

const curry = fn => {
	const arity = fn.length;
	return function $curry(...args) {
		if (args.length < arity) return $curry.bind(null, ...args);
		else return fn.call(null, ...args);	
	}
}
const styleAccordionItem = curry((styles, item) => styled(item)(styles));

const panelStyles = {
    accordion: {
        backgroundColor: "#81b8e3",
        margin: "1.2rem 0rem"
    },
    accordion_head: {
        position: "relative",
        cursor: "pointer",
        padding: "1.25rem 1.5rem", 
        color: "white", 
    },
    accordion_icon: {
        color: "white", 
        fontSize: "1.5rem", 
        transition: "all 0.2s ease-in", 
        position: "absolute",
        top: "20%",
        right: "1rem",
        "&.active": {
            transform: "rotate(45deg)"
        }, 
        "&.inactive": {
            transform: "rotate(0deg)"
        }
    },
    accordion_content: {
        backgroundColor: "#d9ebfb",
        padding: "1.5rem 1.5rem"
    }
};

const PanelAccordion = styleAccordionItem(panelStyles.accordion, Accordion);
const PanelAccordionHead = styleAccordionItem(panelStyles.accordion_head, AccordionHead);
const PanelAccordionIcon = styleAccordionItem(panelStyles.accordion_icon, AccordionIcon);
const PanelAccordionContent = styleAccordionItem(panelStyles.accordion_content, AccordionContent);

export {PanelAccordion, PanelAccordionHead, PanelAccordionIcon, PanelAccordionContent};
export default styleAccordionItem;

