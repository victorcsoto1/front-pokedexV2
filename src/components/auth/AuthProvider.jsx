import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, isTokenValid, parseJwt } from "../../utils/auth";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [usuario, setUsuario] = useState(null);

    const navigate = useNavigate()

    useEffect(() => {
        const token = getToken();
        if (token && isTokenValid(token)) {
            const decoded = parseJwt(token);
            setUsuario({ decoded });
        } else {
            setUsuario(null)
            localStorage.removeItem('token')
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        const decoded = parseJwt(token);
        setUsuario({ decoded });
        navigate('/pokedex/pokemon-list')
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUsuario(null);
        navigate('/login')
    };

    return (
        <AuthContext.Provider value={{ usuario, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);