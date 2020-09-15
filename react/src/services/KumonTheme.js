import React from "react";
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core/styles";
import {CssBaseline} from "@material-ui/core";
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';

const theme = createMuiTheme({
  palette: {primary: blue, error: red}
});

function KumonTheme({children}) {
    return <MuiThemeProvider theme = {theme}>
        <CssBaseline />
        {children}
    </MuiThemeProvider>;
}

export default KumonTheme;