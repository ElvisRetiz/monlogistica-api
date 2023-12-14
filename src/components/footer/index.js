import React from 'react';
import './styles.css'
import logo from '../../assets/svgs/icono_amarillo.svg'

function Footer() {
    return (
        <div className='footer_container'>
            <img src={logo} alt="Monlog®" />
            <small>Todos los derechos Reservados Monlog®</small>
        </div>
    )
}

export { Footer }