import React from 'react';
import './styles.css'

import logo from '../../assets/svgs/icono_amarillo.svg'

function LoaderModal(props) {
    return (
        <div className='loader-modal_container'>
            <img src={logo} alt="cargando..." />
        </div>
    )
}

export { LoaderModal }