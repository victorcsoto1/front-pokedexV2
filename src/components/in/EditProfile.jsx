import { useNavigate } from "react-router-dom";
import "../../styles/auth.css"
import { useEffect, useState } from "react";
import { getToken, parseJwt } from "../../utils/auth";
import CryptoJS from "crypto-js";
import { SECRET_KEY } from "../../environments/variables";
import { editarPerfil } from "../../services/authService";
import Swal from "sweetalert2";
import { useLoading } from "../../context/LoadingContext";

export default function EditProfile () {

    const {setLoading} = useLoading()

    const [formEdit, setFormEdit] = useState({
        email: "",
        nombre: "",
        apellidos: "",
        telefono: "",
    })

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true)
        const IV = CryptoJS.enc.Utf8.parse(SECRET_KEY)
        const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(formEdit), CryptoJS.enc.Utf8.parse(SECRET_KEY), {
            iv: IV,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }).toString()

        editarPerfil(encryptedData, getToken()).then((resp) => {
            setLoading(false)
            if (!resp.error) {
                Swal.fire('', resp.mensaje, 'success')
                navigate('/pokedex/pokemon-list')
            } else {
                Swal.fire('Error', resp.error, 'error')
            }
        })
    }

    const handleChange = (e) => {
        setFormEdit({ ...formEdit, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        let decodedToken = parseJwt(getToken())

        setFormEdit({
            email: decodedToken.sub,
            nombre: decodedToken.nombre,
            apellidos: decodedToken.apellidos,
            telefono: decodedToken.telefono,
        })
    }, [])

    return (
         <div className="div__auth container">
            <h2>Editar perfil</h2>
            <p>Puede editar la información de su perfil y para guardar cambios, presionar "Guardar cambios"</p>
            <form className="mt-5" onSubmit={handleSubmit}>
                <div className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">Nombre</label>
                        <input type="text" name="nombre" value={formEdit.nombre} className="form-control" onChange={handleChange} required disabled />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Apellidos</label>
                        <input type="text" name="apellidos" value={formEdit.apellidos} className="form-control" onChange={handleChange} required disabled />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Correo</label>
                        <input type="email" name="email" value={formEdit.email} className="form-control" onChange={handleChange} required disabled />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Teléfono</label>
                        <input type="text" name="telefono" value={formEdit.telefono} className="form-control" onChange={handleChange} required />
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Nueva Contraseña</label>
                        <input type="password" name="password" className="form-control" onChange={handleChange} required />
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Confirme nueva contraseña</label>
                        <input type="password" name="confirmPassword" className="form-control" onChange={handleChange} required />
                    </div>
                </div>
                <div className="d-flex justify-content-center mt-5 gap-3">
                    <button className="button__volver" onClick={() => navigate('/pokedex/pokemon-list')}>Volver</button>
                    <button type="submit" className="button__login">Guardar cambios</button>
                </div>
            </form>
        </div>
    )
}