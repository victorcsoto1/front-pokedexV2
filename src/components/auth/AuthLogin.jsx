import { useNavigate } from "react-router-dom"
import "../../styles/auth.css"
import { useState } from "react"
import CryptoJS from "crypto-js";
import { iniciarSesion } from "../../services/authService";
import { SECRET_KEY } from "../../environments/variables";
import { useAuth } from "./AuthProvider";
import { useLoading } from "../../context/LoadingContext";
import Swal from "sweetalert2";

export default function AuthLogin() {

    const {login} = useAuth();
    const {setLoading} = useLoading();

    const navigate = useNavigate()

    const [form, setForm] = useState({
            email: "",
            password: ""
        })

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true)
        const IV = CryptoJS.enc.Utf8.parse(SECRET_KEY)
        const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(form), CryptoJS.enc.Utf8.parse(SECRET_KEY), {
            iv: IV,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }).toString()

        iniciarSesion(encryptedData).then((resp) => {
            setLoading(false)
            if (resp.mensaje?.includes("Error")) {
                console.log(resp.mensaje)
                let mensajeError = resp.mensaje
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: mensajeError
                })
                return;
            }
            const token = resp.token
            localStorage.setItem('token', token)
            login(token)
        })
    }

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value})
    }

    const gotoRegister = () => {
        navigate('/register')
    }

    const gotoRecoverPassword = () => {
        navigate('/recover')
    }

    return (
        <div className="div__auth container">
            <h1>¡Bienvenido!</h1>
            <p>Inicie sesión para continuar</p>
            <form onSubmit={handleSubmit}>
                <div className="row body__login">
                    <div className="mb-3">
                        <label className="form-label">Correo</label>
                        <input className="form-control" name="email" type="text" onChange={handleInputChange} required />
                    </div>
                    <div>
                        <label className="form-label">Contraseña</label>
                        <input className="form-control" name="password" type="password" onChange={handleInputChange} required />
                    </div>

                    <div className="d-flex justify-content-center mt-3">
                        <button type="submit" className="button__login">Iniciar sesión</button>
                    </div>
                </div>
                <div className="mt-3 text-center">
                    <p>¿Olvidaste la contraseña? Recupere su contraseña <span className="link__recupera" onClick={gotoRecoverPassword}>aquí</span>.</p>
                    <p>¿No estás registrado? <span className="link__register" onClick={gotoRegister}>Regístrate aquí</span>.</p>
                </div>
                
            </form>
        </div>
    )
}