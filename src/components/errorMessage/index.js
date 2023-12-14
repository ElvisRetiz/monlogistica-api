import React from "react";
import './styles.css'

function ErrorMessage(props) {
    return (<div className="error-message_container">
        {props.children}
    </div>)
}

export { ErrorMessage }