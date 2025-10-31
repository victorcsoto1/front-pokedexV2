import { URL_BACKEND } from "../environments/variables"

export const registrar = async (objUsuario) => {
    try {
        const response = await fetch(`${URL_BACKEND}/auth/register`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ data: objUsuario })
        })
        const json = response.json()
        return json
    } catch (err) {
        throw err
    }
}

export const iniciarSesion = async (objLogin) => {
    try {
        const response = await fetch(`${URL_BACKEND}/auth/login`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ data: objLogin })
        })
        const json = response.json()
        return json
    } catch (err) {
        throw err
    }
}

export const getCodigoPassword = async (encryptedData) => {
    try {
        const response = await fetch(`${URL_BACKEND}/auth/recover`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ data: encryptedData })
        })
        const json = response.json()
        return json
    } catch (err) {
        throw err
    }
}

export const validaCodigo = async(encryptedData) => {
    try {
        const response = await fetch(`${URL_BACKEND}/auth/valida-codigo`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ data: encryptedData })
        })
        const json = response.json()
        return json
    } catch (err) {
        throw err
    }
}

export const cambiarPassword = async (obj) => {
    try {
        const response = await fetch(`${URL_BACKEND}/auth/cambiar-password`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({data: obj})
        })
        const json = response.json()
        return json
    } catch (err) {
        throw err
    }
}

export const editarPerfil = async (obj, token) => {
    try {
        const response = await fetch(`${URL_BACKEND}/auth/edit-profile`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({data: obj})
        })
        const json = response.json()
        return json
    } catch (err) {
        throw err
    }
}