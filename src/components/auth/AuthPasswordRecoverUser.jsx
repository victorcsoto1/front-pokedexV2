import Swal from "sweetalert2";
import CryptoJS from "crypto-js";
import { useLoading } from "../../context/LoadingContext";
import { getCodigoPassword } from "../../services/authService";
import { SECRET_KEY } from "../../environments/variables";

export default function AuthPasswordRecoverUser ({setEtapa, form, setForm}) {

    const {setLoading} = useLoading();

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true)
        const IV = CryptoJS.enc.Utf8.parse(SECRET_KEY)
        const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(form), CryptoJS.enc.Utf8.parse(SECRET_KEY), {
            iv: IV,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }).toString()
        getCodigoPassword(encryptedData).then((resp) => {
            setLoading(false)
            if (resp.error) {
                Swal.fire('Error', resp.error, 'error')
                return
            }

            setEtapa(2)
        })
    }

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value})
    }

    return (
        <div className="div__auth">
            <h2>Recuperar contraseña</h2>
            <p>Ingrese correo para recuperar la contraseña.</p>
            <form onSubmit={handleSubmit}>
                <div className="row body__login">
                    <div className="mb-3">
                        <label className="form-label">Correo</label>
                        <input className="form-control" name="email" type="text" onChange={handleInputChange} />
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                        <button type="submit" className="button__login">Recuperar contraseña</button>
                    </div>
                </div>

            </form>
        </div>
    )
}