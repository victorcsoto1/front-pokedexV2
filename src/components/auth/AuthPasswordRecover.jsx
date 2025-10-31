import { useState } from "react"
import AuthPasswordRecoverUser from "./AuthPasswordRecoverUser"
import AuthPasswordRecoverCodigo from "./AuthPasswordRecoverCodigo"
import AuthPasswordRecoverNew from "./AuthPasswordRecoverNew"
import "../../styles/auth.css"

export default function AuthPasswordRecover () {

    const [etapa, setEtapa] = useState(1)
    const [form, setForm] = useState({
        email: "",
        codigo: "",
        password: "",
    })

    return (
        <>
            {
                etapa === 1 && <AuthPasswordRecoverUser setEtapa={setEtapa} form={form} setForm={setForm} />
            }
            {
                etapa === 2 && <AuthPasswordRecoverCodigo setEtapa={setEtapa} form={form} setForm={setForm} />
            }
            {
                etapa === 3 && <AuthPasswordRecoverNew setEtapa={setEtapa} form={form} setForm={setForm} />
            }
        </>
    )
}