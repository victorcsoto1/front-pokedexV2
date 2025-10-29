import { useState } from "react"
import CryptoJS from "crypto-js";
import { SECRET_KEY } from "../../environments/variables";
import { registrar } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../context/LoadingContext";
import Swal from "sweetalert2";

export default function AuthRegister () {

    const {setLoading} = useLoading();

    const navigate = useNavigate()

    const [form, setForm] = useState({
        nombre: "",
        apellidos: "",
        email: "",
        telefono: "",
        password: "",
        confirmPassword: "",
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)

        if (form.password !== form.confirmPassword) {
            return;
        }

        const IV = CryptoJS.enc.Utf8.parse(SECRET_KEY)
        const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(form), CryptoJS.enc.Utf8.parse(SECRET_KEY), {
            iv: IV,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }).toString()

        registrar(encryptedData).then((resp) => {
            setLoading(false)
            Swal.fire({
                icon: 'success',
                text: 'Te has registrado exitósamente.'
            })
            navigate('/')
        })
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value})
    }

    return (
        <div className="div__auth container">
            <h2>Registro</h2>
            <p>Complete el siguiente formulario y luego haz click en "Registrarse"</p>
            <form className="mt-5" onSubmit={handleSubmit}>
                <div className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">Nombre</label>
                        <input type="text" name="nombre" className="form-control" onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Apellidos</label>
                        <input type="text" name="apellidos" className="form-control" onChange={handleChange} required  />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Correo</label>
                        <input type="email" name="email" className="form-control" onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Teléfono</label>
                        <input type="text" name="telefono" className="form-control" onChange={handleChange} required />
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Contraseña</label>
                        <input type="password" name="password" className="form-control" onChange={handleChange} required />
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Confirme contraseña</label>
                        <input type="password" name="confirmPassword" className="form-control" onChange={handleChange} required />
                    </div>
                </div>
                <div className="d-flex justify-content-center mt-5">
                    <button type="submit" className="button__login">Registrarse</button>
                </div>
            </form>
        </div>
    )
}