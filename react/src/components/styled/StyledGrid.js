import React from "react";
import {makeStyles, Grid, Paper} from "@material-ui/core";
import Programs from "../../global/Programs";

const useGridStyles = makeStyles({
    grid: props => ({...props})
})

function StyledGrid(props) {
    const {gridStyle, children, ...gridProps} = props;
    const classes = useGridStyles(gridStyle);
    return <Grid className = {classes.grid} {...gridProps}>
        {children}
    </Grid>
}

function ProgramGridContainer(props) {
    const {children, ...rest} = props;
    const gridContainerProps = {container: true, spacing: 5};
    const gridProps = {...rest, ...gridContainerProps};
    return <StyledGrid {...gridProps} gridStyle = {{textAlign: "center"}}>
        {children}
    </StyledGrid>
}

const useTitleStyles = makeStyles({
    title: {padding: "1rem", textAlign: "center", fontSize: "1rem", margin: "1rem 0rem", backgroundColor: "#c3d3e0"}
})

function ProgramGridItem(props) {
    const classes = useTitleStyles();
    const {children, program, ...rest} = props;
    const gridItemProps = {item: true, xs: 12, md: 6, lg: 4};
    const gridProps = {...rest, ...gridItemProps};
    return <StyledGrid {...gridProps}>
        <Paper className = {classes.title} elevation = {4}>Programa: {Programs.alias(program)}</Paper>
        {children}
    </StyledGrid>
}

export default StyledGrid;
export {ProgramGridContainer, ProgramGridItem};