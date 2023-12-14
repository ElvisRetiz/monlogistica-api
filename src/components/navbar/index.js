import React from 'react';
import './styles.css'

import { useAuth } from '../../hooks/auth';

import logo from '../../assets/svgs/logo_largo_negro.png'

function Navbar() {
    const { user, logout } = useAuth();
    return (
        <div className='navbar_container'>
            <div className='navbar_container_logo'>
                <img src={logo} alt='Logo Monlog' />
            </div>
            <div className='navbar_container_tag'>
                <p>{user.usuario} - {user.nombre}</p>
                <button className='navbar_container_tag_button' onClick={logout}>
                    <i className='bx bx-log-out-circle navbar_container_tag_button_icon'></i>
                    salir
                </button>
            </div>
        </div>
    )
}

export { Navbar }