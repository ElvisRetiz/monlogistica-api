import React from 'react';
import './styles.css'

function Output(props) {

    if (!props.value) {
        return <div></div>
    }

    return (
        <div className='output_container'>
            <p className='output_label'>{props.label}</p>
            <div className='output_element'>
                <p>
                    {props.value}
                </p>
            </div>
        </div>
    )
}

export { Output }