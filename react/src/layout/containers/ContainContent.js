import React from "react";
import StyledGrid from "../../components/styled/StyledGrid";

function ContainContent(props = {}) {
    const {children, gridStyle, ...gridProps} = props;
    return <StyledGrid container {...gridProps} gridStyle = {gridStyle}>
        <StyledGrid item xs = {1}/>
        <StyledGrid item xs = {10}>{children}</StyledGrid>
        <StyledGrid item xs = {1}/>
    </StyledGrid>
}

export default ContainContent;