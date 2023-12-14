import React from 'react';
import './styles.css'

import logo from '../../assets/svgs/icono_amarillo.svg'

function Loader(props) {
    return (
        <div className='loader_container'>
            <img src={logo} alt="cargando..." />
        </div>
    )
}

export { Loader }