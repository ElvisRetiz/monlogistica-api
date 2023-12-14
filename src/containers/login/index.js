import React from "react";
import './styles.css'

import { Navigate } from "react-router-dom";

import { useAuth } from '../../hooks/auth';

import { Loader } from '../../components/loader';
import { CustomButton } from '../../components/inputs/customButton';
import { ErrorMessage } from "../../components/errorMessage";

import logo from '../../assets/svgs/logo_largo_completo_negro_sub.svg';

function Login() {
    const auth = useAuth();

    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    if (auth.user) {
        return <Navigate to="/" />
    }

    const handleChange = (e) => {
        switch (e.target.name) {
            case "usr":
                setUsername(e.target.value)
                break;
            case "pwd":
                setPassword(e.target.value)
                break;
            default:
                break;
        }
    }

    const login = async (username, password) => {
        try {
            setLoading(true)
            await auth.login({ username, password });
        } catch (error) {
            console.log(error)
            setLoading(false)
            setError(true)
        }
    }

    const handleCloseMessage = () => {
        setError(false);
    }

    if (loading) {
        return <Loader />
    } else {
        return (
            <div className="login_container">
                <img src={logo} alt="Monlogistica" />
                <div className="login_input_container">
                    <i className='bx bxs-user login_icon'></i>
                    <input type="text" name="usr" onChange={handleChange} value={username} autoComplete="off" />
                </div>
                <div className="login_input_container">
                    <i className='bx bx-key login_icon'></i>
                    <input type="password" name="pwd" onChange={handleChange} value={password} />
                </div>
                <div className="login_button">
                    <CustomButton type="secondary" value="ingresar" action={() => login(username, password)} />
                </div>
                {
                    error &&
                    <ErrorMessage>
                        <div className="login_message_container">
                            <i className='bx bx-message-alt-error login_message_container_icon'></i>
                            <p>¡Usuario o contraseña incorrecto, intente de nuevo!</p>
                            <div className="login_message_container_button_container">
                                <CustomButton
                                    action={handleCloseMessage}
                                    value="Aceptar"
                                    type="secondary"
                                />
                            </div>
                        </div>
                    </ErrorMessage>
                }
            </div >
        )
    }
}

export { Login }