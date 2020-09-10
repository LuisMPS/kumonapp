import React from "react";
import logo from "./logo.png";

function Header({children}) {
    return <header>
        <a href = "/"> <img src = {logo} alt = "logo" /> </a>
        {children}
    </header> 
}

export default Header;