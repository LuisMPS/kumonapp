import React from "react";
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core/styles";
import {CssBaseline} from "@material-ui/core";

const background = createMuiTheme({
    overrides: { MuiCssBaseline: {'@global': {body: {background: 
        "linear-gradient(90deg, rgba(129,172,227,1) 0%, rgba(110,213,221,1) 100%)"
    }}}}
});
  
function Background({children}) {
    return <MuiThemeProvider theme = {background}>
        <CssBaseline />
        {children}
    </MuiThemeProvider>;
}
  
export default Background;