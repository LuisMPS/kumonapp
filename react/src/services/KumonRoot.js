import React from "react";
import KumonRouter from "./KumonRouter";
import KumonTheme from "./KumonTheme";

function KumonRoot() {
    return <KumonTheme>
        <KumonRouter />
    </KumonTheme>
}

export default KumonRoot;
