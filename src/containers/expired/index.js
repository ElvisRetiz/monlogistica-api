import React from "react";
import './styles.css'

import { Navigate, useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/auth";

import { CustomButton } from "../../components/inputs/customButton";

function Expired() {
    const auth = useAuth();
    const navigate = useNavigate();

    if (auth.user) {
        return <Navigate to="/" />
    }

    return (
        <div className="expired_container">
            <i className='bx bx-error-circle expired_icon'></i>
            <p>Tu sesion ha expirado.</p>
            <small>Vuelve a iniciar sesión.</small>
            <div className="expired_container_button-container">
                <CustomButton value="Aceptar" action={() => navigate("/login")} />
            </div>
        </div>
    )
}

export { Expired }