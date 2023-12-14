import React from "react";
import './styles.css'

import { useNavigate } from "react-router-dom";

import { CustomButton } from '../../components/inputs/customButton';

import logo from '../../assets/svgs/icono_amarillo_refill.svg'

function NotFound(props) {
    const navigate = useNavigate();

    return (
        <div className="not-found_container">
            <div className="not-found_container_header">
                <img src={logo} alt="Monlog" />
                <h1>404</h1>
            </div>
            <h2>Página no encontrada</h2>
            <p>
                Lo sentimos, la página que estas solicitando no pudo ser encontrada.<br />
                Regresa a la pagina de inicio, por favor.
            </p>
            <div>
                <CustomButton value="Volver a inicio" action={() => navigate("/login")} />
            </div>
        </div>
    )
}

export { NotFound }