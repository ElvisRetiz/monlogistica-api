import React from "react";
import './styles.css'

function CustomTable(props) {
    return (
        <table className="custom-table_container" cellSpacing={0}>
            <thead style={{ position: "sticky", top: "0", left: "0", backgroundColor: "white" }}>
                <tr>
                    <th>
                        <p># Servicio</p>
                    </th>
                    <th>
                        <p>Fecha</p>
                    </th>
                    <th>
                        <p>Hora</p>
                    </th>
                    <th>
                        <p>Servicio</p>
                    </th>
                    <th>
                        <p>Ruta</p>
                    </th>
                    <th>
                        <p>Unidad</p>
                    </th>
                </tr>
            </thead>
            <tbody>
                {props.children}
            </tbody>
        </table>
    )
}

export { CustomTable }