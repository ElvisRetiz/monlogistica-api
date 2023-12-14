import React from 'react';
import './styles.css'

function TextInput(props) {
    let { label, name, value, setValue, handler } = props;

    const handleChange = (e) => {
        setValue(e.target.value)
        if (handler) {
            handler(e)
        }
    }

    return (
        <div className='text-input_container'>
            <small>{label}</small>
            <textarea
                name={name}
                onChange={e => handleChange(e)}
                value={value}
            />
        </div>
    )
}

export { TextInput }