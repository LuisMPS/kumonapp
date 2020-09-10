import React from "react";

function StudentFormatter({students, formatter}) {
    if (!students || !formatter) return null;
    return students.map(student => {
        return <div key = {student.uuid}>
            {formatter(student)}
        </div>
    })
}

export default StudentFormatter;