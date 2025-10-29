import Swal from "sweetalert2";
import CryptoJS from "crypto-js";
import { useLoading } from "../../context/LoadingContext";
import { cambiarPassword } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { SECRET_KEY } from "../../environments/variables";
import { useState } from "react";

export default function AuthPasswordRecoverNew ({setEtapa, form, setForm}) {

    const {setLoading} = useLoading();
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (form.password !== confirmPassword) {
            Swal.fire('Revise contraseña', 'Las contraseñas no coinciden.', 'warning');
            return
        }

        setLoading(true)
        const IV = CryptoJS.enc.Utf8.parse(SECRET_KEY)
        const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(form), CryptoJS.enc.Utf8.parse(SECRET_KEY), {
            iv: IV,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }).toString()
        cambiarPassword(encryptedData).then((resp) => {
            setLoading(false)
            if (resp.mensaje) {
                Swal.fire('Éxito', resp.mensaje, 'success')
                setEtapa(1)
                navigate('/')
            } else {
                Swal.fire('Error', resp.error, 'error')
            }
        })
    }

    const handleInputChange = (e) => {
        if (e.target.name === "passwordConfirm") {
            setConfirmPassword(e.target.value)
        }
        setForm({ ...form, [e.target.name]: e.target.value})
    }

    return (
        <div className="div__auth">
            <h2>Recuperar contraseña</h2>
            <p>Ingrese nueva contraseña para terminar con la recuperación</p>
            <form onSubmit={handleSubmit}>
                <div className="row body__login">
                    <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <input className="form-control" name="password" type="password" onChange={handleInputChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Confirme contraseña</label>
                        <input className="form-control" name="passwordConfirm" type="password" onChange={handleInputChange} required />
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                        <button type="submit" className="button__login">Cambiar contraseña</button>
                    </div>
                </div>

            </form>
        </div>
    )
}