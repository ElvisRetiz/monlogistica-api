import React from 'react';
import './styles.css'

import dayjs from 'dayjs';
import utc from "dayjs/plugin/utc";

import { CustomButton } from '../inputs/customButton';
import { LoaderModal } from '../loaderModal';
import { Output } from '../output';

dayjs.extend(utc);

function Modal(props) {
    return (
        <div className={`modal_background ${props.visible && 'modal_visible'}`}>
            {props.loading && <LoaderModal />}
            {!props.loading && <div className='modal_container'>
                <div className='modal_header'>
                    <p>Servicio #{props.data.servicio}</p>
                </div>
                <div className='modal_element'>
                    <p><strong>Generales</strong></p>
                    <div className='modal_element_section'>
                        <Output label="Fecha" value={dayjs(props.data.fechaServicio).utc().format('DD/MM/YYYY')} />
                        <Output label="Hora" value={dayjs(props.data.horaServicio).utc().format('hh:mm a')} />
                        <Output label="Tipo" value={props.data.tipoServicio} />
                    </div>
                    <div className='modal_element_section'>
                        <Output label="Unidad" value={props.data.descripcion} />
                        <Output label="Ruta" value={props.data.desRuta} />
                    </div>
                    <div className='modal_element_section'>
                        <Output label="Comentarios" value={props.data.comentarios} />
                    </div>
                    {(
                        props.data.horaLleAlmacen || props.data.fechaSalAlmacen || props.data.horaSalAlmacen
                    ) && (
                            <>
                                <p><strong>Estatus de almacen</strong></p>
                                <div className='modal_element_section'>
                                    <Output label="Hora llegada" value={dayjs(props.data.horaLleAlmacen).utc().format('hh:mm a')} />
                                    <Output label="Fecha salida" value={dayjs(props.data.fechaSalAlmacen).utc().format('DD/MM/YYYY')} />
                                    <Output label="Hora salida" value={dayjs(props.data.horaSalAlmacen).utc().format('hh:mm a')} />
                                </div>
                            </>
                        )
                    }
                    {
                        (props.data.fechaTerServicio || props.data.horaTerServicio)
                        &&
                        (
                            <>
                                <p><strong>Estatus de servicio</strong></p>

                                <div className='modal_element_section'>
                                    <Output label="Fecha termino" value={dayjs(props.data.fechaTerServicio).utc().format('DD/MM/YYYY')} />
                                    <Output label="Hora termino" value={dayjs(props.data.horaTerServicio).utc().format('hh:mm a')} />
                                </div>
                            </>
                        )
                    }
                    {
                        props.data.notaEmbarque
                        &&
                        (
                            <>
                                <p><strong>Notas de embarque</strong></p>
                                <div className='modal_element_section'>
                                    <Output label="" value={props.data.notaEmbarque} />
                                </div>
                            </>
                        )
                    }
                    {
                        (props.data.placa || props.data.tarjetaCirculacion)
                        &&
                        (
                            <>
                                <p><strong>Datos de unidad</strong></p>

                                <div className='modal_element_section'>
                                    <Output label="Placa" value={props.data.placa} />
                                    <Output label="Tarjeta circulacion" value={props.data.tarjetaCirculacion} />
                                </div>
                            </>
                        )
                    }
                    {
                        (props.data.choferUno || props.data.choferDos)
                        &&
                        (
                            <>
                                <p><strong>Datos de chofer</strong></p>

                                <div className='modal_element_section'>
                                    <Output label="Chofer 1" value={props.data.choferUno} />
                                    <Output label="Chofer 2" value={props.data.choferDos} />
                                </div>
                            </>
                        )
                    }
                </div>
                <div className='modal_footer'>
                    <CustomButton
                        value="cerrar"
                        type="secondary"
                        action={() => props.setVisible(false)}
                    />
                </div>
            </div>}
        </div>
    )
}

export { Modal }