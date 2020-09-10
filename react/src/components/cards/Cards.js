import React, {useEffect, useState} from "react";

function Card({type, children}) {
    return <div className = {`card-${type}`}>
        {children}
    </div>;
}

function FlashCard({duration, type, children}) {
    const [isExpired, setExpired] = useState(duration <= 0);
    useEffect(() => {
        const timeout = setTimeout(() => setExpired(true), duration);
        return () => clearTimeout(timeout);
    }, [duration]);
    return !isExpired ? <Card type = {type}>{children}</Card> : null;
}

export {Card, FlashCard};