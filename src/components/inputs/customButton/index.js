import React from 'react';
import './styles.css'

function CustomButton(props) {

    return (
        <button
            className={`custom-buttom ${props.type ? props.type : 'primary'} ${props.customClasses ? props.customClasses : ''}`}
            onClick={() => props.action()}

        >
            {props.value}
        </button>
    )
}

export { CustomButton }