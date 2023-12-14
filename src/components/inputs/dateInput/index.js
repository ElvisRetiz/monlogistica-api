import React from 'react';
import './styles.css'

function DateInput(props) {
    const { value, setValue, handler, name } = props;

    const handleChange = (e) => {
        setValue(e.target.value)
        if (handler) {
            handler(e)
        }
    }

    return (
        <div className='date-input_container'>
            <small>{props.label}</small>
            <input
                name={name || 'date'}
                type='date'
                value={value}
                onChange={(e) => handleChange(e)}
                min={props.min || null}
                max={props.max || null}
            />
        </div>
    )
}

export { DateInput }