import React from "react";
import { useNavigate, Navigate } from "react-router-dom";

import { customFetch } from "../utils/api/api";

const AuthContext = React.createContext();

function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = React.useState(null);

    const login = async ({ username, password }) => {
        let response = await customFetch('POST', 'auth/login', { username, password });
        if (response.status !== 200) {
            throw new Error("Usuario o contraseña incorrectos")
        }
        setUser(response.user);
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('refreshToken', response.refreshToken);
        navigate('/');
    }

    const logout = () => {
        setUser(null);
        navigate('/login');
    }

    const handleExpiration = () => {
        setUser(null);
        navigate('/expired');
    }

    const auth = { user, login, logout, handleExpiration };

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const auth = React.useContext(AuthContext);
    return auth;
}

function PrivateRoute(props) {
    const auth = useAuth();
    if (!auth.user) {
        return <Navigate to="/login" />
    }

    return props.children;
}

export {
    AuthProvider,
    PrivateRoute,
    useAuth
}