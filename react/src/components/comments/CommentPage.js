import React, {useContext} from "react";
import {UUIDContext} from "../../context/UUIDContext";
import {StyledButton} from "../styled/StyledButton";

function CommentPage({limit, update}) {
    const studentUUID = useContext(UUIDContext);
    const onMore = () => {
        const page = limit.current; page.to += page.skip;
        const nextPageSource = `/api/students/comments?sort_time=-1&limit_from=${page.from}&limit_to=${page.to}&student=${studentUUID}`;
        update([nextPageSource]);
    };
    return <StyledButton onClick = {onMore} buttonStyle = {{margin: "1rem"}}>
        Ver más
    </StyledButton>
}

export default CommentPage;