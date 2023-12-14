import React from "react";
import './styles.css'

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc)

function CustomRow(props) {
    const { element } = props;
    return (
        <tr className="custom-row_row-container" onClick={props.action}>
            <td>
                <p className="custom-row_paragraph">
                    {element.servicio}
                </p>
            </td>
            <td>
                <p className="custom-row_paragraph">
                    {dayjs(element.fechaServicio).utc().format('DD/MM/YYYY')}
                </p>
            </td>
            <td>
                <p className="custom-row_paragraph">
                    {dayjs(element.horaServicio).utc().format('hh:mm a')}
                </p>
            </td>
            <td>
                <p className="custom-row_paragraph">
                    {element.tipoServicio}
                </p>
            </td>
            <td>
                <p className="custom-row_paragraph">
                    {element.desRuta}
                </p>
            </td>
            <td>
                <p className="custom-row_paragraph">
                    {element.descripcion}
                </p>
            </td>
        </tr>
    )
}

export { CustomRow }