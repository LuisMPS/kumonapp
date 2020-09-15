import React from "react";
import Fields from "./Fields";

function PayFields({initial, onInput, date}) {
    const payment = initial.values;
    const path = initial.path;
    const starting = payment && payment.starting ? new Date(payment.starting) : null;
    const values = starting && date.getMonth() === starting.getUTCMonth() && date.getFullYear() === starting.getUTCFullYear() ? payment : null;
    const payfields = [
        {name: "amount", label: "Cantidad", type: "text"},
        {name: "method", label: "Forma de Pago", type: "select", options: ["Efectivo", "Transferencia", "Deposito", "Tarjeta de Crédito", "Otro"]},
        {name: "paid", label: "Fecha de Pago", type: "date", styles: {inputStyle: {width: 200}}}
    ];
    return <Fields fields = {payfields} initial = {{path, values}} onInput = {onInput} />;
}

export default PayFields;