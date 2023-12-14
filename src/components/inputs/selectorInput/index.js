import React from 'react';
import './styles.css'

function SelectorInput(props) {
    let value = props.keyValue || "value";
    let description = props.description || "description";

    const { label, options } = props;

    return (
        <div className='selector_container'>
            <small>{label}</small>
            <select name={props.name || "select"} onChange={e => props.action(e)} defaultValue="0">
                {options.map(element => {
                    return <option value={element[value]} key={element[value]}>{element[description]}</option>
                })}
            </select>
        </div>
    )
}

export { SelectorInput }