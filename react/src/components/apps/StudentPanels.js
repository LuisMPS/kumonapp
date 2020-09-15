import React from "react";
import {PanelAccordion, PanelAccordionHead, PanelAccordionIcon, PanelAccordionContent} from "../styled/StyledAccordion";
import {panels} from "../../global/Calls";
import Student from "../student/Student";
import StudentFormatter from "../student/StudentFormatter";

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
               renderFound: students => <StudentFormatter students = {students} formatter = {content.formatter} />
           }}/>)} 
        </PanelAccordionContent>
    </PanelAccordion>)
}

export default StudentPanels