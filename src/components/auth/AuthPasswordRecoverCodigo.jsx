import Swal from "sweetalert2";
import CryptoJS from "crypto-js";
import { useLoading } from "../../context/LoadingContext";
import { validaCodigo } from "../../services/authService";
import { SECRET_KEY } from "../../environments/variables";

export default function AuthPasswordRecoverCodigo ({setEtapa, form, setForm}) {

    const {setLoading} = useLoading();
    
    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);
        const IV = CryptoJS.enc.Utf8.parse(SECRET_KEY)
        const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(form), CryptoJS.enc.Utf8.parse(SECRET_KEY), {
            iv: IV,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }).toString()
        validaCodigo(encryptedData).then((resp) => {
            setLoading(false)
            if (resp.valid_code === true) {
                
                setEtapa(3)
            } else {
                Swal.fire('Error', resp.error, 'error')
            }
        })
    }

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value})
    }

    return (
        <div className="div__auth">
            <h2>Recuperar contraseña</h2>
            <p>Enviamos un código con 6 dígitos a su correo. Por favor, ingrese el código</p>
            <form onSubmit={handleSubmit}>
                <div className="row body__login">
                    <div className="mb-3">
                        <label className="form-label">Código</label>
                        <input className="form-control" name="codigo" type="text" onChange={handleInputChange} />
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                        <button type="submit" className="button__login">Validar</button>
                    </div>
                </div>

            </form>
        </div>
    )
}