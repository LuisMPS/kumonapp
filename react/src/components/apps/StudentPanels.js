import React from "react";
import {Accordion} from "../accordion/Accordion";
import {AccordionHead, AccordionIcon, AccordionContent} from "../accordion/AccordionContent";
import {panels} from "../../global/Calls";
import Student from "../student/Student";
import StudentFormatter from "../student/StudentFormatter";

function StudentPanels() {
    return panels.map(panel => <Accordion key = {panel.id}>
        <AccordionHead title = {panel.title}>
            <AccordionIcon>+</AccordionIcon>
        </AccordionHead>
        <AccordionContent>
           {panel.content.map(content => <Student key = {content.id} sources = {content.sources}
           renders = {{
               renderUnknown: content.renderUnknown,
               renderLoading: content.renderLoading,
               renderFound: students => <StudentFormatter students = {students} formatter = {content.formatter} />
           }}/>)} 
        </AccordionContent>
    </Accordion>)
}

export default StudentPanels