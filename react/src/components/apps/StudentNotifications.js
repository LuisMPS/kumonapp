import React, { Fragment } from "react";
import ToggleButton from "../toggle/ToggleButton";
import {notifications} from "../../global/Calls";
import Student from "../student/Student";
import StudentFormatter from "../student/StudentFormatter";

function StudentNotifications() {
    return <ToggleButton caption = "Ver notificaciones"
    renders = {{ renderExpanded: () => notifications.map(notification => {
        const content = notification.content;
        return <Fragment key = {notification.id}>
            {content.map(notif => <Student key = {notif.id} sources = {notif.sources}
            renders = {{
                renderUnknown: notif.renderUnknown, 
                renderFound: students => <StudentFormatter students = {students} formatter = {notif.formatter}/>
            }}/>)}
        </Fragment>
    })}}
    />
}

export default StudentNotifications;