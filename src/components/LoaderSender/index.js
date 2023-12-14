import React from 'react';
import './styles.css'

import { useNavigate } from "react-router-dom";

import logo from '../../assets/svgs/icono_amarillo_refill.svg'

import { CustomButton } from '../inputs/customButton';

function LoaderSender(props) {
    const navigate = useNavigate();

    const { loading, error, setter } = props;

    const sending = <div className='loader-sender_container'>
        <div className='loader-sender_frame'>
            <p>Enviando solicitud...</p>
            <img src={logo} alt="cargando..." className='loader-sender_frame_image' />
        </div>
    </div>

    const send = <div className='loader-sender_container'>
        <div className='loader-sender_frame'>
            <p>¡Solicitud enviada!</p>
            <i className='bx bx-mail-send loader-sender_frame_icon'></i>
            <div className='loader-sender_frame_button_container'>
                <CustomButton value="Aceptar" type="secondary" action={() => navigate("/")} />
            </div>
        </div>
    </div>

    const notSend = <div className='loader-sender_container'>
        <div className='loader-sender_frame'>
            <p>Hubo un problema</p>
            <i className='bx bx-error loader-sender_frame_icon'></i>
            <div className='loader-sender_frame_button_container'>
                <CustomButton value="Aceptar" type="secondary" action={setter} />
            </div>
        </div>
    </div>

    if (loading) {
        return sending
    } else {
        if (error) {
            return notSend
        } else {
            return send
        }
    }
}

export { LoaderSender }