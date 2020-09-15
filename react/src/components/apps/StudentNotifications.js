import React, {Fragment} from "react";
import TogglePopover from "../toggle/TogglePopper";
import {notifications} from "../../global/Calls";
import Student from "../student/Student";
import StudentFormatter from "../student/StudentFormatter";
import {StyledIconButton} from "../styled/StyledButton";
import NotificationsIcon from '@material-ui/icons/Notifications';

function StudentNotifications() {
    return <TogglePopover
    renders = {{ renderExpanded: () => notifications.map(notification => {
        const content = notification.content;
        return <Fragment key = {notification.id}>
            {content.map(notif => <Student key = {notif.id} sources = {notif.sources}
            renders = {{
                renderLoading: () => "La notificación se mostrará aquí a continuación...",
                renderUnknown: notif.renderUnknown, 
                renderFound: students => <StudentFormatter students = {students} formatter = {notif.formatter}/>
            }}/>)}
        </Fragment>
    }), renderButton: onToggle => <StyledIconButton onClick = {onToggle} >
        <NotificationsIcon />
    </StyledIconButton>}}
    />
}

export default StudentNotifications;