import React from "react";
import {PanelAccordion, PanelAccordionHead, PanelAccordionIcon, PanelAccordionContent} from "../styled/StyledAccordion";
import {panels} from "../../global/Calls";
import Student from "../response/Response";
import StudentFormatter from "../response/ResponseFormatter";

function StudentPanels() {
    return panels.map(panel => <PanelAccordion key = {panel.id}>
        <PanelAccordionHead title = {panel.title}>
            <PanelAccordionIcon>+</PanelAccordionIcon>
        </PanelAccordionHead>
        <PanelAccordionContent>
           {panel.content.map(content => <Student key = {content.id} sources = {content.sources}
           renders = {{
               renderUnknown: content.renderUnknown,
               renderLoading: content.renderLoading,
               renderFound: students => <StudentFormatter responses = {students} formatter = {content.formatter} />
           }}/>)} 
        </PanelAccordionContent>
    </PanelAccordion>)
}

export default StudentPanels