import { URL_BACKEND } from "../environments/variables"

export const getPokemonList = async (limit, token) => {
    try {
        const response = await fetch(`${URL_BACKEND}/getPokemonList?limit=${limit}`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        const json = response.json()
        return json
    } catch (err) {
        throw err
    }
}

export const getFilteredPokemon = async (limit, text, token) => {
    try {
        const response = await fetch(`${URL_BACKEND}/searchPokemon?limit=${limit}&searchText=${text}`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        const json = response.json()
        return json
    } catch (err) {
        throw err
    }
}

export const getPokemonInfo = async (url, token) => {
    try {
        const response = await fetch(`${URL_BACKEND}/getPokemonInfo?urlPokemon=${url}`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        const json = response.json()
        return json
    } catch (err) {
        throw err
    }
}

export const getPokemonAbility = async (url, token) => {
    try {
        const response = await fetch(`${URL_BACKEND}/getPokemonAbility?urlAbility=${url}`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        const json = response.json()
        return json
    } catch (err) {
        throw err
    }
}

export const getPokemonSpecies = async (url, token) => {
    try {
        const response = await fetch(`${URL_BACKEND}/getPokemonSpecies?urlSpecies=${url}`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        const json = response.json()
        return json
    } catch (err) {
        throw err
    }
}