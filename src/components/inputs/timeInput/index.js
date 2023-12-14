import React from 'react';
import './styles.css'

function TimeInput(props) {
    const { value, setValue, name, handler } = props;

    const handleChange = (e) => {
        setValue(e.target.value)
        if (handler) {
            handler(e)
        }
    }

    return (
        <div className='time-input_container'>
            <small>{props.label}</small>
            <input
                name={name || 'time'}
                type='time'
                value={value}
                onChange={(e) => handleChange(e)}
            />
        </div>
    )
}

export { TimeInput }